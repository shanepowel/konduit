import { NextRequest, NextResponse } from "next/server"
import { placeOrder } from "@lib/data/cart"

/**
 * Paynow returnUrl — customer lands here after paying on Paynow.
 * Completes the Medusa cart (authorizePayment polls Paynow).
 * Pattern adapted from medusa-payment-paystack example storefront flow.
 */
export async function GET(_req: NextRequest) {
  try {
    await placeOrder()
    return NextResponse.redirect(
      new URL(
        "/order/confirmed",
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"
      )
    )
  } catch (error) {
    console.error("Paynow return handler failed", error)
    return NextResponse.redirect(
      new URL(
        "/checkout?step=review&error=paynow",
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"
      )
    )
  }
}
