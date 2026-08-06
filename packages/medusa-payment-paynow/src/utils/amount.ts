import type { BigNumberInput } from "@medusajs/framework/types";
import { MathBN } from "@medusajs/framework/utils";

/**
 * Paynow expects decimal major units (e.g. 19.99), unlike Paystack's
 * integer subunits. Route through MathBN then round to 2dp to avoid drift.
 */
export function getPaynowAmount(amount: BigNumberInput): number {
  return Math.round(MathBN.mult(amount, 1).toNumber() * 100) / 100;
}
