"use client";

import { SafeMedia } from "@/components/ui/SafeMedia";
import { cn } from "@/lib/utils";

/**
 * Full-color photography with a light readability overlay only.
 * Never grayscale, desaturate, or monochrome-filter photos.
 */
export function TreatedPhoto({
  src,
  alt,
  className,
  title,
}: {
  src: string;
  alt: string;
  className?: string;
  title?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative h-full w-full min-h-[12rem] overflow-hidden", className)}>
      <SafeMedia src={src} alt={alt} title={title ?? alt} />
      {/* Subtle dark gradient for text contrast — does not remove color */}
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black/55 via-transparent to-transparent" />
    </div>
  );
}
