import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "accent",
  className,
}: {
  children: React.ReactNode;
  tone?: "accent" | "neutral" | "success" | "warning";
  className?: string;
}) {
  const tones = {
    accent: "bg-[#181818] text-white border-white/35",
    neutral: "bg-[#222222] text-[#C7C7C7] border-[#303030]",
    success: "bg-[#222222] text-[#C7C7C7] border-[#303030]",
    warning: "bg-[#222222] text-[#8C8C8C] border-[#303030]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
