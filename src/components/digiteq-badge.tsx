import Image from "next/image";
import Link from "next/link";

export function DigiteqBadge({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Link
        href="https://digiteq.io"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-digiteq-purple"
      >
        <span>A</span>
        <span className="font-semibold text-digiteq-purple">Digiteq</span>
        <span>company</span>
        <Image
          src="/images/logo/digiteq-mark.svg"
          alt="Digiteq"
          width={20}
          height={20}
          className="opacity-80"
        />
      </Link>
    </div>
  );
}
