declare module "paynow" {
  export class Payment {
    add(title: string, amount: number): void;
    authEmail?: string;
  }

  export class InitResponse {
    success: boolean;
    redirectUrl?: string;
    pollUrl?: string;
    error?: string;
    instructions?: string;
  }

  export class StatusResponse {
    paid(): boolean;
    status?: string;
    paymentStatus?: string;
    amount?: string;
    reference?: string;
    paynowReference?: string;
  }

  export class Paynow {
    resultUrl: string;
    returnUrl: string;
    constructor(integrationId?: string, integrationKey?: string);
    createPayment(reference: string, authEmail?: string): Payment;
    send(payment: Payment): Promise<InitResponse>;
    sendMobile(
      payment: Payment,
      phone: string,
      method: string
    ): Promise<InitResponse>;
    pollTransaction(pollUrl: string): Promise<StatusResponse>;
    verifyHash(values: Record<string, string>): boolean;
    generateHash(
      values: Record<string, string>,
      integrationKey: string
    ): string;
  }
}
