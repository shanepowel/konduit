import {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
  type CancelPaymentInput,
  type CancelPaymentOutput,
} from "@medusajs/framework/types";
import {
  AbstractPaymentProvider,
  MedusaError,
  PaymentActions,
  PaymentSessionStatus,
} from "@medusajs/framework/utils";
import { Paynow } from "paynow";
import { getPaynowAmount } from "../utils/amount";
import { formatCurrencyCode } from "../utils/currencyCode";

export type PaynowPaymentProviderSessionData = {
  paynowReference: string;
  paynowPollUrl: string;
  paynowRedirectUrl: string;
};

export type AuthorizedPaynowPaymentProviderSessionData =
  PaynowPaymentProviderSessionData & {
    paynowStatus?: string;
    paynowTxData?: Record<string, unknown>;
  };

export interface PaynowPaymentProcessorConfig extends Record<string, unknown> {
  /**
   * Paynow Integration ID from the merchant dashboard
   */
  integration_id: string;

  /**
   * Paynow Integration Key from the merchant dashboard
   */
  integration_key: string;

  /**
   * Absolute URL Paynow POSTs payment results to (must verify hash)
   */
  result_url: string;

  /**
   * Absolute URL customers return to after paying on Paynow
   */
  return_url: string;

  /**
   * Debug mode — logs helpful debug information prefixed with PN_P_Debug
   */
  debug?: boolean;
}

/**
 * Medusa payment provider for Paynow Zimbabwe.
 * Structure copied from a11rew/medusa-payment-paystack AbstractPaymentProvider
 * implementation; Paystack HTTP client swapped for the official `paynow` SDK.
 */
class PaynowPaymentProcessor extends AbstractPaymentProvider<PaynowPaymentProcessorConfig> {
  static identifier = "paynow";

  protected readonly configuration: PaynowPaymentProcessorConfig;
  protected readonly paynow: InstanceType<typeof Paynow>;
  protected readonly debug: boolean;

