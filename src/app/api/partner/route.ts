import { NextResponse } from "next/server";
import { z } from "zod";
import { submitPartnerToHubspot } from "@/lib/hubspot/forms";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  country: z.string().min(1),
  services: z.string().min(1),
  teamSize: z.string().min(1),
  certifications: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = schema.parse(body);
    await submitPartnerToHubspot(payload);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
