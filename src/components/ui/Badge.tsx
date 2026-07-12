import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "blue",
  className,
}: {
  children: React.ReactNode;
  tone?: "blue" | "neutral" | "success" | "warning";
  className?: string;
}) {
  const tones = {
    blue: "bg-r8-blue/15 text-r8-blue-light border-r8-blue/30",
    neutral: "bg-r8-elevated text-r8-secondary border-r8-border",
    success: "bg-r8-success/15 text-r8-success border-r8-success/30",
    warning: "bg-r8-warning/15 text-r8-warning border-r8-warning/30",
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
