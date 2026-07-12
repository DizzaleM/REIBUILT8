import Link from "next/link";
import { cn } from "@/lib/utils";
import { DieselWayLogo, DIESEL_WAY_LOGO_SRC } from "@/components/brand/DieselWayLogo";

export { DieselWayLogo, DIESEL_WAY_LOGO_SRC };

type LogoVariant = "nav" | "hero" | "footer" | "product" | "compact" | "modal";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  /** Pass `false` to render mark without a link. */
  href?: string | false;
  variant?: LogoVariant;
  /** Legacy size API — mapped to variants */
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
}

function resolveVariant(variant?: LogoVariant, size?: LogoProps["size"]): "nav" | "hero" | "footer" | "product" {
  if (variant === "compact" || variant === "modal") return "nav";
  if (variant === "nav" || variant === "hero" || variant === "footer" || variant === "product") return variant;
  if (size === "xl") return "hero";
  if (size === "lg") return "footer";
  if (size === "sm") return "product";
  return "nav";
}

/** @deprecated Use DieselWayLogo — kept so compact call sites still resolve to the approved mark. */
export function FistMark({ className }: { className?: string }) {
  return <DieselWayLogo variant="product" className={className} />;
}

export function Logo({ className, href = "/", variant, size = "md", priority }: LogoProps) {
  const v = resolveVariant(variant, size);
  const content = (
    <span className={cn("inline-flex items-center overflow-visible", className)}>
      <DieselWayLogo variant={v} priority={priority ?? (v === "nav" || v === "hero")} />
    </span>
  );

  if (href === false) return content;
  return (
    <Link href={href} aria-label="The Diesel Way home" className="inline-flex overflow-visible transition hover:opacity-90">
      {content}
    </Link>
  );
}
