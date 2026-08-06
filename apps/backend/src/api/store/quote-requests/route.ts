import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { createOrderWorkflow } from "@medusajs/medusa/core-flows"

type QuoteBody = {
  email: string
  phone?: string
  company?: string
  notes?: string
  product_id?: string
  product_title?: string
  quantity?: number
}

/**
 * Quote request → Medusa draft order for the team to price.
 * Uses core createOrderWorkflow — no bespoke quote database.
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = (req.body || {}) as QuoteBody
  const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)

  if (!body.email || body.email === "quote@request.local") {
    res.status(400).json({
      message: "A real email is required so we can follow up on your quote.",
    })
    return
  }

  try {
    const { result } = await createOrderWorkflow(req.scope).run({
      input: {
        email: body.email,
        currency_code: "usd",
        status: "pending",
        metadata: {
          quote_request: true,
          phone: body.phone || null,
          company: body.company || null,
          notes: body.notes || null,
          product_id: body.product_id || null,
          product_title: body.product_title || null,
          quantity: body.quantity || 1,
          logistics_status: "sourced",
        },
        items: [
          {
            title: body.product_title || "Quote request",
            quantity: body.quantity || 1,
            unit_price: 0,
            metadata: {
              product_id: body.product_id || null,
              sourcing_type: "quote_only",
            },
          },
        ],
      },
    })

    res.status(201).json({
      draft_order_id: result.id,
      message:
        "Quote request received. Konduit will follow up with pricing via email or WhatsApp.",
    })
  } catch (error) {
    logger.error("Failed to create quote draft order", error)
    res.status(500).json({
      message: "Could not create quote request. Please try again or contact us.",
    })
  }
}