  constructor(
    cradle: Record<string, unknown>,
    options: PaynowPaymentProcessorConfig
  ) {
    super(cradle, options);

    if (!options.integration_id || !options.integration_key) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "The Paynow provider requires integration_id and integration_key options"
      );
    }

    if (!options.result_url || !options.return_url) {
      throw new MedusaError(
        MedusaError.Types.INVALID_ARGUMENT,
        "The Paynow provider requires result_url and return_url options"
      );
    }

    this.configuration = options;
    this.paynow = new Paynow(options.integration_id, options.integration_key);
    this.paynow.resultUrl = options.result_url;
    this.paynow.returnUrl = options.return_url;
    this.debug = Boolean(options.debug);
  }

  async initiatePayment(
    initiatePaymentData: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    if (this.debug) {
      console.info(
        "PN_P_Debug: InitiatePayment",
        JSON.stringify(initiatePaymentData, null, 2)
      );
    }

    const { data, amount, currency_code } = initiatePaymentData;
    const { email, session_id } = (data ?? {}) as {
      email?: string;
      session_id?: string;
    };

    const reference =
      session_id ||
      `medusa_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

    const validatedCurrencyCode = formatCurrencyCode(currency_code);
    const paynowAmount = getPaynowAmount(amount);

    try {
      const payment = this.paynow.createPayment(
        reference,
        email || "orders@konduit.co.zw"
      );
      payment.add(
        `Konduit order (${validatedCurrencyCode})`,
        paynowAmount
      );

      const response = await this.paynow.send(payment);

      if (!response.success) {
        throw new MedusaError(
          MedusaError.Types.UNEXPECTED_STATE,
          "Failed to initiate Paynow payment",
          response.error || "Unknown Paynow error"
        );
      }

      const redirectUrl = response.redirectUrl as string;
      const pollUrl = response.pollUrl as string;

      if (!redirectUrl || !pollUrl) {
        throw new MedusaError(
          MedusaError.Types.UNEXPECTED_STATE,
          "Paynow did not return redirectUrl/pollUrl"
        );
      }

      return {
        id: reference,
        status: PaymentSessionStatus.PENDING,
        data: {
          paynowReference: reference,
          paynowPollUrl: pollUrl,
          paynowRedirectUrl: redirectUrl,
          currency: validatedCurrencyCode,
          amount: paynowAmount,
        } satisfies PaynowPaymentProviderSessionData & Record<string, unknown>,
      };
    } catch (error) {
      if (this.debug) {
        console.error("PN_P_Debug: InitiatePayment: Error", error);
      }

      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        "Failed to initiate Paynow payment",
        error?.toString() ?? "Unknown error"
      );
    }
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    if (this.debug) {
      console.info("PN_P_Debug: UpdatePayment", JSON.stringify(input, null, 2));
    }

    // Paynow does not support updating transactions — create a new one
    const session = await this.initiatePayment(input);

    return {
      data: session.data,
      status: session.status,
    };
  }

  async authorizePayment(
    input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    if (this.debug) {
      console.info(
        "PN_P_Debug: AuthorizePayment",
        JSON.stringify(input, null, 2)
      );
    }

    try {
      const { paynowPollUrl } = input.data as PaynowPaymentProviderSessionData;

      if (!paynowPollUrl) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "Missing paynowPollUrl in payment data."
        );
      }

      const status = await this.paynow.pollTransaction(paynowPollUrl);

      if (this.debug) {
        console.info(
          "PN_P_Debug: AuthorizePayment: Poll",
          JSON.stringify(status, null, 2)
        );
      }

      if (status.paid()) {
        return {
          status: PaymentSessionStatus.CAPTURED,
          data: {
            ...input.data,
            paynowStatus: "paid",
            paynowTxData: status as unknown as Record<string, unknown>,
          },
        };
      }

      const statusValue = String(
        status.status || status.paymentStatus || "pending"
      ).toLowerCase();

      if (statusValue.includes("cancel") || statusValue.includes("fail")) {
        return {
          status: PaymentSessionStatus.ERROR,
          data: {
            ...input.data,
            paynowStatus: statusValue,
            paynowTxData: status as unknown as Record<string, unknown>,
          },
        };
      }

      return {
        status: PaymentSessionStatus.PENDING,
        data: {
          ...input.data,
          paynowStatus: statusValue,
          paynowTxData: status as unknown as Record<string, unknown>,
        },
      };
    } catch (error) {
      if (this.debug) {
        console.error("PN_P_Debug: AuthorizePayment: Error", error);
      }

      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        "Failed to authorize Paynow payment",
        error?.toString() ?? "Unknown error"
      );
    }
  }

  async retrievePayment(
    input: RetrievePaymentInput
  ): Promise<RetrievePaymentOutput> {
    const { paynowPollUrl } = input.data as PaynowPaymentProviderSessionData;

    if (!paynowPollUrl) {
      return { data: input.data };
    }

    const status = await this.paynow.pollTransaction(paynowPollUrl);

    return {
      data: {
        ...input.data,
        paynowTxData: status as unknown as Record<string, unknown>,
      },
    };
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    // Paynow refunds are handled in the merchant dashboard / support channel
    if (this.debug) {
      console.info(
        "PN_P_Debug: RefundPayment not supported via API",
        JSON.stringify(input, null, 2)
      );
    }

    throw new MedusaError(
      MedusaError.Types.NOT_ALLOWED,
      "Paynow refunds must be processed in the Paynow merchant dashboard"
    );
  }

  async getPaymentStatus(
    input: GetPaymentStatusInput
  ): Promise<GetPaymentStatusOutput> {
    const { paynowPollUrl } = input.data as PaynowPaymentProviderSessionData;

    if (!paynowPollUrl) {
      return { status: PaymentSessionStatus.PENDING };
    }

    try {
      const status = await this.paynow.pollTransaction(paynowPollUrl);

      if (status.paid()) {
        return { status: PaymentSessionStatus.AUTHORIZED };
      }

      return { status: PaymentSessionStatus.PENDING };
    } catch {
      return { status: PaymentSessionStatus.ERROR };
    }
  }

  /**
   * Handles Paynow resultUrl callbacks. Hash MUST be verified before
   * treating the payment as paid — highest-risk path in the integration.
   */
  async getWebhookActionAndData({
    data,
    rawData,
  }: {
    data: Record<string, unknown>;
    rawData: string | Buffer;
    headers: Record<string, unknown>;
  }): Promise<WebhookActionResult> {
    if (this.debug) {
      console.info(
        "PN_P_Debug: Handling webhook event",
        JSON.stringify({ data, rawData: String(rawData) }, null, 2)
      );
    }

    const values: Record<string, string> = {};

    // Prefer parsed body fields; fall back to form-urlencoded raw body
    const source =
      data && Object.keys(data).length > 0
        ? data
        : Object.fromEntries(new URLSearchParams(String(rawData)));

    for (const [key, value] of Object.entries(source)) {
      values[key] = String(value ?? "");
    }

    if (!this.paynow.verifyHash(values)) {
      if (this.debug) {
        console.error("PN_P_Debug: Paynow webhook hash verification failed");
      }
      return {
        action: PaymentActions.NOT_SUPPORTED,
      };
    }

    const status = (values.status || "").toLowerCase();
    const reference = values.reference || values.paynowreference;
    const amount = Number(values.amount || 0);

    if (!reference) {
      return { action: PaymentActions.NOT_SUPPORTED };
    }

    if (status === "paid" || status === "awaiting delivery") {
      return {
        action: PaymentActions.AUTHORIZED,
        data: {
          session_id: reference.startsWith("medusa_") ? reference : reference,
          amount,
        },
      };
    }

    return { action: PaymentActions.NOT_SUPPORTED };
  }

  async capturePayment(
    input: CapturePaymentInput
  ): Promise<CapturePaymentOutput> {
    return { data: input.data };
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return { data: input.data };
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return { data: input.data };
  }
}

export default PaynowPaymentProcessor;
