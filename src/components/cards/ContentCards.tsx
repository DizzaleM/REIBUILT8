"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { LiveClass, Meal, MembershipPlan, Testimonial } from "@/types";
import { Star } from "lucide-react";

export function LiveClassCard({
  liveClass,
  onReserve,
}: {
  liveClass: LiveClass;
  onReserve?: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-r8-border bg-r8-elevated">
      <div className="relative aspect-[16/9] overflow-hidden bg-r8-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={liveClass.image} alt={liveClass.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-r8-black/70 via-transparent to-r8-black/20" />
        <div className="absolute left-3 top-3 flex gap-2">
          {liveClass.isPast ? <Badge tone="neutral">Replay</Badge> : <Badge>Live</Badge>}
          <Badge tone="neutral">{liveClass.type}</Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl uppercase text-r8-white">{liveClass.title}</h3>
        <p className="mt-2 text-sm text-r8-secondary">
          {liveClass.day} · {liveClass.time} {liveClass.timezone} · {liveClass.durationMinutes} min
        </p>
        <p className="mt-1 text-sm text-r8-muted">
          {liveClass.level} · {liveClass.equipment} · Coach {liveClass.coach}
        </p>
        {!liveClass.isPast ? (
          <p className="mt-3 text-xs uppercase tracking-wider text-r8-secondary">
            {liveClass.spotsRemaining} spots remaining
          </p>
        ) : null}
        <Button
          className="mt-4 w-full"
          variant={liveClass.isPast ? "secondary" : "primary"}
          onClick={onReserve}
        >
          {liveClass.isPast ? "Watch Replay" : "Reserve Spot"}
        </Button>
      </div>
    </article>
  );
}

export function MealCard({ meal, onAdd }: { meal: Meal; onAdd?: () => void }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-r8-border bg-r8-elevated">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0c10]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={meal.image} alt={meal.name} className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-r8-muted">{meal.category}</p>
        <h3 className="mt-1 font-display text-xl uppercase text-r8-white">{meal.name}</h3>
        <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs">
          <div className="rounded-md bg-r8-charcoal p-2">
            <p className="text-r8-muted">Cal</p>
            <p className="font-semibold text-r8-white">{meal.calories}</p>
          </div>
          <div className="rounded-md bg-r8-charcoal p-2">
            <p className="text-r8-muted">P</p>
            <p className="font-semibold text-r8-white">{meal.protein}g</p>
          </div>
          <div className="rounded-md bg-r8-charcoal p-2">
            <p className="text-r8-muted">C</p>
            <p className="font-semibold text-r8-white">{meal.carbs}g</p>
          </div>
          <div className="rounded-md bg-r8-charcoal p-2">
            <p className="text-r8-muted">F</p>
            <p className="font-semibold text-r8-white">{meal.fat}g</p>
          </div>
        </div>
        <p className="mt-3 line-clamp-2 text-xs text-r8-muted">{meal.ingredients.join(" · ")}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-r8-secondary">{formatPrice(meal.price)}</p>
            <p className="text-xs text-r8-muted">Sub {formatPrice(meal.subscriptionPrice)}</p>
          </div>
          <Button size="sm" onClick={onAdd}>
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}

export function PricingCard({
  plan,
  annual,
  onJoin,
}: {
  plan: MembershipPlan;
  annual: boolean;
  onJoin: () => void;
}) {
  const price = annual ? plan.annualPrice / 12 : plan.monthlyPrice;
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className={`relative flex h-full flex-col rounded-xl border p-6 ${
        plan.popular ? "border-white bg-r8-elevated shadow-[0_0_40px_rgba(255,255,255,0.15)]" : "border-r8-border bg-r8-charcoal"
      }`}
    >
      {plan.popular ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge>Most Popular</Badge>
        </div>
      ) : null}
      <h3 className="font-display text-3xl uppercase text-r8-white">{plan.name}</h3>
      <p className="mt-2 text-sm text-r8-secondary">{plan.description}</p>
      <p className="mt-6 font-display text-4xl text-r8-white">
        {formatPrice(price)}
        <span className="text-base text-r8-muted">/month</span>
      </p>
      {annual ? <p className="mt-1 text-xs text-r8-secondary">Billed annually · Save 15%</p> : null}
      <ul className="mt-6 flex-1 space-y-2 text-sm text-r8-secondary">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="text-r8-secondary">▸</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="mt-8 w-full" onClick={onJoin}>
        {plan.cta}
      </Button>
    </motion.article>
  );
}

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="h-full rounded-xl border border-r8-border bg-r8-elevated p-6">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-r8-border bg-r8-charcoal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image || "/images/testimonials/member-1.jpg"}
            alt={`${item.name}`}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-r8-white">{item.name}</p>
          <p className="text-xs text-r8-muted">{item.program}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
        {Array.from({ length: item.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-white text-white" />
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-r8-secondary">&ldquo;{item.quote}&rdquo;</p>
      {item.verified ? <p className="mt-4 text-xs uppercase tracking-wider text-r8-secondary">Verified member</p> : null}
    </article>
  );
}
