"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const paynow_1 = require("paynow");
const amount_1 = require("../utils/amount");
const currencyCode_1 = require("../utils/currencyCode");
/**
 * Medusa payment provider for Paynow Zimbabwe.
 * Structure copied from a11rew/medusa-payment-paystack AbstractPaymentProvider
 * implementation; Paystack HTTP client swapped for the official `paynow` SDK.
 */
class PaynowPaymentProcessor extends utils_1.AbstractPaymentProvider {
    constructor(cradle, options) {
        super(cradle, options);
        if (!options.integration_id || !options.integration_key) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_ARGUMENT, "The Paynow provider requires integration_id and integration_key options");
        }
        if (!options.result_url || !options.return_url) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_ARGUMENT, "The Paynow provider requires result_url and return_url options");
        }
        this.configuration = options;
        this.paynow = new paynow_1.Paynow(options.integration_id, options.integration_key);
        this.paynow.resultUrl = options.result_url;
        this.paynow.returnUrl = options.return_url;
        this.debug = Boolean(options.debug);
    }
    async initiatePayment(initiatePaymentData) {
        if (this.debug) {
            console.info("PN_P_Debug: InitiatePayment", JSON.stringify(initiatePaymentData, null, 2));
        }
        const { data, amount, currency_code } = initiatePaymentData;
        const { email, session_id } = (data ?? {});
        const reference = session_id ||
            `medusa_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
        const validatedCurrencyCode = (0, currencyCode_1.formatCurrencyCode)(currency_code);
        const paynowAmount = (0, amount_1.getPaynowAmount)(amount);
        try {
            const payment = this.paynow.createPayment(reference, email || "orders@konduit.co.zw");
            payment.add(`Konduit order (${validatedCurrencyCode})`, paynowAmount);
            const response = await this.paynow.send(payment);
            if (!response.success) {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.UNEXPECTED_STATE, "Failed to initiate Paynow payment", response.error || "Unknown Paynow error");
            }
            const redirectUrl = response.redirectUrl;
            const pollUrl = response.pollUrl;
            if (!redirectUrl || !pollUrl) {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.UNEXPECTED_STATE, "Paynow did not return redirectUrl/pollUrl");
            }
            return {
                id: reference,
                status: utils_1.PaymentSessionStatus.PENDING,
                data: {
                    paynowReference: reference,
                    paynowPollUrl: pollUrl,
                    paynowRedirectUrl: redirectUrl,
                    currency: validatedCurrencyCode,
                    amount: paynowAmount,
                },
            };
        }
        catch (error) {
            if (this.debug) {
                console.error("PN_P_Debug: InitiatePayment: Error", error);
            }
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.UNEXPECTED_STATE, "Failed to initiate Paynow payment", error?.toString() ?? "Unknown error");
        }
    }
    async updatePayment(input) {
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
    async authorizePayment(input) {
        if (this.debug) {
            console.info("PN_P_Debug: AuthorizePayment", JSON.stringify(input, null, 2));
        }
        try {
            const { paynowPollUrl } = input.data;
            if (!paynowPollUrl) {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Missing paynowPollUrl in payment data.");
            }
            const status = await this.paynow.pollTransaction(paynowPollUrl);
            if (this.debug) {
                console.info("PN_P_Debug: AuthorizePayment: Poll", JSON.stringify(status, null, 2));
            }
            if (status.paid()) {
                return {
                    status: utils_1.PaymentSessionStatus.CAPTURED,
                    data: {
                        ...input.data,
                        paynowStatus: "paid",
                        paynowTxData: status,
                    },
                };
            }
            const statusValue = String(status.status || status.paymentStatus || "pending").toLowerCase();
            if (statusValue.includes("cancel") || statusValue.includes("fail")) {
                return {
                    status: utils_1.PaymentSessionStatus.ERROR,
                    data: {
                        ...input.data,
                        paynowStatus: statusValue,
                        paynowTxData: status,
                    },
                };
            }
            return {
                status: utils_1.PaymentSessionStatus.PENDING,
                data: {
                    ...input.data,
                    paynowStatus: statusValue,
                    paynowTxData: status,
                },
            };
        }
        catch (error) {
            if (this.debug) {
                console.error("PN_P_Debug: AuthorizePayment: Error", error);
            }
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.UNEXPECTED_STATE, "Failed to authorize Paynow payment", error?.toString() ?? "Unknown error");
        }
    }
    async retrievePayment(input) {
        const { paynowPollUrl } = input.data;
        if (!paynowPollUrl) {
            return { data: input.data };
        }
        const status = await this.paynow.pollTransaction(paynowPollUrl);
        return {
            data: {
                ...input.data,
                paynowTxData: status,
            },
        };
    }
    async refundPayment(input) {
        // Paynow refunds are handled in the merchant dashboard / support channel
        if (this.debug) {
            console.info("PN_P_Debug: RefundPayment not supported via API", JSON.stringify(input, null, 2));
        }
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.NOT_ALLOWED, "Paynow refunds must be processed in the Paynow merchant dashboard");
    }
    async getPaymentStatus(input) {
        const { paynowPollUrl } = input.data;
        if (!paynowPollUrl) {
            return { status: utils_1.PaymentSessionStatus.PENDING };
        }
        try {
            const status = await this.paynow.pollTransaction(paynowPollUrl);
            if (status.paid()) {
                return { status: utils_1.PaymentSessionStatus.AUTHORIZED };
            }
            return { status: utils_1.PaymentSessionStatus.PENDING };
        }
        catch {
            return { status: utils_1.PaymentSessionStatus.ERROR };
        }
    }
    /**
     * Handles Paynow resultUrl callbacks. Hash MUST be verified before
     * treating the payment as paid — highest-risk path in the integration.
     */
    async getWebhookActionAndData({ data, rawData, }) {
        if (this.debug) {
            console.info("PN_P_Debug: Handling webhook event", JSON.stringify({ data, rawData: String(rawData) }, null, 2));
        }
        const values = {};
        // Prefer parsed body fields; fall back to form-urlencoded raw body
        const source = data && Object.keys(data).length > 0
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
                action: utils_1.PaymentActions.NOT_SUPPORTED,
            };
        }
        const status = (values.status || "").toLowerCase();
        const reference = values.reference || values.paynowreference;
        const amount = Number(values.amount || 0);
        if (!reference) {
            return { action: utils_1.PaymentActions.NOT_SUPPORTED };
        }
        if (status === "paid" || status === "awaiting delivery") {
            return {
                action: utils_1.PaymentActions.AUTHORIZED,
                data: {
                    session_id: reference.startsWith("medusa_") ? reference : reference,
                    amount,
                },
            };
        }
        return { action: utils_1.PaymentActions.NOT_SUPPORTED };
    }
    async capturePayment(input) {
        return { data: input.data };
    }
    async cancelPayment(input) {
        return { data: input.data };
    }
    async deletePayment(input) {
        return { data: input.data };
    }
}
PaynowPaymentProcessor.identifier = "paynow";
exports.default = PaynowPaymentProcessor;
