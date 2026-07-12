"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ImagePlaceholder({
  src,
  alt,
  label = "Add Rei Photo",
  className,
  fill,
  width,
  height,
  priority,
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
  /** Transparent PNG cutouts — no card background, blends into site black */
  cutout?: boolean;
  objectFit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  if (!showImage) {
    return (
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden",
          fill ? "absolute inset-0 h-full w-full" : "relative",
          cutout ? "bg-transparent" : "bg-r8-charcoal bg-grid-subtle",
          className,
        )}
        style={!fill && width && height ? { width, height } : undefined}
        role="img"
        aria-label={alt}
      >
        {!cutout ? (
          <div className="absolute inset-0 bg-gradient-to-br from-r8-blue/10 via-transparent to-r8-black/80" />
        ) : null}
        <div className="relative z-10 px-4 text-center">
          <p className="font-display text-lg uppercase tracking-[0.2em] text-r8-white/80">{label}</p>
          <p className="mt-1 text-xs text-r8-muted">{alt}</p>
        </div>
      </div>
    );
  }

  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  if (fill) {
    return (
      <Image
        src={src!}
        alt={alt}
        fill
        priority={priority}
        className={cn(fitClass, className)}
        onError={() => setFailed(true)}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    );
  }

  return (
    <Image
      src={src!}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      priority={priority}
      className={cn(fitClass, className)}
      onError={() => setFailed(true)}
    />
  );
}
