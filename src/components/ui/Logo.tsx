import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  href?: string;
  size?: "sm" | "md" | "lg";
}

/** Brand mark matching REIBUILT 8 identity: white R + electric blue 8 / BUILT. */
export function R8Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 72"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 8h28c12.5 0 22 8.2 22 20.2 0 8.4-4.8 14.6-12.4 17.6L58 64H42.5L32.2 46.5H22V64H8V8zm14 26.5h13.2c5.8 0 9.6-3.2 9.6-8.1S41 18.2 35.2 18.2H22v16.3z"
        fill="#F7F9FC"
      />
      <path d="M22 46.5h10.2L38 56.2H28.2L22 46.5z" fill="#0A84FF" />
      <path
        d="M66 14c7.2 0 12.4 3.4 12.4 9.2 0 4.2-2.4 7-6.2 8.8 4.8 1.8 7.8 5.2 7.8 10.2C80 49.8 74.2 54 66 54s-14-4.2-14-11.8c0-5 3-8.4 7.8-10.2-3.8-1.8-6.2-4.6-6.2-8.8C53.6 17.4 58.8 14 66 14zm0 10.4c-2.6 0-4.2 1.4-4.2 3.4S63.4 31 66 31s4.2-1.2 4.2-3.2-1.6-3.4-4.2-3.4zm0 21.2c-3.2 0-5.4 1.8-5.4 4.4S62.8 50 66 50s5.4-1.6 5.4-4.2-2.2-4.2-5.4-4.2z"
        fill="url(#r8Blue)"
      />
      <defs>
        <linearGradient id="r8Blue" x1="52" y1="14" x2="82" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#48A3FF" />
          <stop offset="1" stopColor="#0A84FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ className, showWordmark = true, href = "/", size = "md" }: LogoProps) {
  const markSize = size === "lg" ? "h-10 w-12" : size === "sm" ? "h-7 w-8" : "h-8 w-10";
  const wordSize = size === "lg" ? "text-lg" : size === "sm" ? "text-xs" : "text-sm sm:text-base";

  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <R8Mark className={markSize} />
      {showWordmark ? (
        <span className={cn("font-display font-bold uppercase tracking-[0.14em]", wordSize)}>
          <span className="text-r8-white">REI</span>
          <span className="text-r8-blue">BUILT 8</span>
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
