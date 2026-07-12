"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Studio-treated photo for program / lifestyle cards.
 * Dark vignette + lower gradient conceal casual backgrounds and create
 * a consistent premium fitness look without distorting the subject.
 */
export function TreatedPhoto({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-r8-black", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-center scale-[1.02] contrast-[1.05] saturate-[0.92]"
      />
      {/* Darken casual backgrounds */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-r8-black via-r8-black/35 to-r8-black/20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,6,8,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(10,132,255,0.12)]" />
    </div>
  );
}
