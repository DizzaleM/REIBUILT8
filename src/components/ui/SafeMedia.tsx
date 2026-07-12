"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

function BrandCover({ title }: { title?: string }) {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_28%,rgba(255,255,255,0.08),transparent_52%),linear-gradient(165deg,#1a1a1a_0%,#0a0a0a_48%,#000000_100%)]">
      <div className="absolute inset-0 opacity-[0.06] bg-grid-subtle" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/the-diesel-way-logo-approved.png?v=user-source-1"
          alt=""
          className="h-28 w-auto max-w-[80%] object-contain opacity-95 sm:h-36"
          aria-hidden
        />
        {title ? (
          <span className="max-w-[90%] font-display text-[11px] uppercase leading-snug tracking-[0.16em] text-r8-secondary sm:text-xs">
            {title}
          </span>
        ) : (
          <span className="font-display text-[11px] uppercase tracking-[0.18em] text-r8-muted">
            Strength Through Discipline
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Never-empty media surface.
 * Branded cover is always painted underneath. Photo layers on top when available.
 */
export function SafeMedia({
  src,
  alt,
  title,
  className,
}: {
  src?: string | null;
  alt: string;
  title?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(src) && !failed;

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-[#070707]", className)}>
      <BrandCover title={title} />
      {showPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src!}
          alt={alt}
          className="absolute inset-0 z-[1] h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/75 via-transparent to-black/15" />
    </div>
  );
}
