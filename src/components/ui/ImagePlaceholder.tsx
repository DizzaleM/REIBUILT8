"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Media slot that never renders blank.
 * Shows photo when available; otherwise a premium Diesel Way branded cover.
 */
export function ImagePlaceholder({
  src,
  alt,
  label = "DIESEL WAY",
  className,
  fill,
  width,
  height,
  cutout = false,
  objectFit = "cover",
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  cutout?: boolean;
  objectFit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={cn(
        "overflow-hidden",
        fill ? "absolute inset-0 h-full w-full" : "relative",
        cutout ? "bg-transparent" : "bg-[#07090d]",
        className,
      )}
      style={!fill && width && height ? { width, height } : undefined}
      role="img"
      aria-label={alt}
    >
      {!cutout ? (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_28%,rgba(255,255,255,0.08),transparent_52%),linear-gradient(165deg,#1a1a1a_0%,#0a0a0a_48%,#000000_100%)]">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/the-diesel-way-logo-approved.png?v=user-source-1"
              alt=""
              className="h-20 w-auto max-w-[75%] object-contain opacity-95 sm:h-24"
              aria-hidden
            />
            <span className="font-display text-[10px] uppercase tracking-[0.16em] text-r8-muted">{label}</span>
          </div>
        </div>
      ) : null}

      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={cn(
            "relative z-[1] h-full w-full",
            objectFit === "contain" ? "object-contain" : "object-cover",
            fill ? "absolute inset-0" : "",
          )}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}
