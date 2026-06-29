import {
  FileCheck,
  Flag,
  MapPin,
  Shield,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { trustSignals } from "@/lib/fallbacks/content";

const iconMap: Record<string, LucideIcon> = {
  Flag,
  Shield,
  FileCheck,
  MapPin,
  Tag,
};

export function TrustBar() {
  return (
    <section className="border-b border-gray-200 bg-white py-8">
      <div className="container-konduit">
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-5">
          {trustSignals.map((signal) => {
            const Icon = iconMap[signal.icon];
            return (
              <li key={signal.label} className="flex flex-col items-center gap-2 text-center">
                {Icon && <Icon className="h-6 w-6 text-blue" aria-hidden />}
                <span className="text-sm font-medium text-gray-800">{signal.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
