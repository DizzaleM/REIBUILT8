import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  href?: string;
}

export function Logo({ className, showWordmark = true, href = "/" }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="font-display text-2xl font-bold tracking-tight text-r8-white">
        R<span className="text-r8-blue">8</span>
      </span>
      {showWordmark ? (
        <span className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-r8-white sm:text-base">
          REIBUILT <span className="text-r8-blue">8</span>
        </span>
      ) : null}
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="REIBUILT 8 home" className="transition hover:opacity-90">
      {content}
    </Link>
  );
}
