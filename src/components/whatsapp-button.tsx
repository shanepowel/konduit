import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  size?: "default" | "sm" | "lg";
  label?: string;
}

export function WhatsAppButton({
  message,
  className,
  size = "default",
  label = "WhatsApp",
}: WhatsAppButtonProps) {
  return (
    <Button variant="whatsapp" size={size} className={cn(className)} asChild>
      <Link href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-5 w-5" aria-hidden />
        {label}
      </Link>
    </Button>
  );
}
