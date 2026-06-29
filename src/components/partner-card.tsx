import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Partner } from "@/lib/sanity/types";

interface PartnerCardProps {
  partner: Partner;
}

function countryFlag(code: string) {
  const offset = 127397;
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => c.charCodeAt(0) + offset));
}

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <span className="text-2xl" aria-hidden>
            {countryFlag(partner.countryCode)}
          </span>
          <Badge variant={partner.status === "active" ? "success" : "warning"}>
            {partner.status === "active" ? "Active" : "Coming soon"}
          </Badge>
        </div>
        <CardTitle className="mt-2">{partner.name}</CardTitle>
        <p className="text-sm text-gray-400">
          {partner.country} · {partner.type}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{partner.description}</p>
      </CardContent>
    </Card>
  );
}
