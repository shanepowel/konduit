import { NextResponse } from "next/server";
import { z } from "zod";
import { submitContactToHubspot } from "@/lib/hubspot/forms";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = schema.parse(body);
    await submitContactToHubspot(payload);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
