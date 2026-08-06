import type { BigNumberInput } from "@medusajs/framework/types";
/**
 * Paynow expects decimal major units (e.g. 19.99), unlike Paystack's
 * integer subunits. Route through MathBN then round to 2dp to avoid drift.
 */
export declare function getPaynowAmount(amount: BigNumberInput): number;
