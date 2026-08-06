import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

const LOGISTICS_STATUSES = [
  "sourced",
  "in_transit",
  "customs",
  "delivered",
] as const

type LogisticsStatus = (typeof LOGISTICS_STATUSES)[number]

function isLogisticsStatus(value: unknown): value is LogisticsStatus {
  return (
    typeof value === "string" &&
    (LOGISTICS_STATUSES as readonly string[]).includes(value)
  )
}

async function sendWhatsAppStatus(
  phone: string,
  orderDisplayId: string | number,
  status: LogisticsStatus
) {
  const token = process.env.WHATSAPP_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const apiVersion = process.env.WHATSAPP_API_VERSION || "v21.0"

  if (!token || !phoneNumberId) {
    return { skipped: true as const }
  }

  const labels: Record<LogisticsStatus, string> = {
    sourced: "Sourced",
    in_transit: "In transit",
    customs: "In customs",
    delivered: "Delivered",
  }

  const to = phone.replace(/[^\d]/g, "")
  const body = `Konduit order #${orderDisplayId}: status updated to ${labels[status]}.`

  const response = await fetch(
    `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
      }),
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`WhatsApp API error: ${response.status} ${text}`)
  }

  return { skipped: false as const }
}

/**
 * On order update, if logistics_status metadata changed, notify via WhatsApp Cloud API.
 */
export default async function orderLogisticsStatusHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["id", "display_id", "email", "metadata", "shipping_address.phone"],
    filters: { id: data.id },
  })

  const order = orders[0]
  if (!order) {
    return
  }

  const status = order.metadata?.logistics_status
  if (!isLogisticsStatus(status)) {
    return
  }

  const phone =
    (order.shipping_address as { phone?: string } | undefined)?.phone ||
    (order.metadata?.phone as string | undefined)

  if (!phone) {
    logger.info(
      `Order ${order.id} logistics_status=${status} but no phone — skip WhatsApp`
    )
    return
  }

  try {
    const result = await sendWhatsAppStatus(
      phone,
      order.display_id ?? order.id,
      status
    )
    if (result.skipped) {
      logger.info("WhatsApp credentials not configured — status update skipped")
    } else {
      logger.info(`WhatsApp status sent for order ${order.id}: ${status}`)
    }
  } catch (error) {
    logger.error(`WhatsApp notify failed for order ${order.id}`, error)
  }
}

export const config: SubscriberConfig = {
  event: "order.updated",
}
