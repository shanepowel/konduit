import { ModuleProvider, Modules } from "@medusajs/framework/utils";

import PaynowPaymentProcessor from "./services/paynow-payment-processor";

export default ModuleProvider(Modules.PAYMENT, {
  services: [PaynowPaymentProcessor],
});

export { PaynowPaymentProcessorConfig as PluginOptions } from "./services/paynow-payment-processor";
