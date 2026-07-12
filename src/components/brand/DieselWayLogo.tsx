import Image from "next/image";
import { cn } from "@/lib/utils";

/** Single approved master — original artwork, contrast-adjusted for black backgrounds. */
export const DIESEL_WAY_LOGO_SRC = "/brand/the-diesel-way-logo-approved.png?v=user-source-1";

type DieselWayLogoProps = {
  variant?: "nav" | "hero" | "footer" | "product";
  className?: string;
  priority?: boolean;
};

const sizes = {
  nav: "w-[68px] md:w-[78px]",
  hero: "w-[240px] lg:w-[290px]",
  footer: "w-[190px] md:w-[230px]",
  product: "w-[90px] md:w-[120px]",
} as const;

export function DieselWayLogo({
  variant = "nav",
  className = "",
  priority = false,
}: DieselWayLogoProps) {
  return (
    <Image
      src={DIESEL_WAY_LOGO_SRC}
      alt="The Diesel Way"
      width={1600}
      height={1320}
      priority={priority}
      unoptimized
      className={cn(sizes[variant], "h-auto object-contain", className)}
    />
  );
}
