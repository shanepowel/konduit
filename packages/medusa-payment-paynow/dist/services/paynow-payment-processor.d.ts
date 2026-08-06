import { AuthorizePaymentInput, AuthorizePaymentOutput, CapturePaymentInput, CapturePaymentOutput, DeletePaymentInput, DeletePaymentOutput, GetPaymentStatusInput, GetPaymentStatusOutput, InitiatePaymentInput, InitiatePaymentOutput, RefundPaymentInput, RefundPaymentOutput, RetrievePaymentInput, RetrievePaymentOutput, UpdatePaymentInput, UpdatePaymentOutput, WebhookActionResult, type CancelPaymentInput, type CancelPaymentOutput } from "@medusajs/framework/types";
import { AbstractPaymentProvider } from "@medusajs/framework/utils";
import { Paynow } from "paynow";
export type PaynowPaymentProviderSessionData = {
    paynowReference: string;
    paynowPollUrl: string;
    paynowRedirectUrl: string;
};
export type AuthorizedPaynowPaymentProviderSessionData = PaynowPaymentProviderSessionData & {
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
declare class PaynowPaymentProcessor extends AbstractPaymentProvider<PaynowPaymentProcessorConfig> {
    static identifier: string;
    protected readonly configuration: PaynowPaymentProcessorConfig;
    protected readonly paynow: InstanceType<typeof Paynow>;
    protected readonly debug: boolean;
    constructor(cradle: Record<string, unknown>, options: PaynowPaymentProcessorConfig);
    initiatePayment(initiatePaymentData: InitiatePaymentInput): Promise<InitiatePaymentOutput>;
    updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput>;
    authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput>;
    retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput>;
    refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput>;
    getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput>;
    /**
     * Handles Paynow resultUrl callbacks. Hash MUST be verified before
     * treating the payment as paid — highest-risk path in the integration.
     */
    getWebhookActionAndData({ data, rawData, }: {
        data: Record<string, unknown>;
        rawData: string | Buffer;
        headers: Record<string, unknown>;
    }): Promise<WebhookActionResult>;
    capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput>;
    cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput>;
    deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput>;
}
export default PaynowPaymentProcessor;
