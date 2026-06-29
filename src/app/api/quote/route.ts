import { NextResponse } from "next/server";
import { z } from "zod";
import { submitQuoteToHubspot } from "@/lib/hubspot/forms";
import { sendQuoteConfirmation, sendQuoteNotification } from "@/lib/resend/send";

const schema = z.object({
  name: z.string().min(1),
  company: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  country: z.string().min(1),
  categories: z.array(z.string()).min(1),
  quantity: z.string().optional(),
  details: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = schema.parse(body);

    await Promise.all([
      submitQuoteToHubspot(payload),
      sendQuoteConfirmation({
        name: payload.name,
        email: payload.email,
        company: payload.company,
      }),
      sendQuoteNotification({
        name: payload.name,
        email: payload.email,
        company: payload.company,
        country: payload.country,
        categories: payload.categories,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
