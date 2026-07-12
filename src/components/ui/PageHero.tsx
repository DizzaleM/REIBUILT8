import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-r8-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-r8-secondary">
                {item.label}
              </Link>
            ) : (
              <span className="text-r8-secondary">{item.label}</span>
            )}
            {index < items.length - 1 ? <span className="text-r8-border">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-dashed border-r8-border bg-r8-charcoal px-6 py-12 text-center", className)}>
      <div className="mb-6 flex justify-center">
        <Logo href={false} variant="modal" />
      </div>
      <h3 className="font-display text-2xl uppercase text-r8-white">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm text-r8-secondary">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function PageHero({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  return (
    <section className="border-b border-r8-border bg-r8-black-2 pt-32 pb-12 sm:pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Logo href={false} variant="modal" />
        </div>
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-r8-secondary">{eyebrow}</p>
        ) : null}
        <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-wide text-r8-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? <p className="mt-4 max-w-2xl text-base text-r8-secondary sm:text-lg">{description}</p> : null}
      </div>
    </section>
  );
}
