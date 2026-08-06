"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaynowAmount = getPaynowAmount;
const utils_1 = require("@medusajs/framework/utils");
/**
 * Paynow expects decimal major units (e.g. 19.99), unlike Paystack's
 * integer subunits. Route through MathBN then round to 2dp to avoid drift.
 */
function getPaynowAmount(amount) {
    return Math.round(utils_1.MathBN.mult(amount, 1).toNumber() * 100) / 100;
}
