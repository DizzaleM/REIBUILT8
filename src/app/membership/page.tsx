"use client";

import { useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { PricingCard } from "@/components/cards/ContentCards";
import { useUi } from "@/components/providers/UiProvider";
import { membershipComparison, membershipPlans } from "@/data/memberships";
import { membershipFaqs } from "@/data/faqs";

export default function MembershipPage() {
  const [annual, setAnnual] = useState(false);
  const { openCheckout } = useUi();

  return (
    <div>
      <PageHero
        title="Membership"
        description="Choose the level of access, live training, and coaching support that fits your goals."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="inline-flex rounded-lg border border-r8-border bg-r8-charcoal p-1">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${!annual ? "bg-r8-white text-r8-black" : "text-r8-secondary"}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${annual ? "bg-r8-white text-r8-black" : "text-r8-secondary"}`}
            >
              Annual · Save 15%
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {membershipPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              annual={annual}
              onJoin={() => openCheckout(`Secure payment processing for ${plan.name} will be connected later.`)}
            />
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading title="Full Feature Comparison" />
          <div className="mt-6 overflow-x-auto rounded-xl border border-r8-border">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-r8-elevated text-r8-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Feature</th>
                  <th className="px-4 py-3 font-medium">Foundation</th>
                  <th className="px-4 py-3 font-medium">Forge</th>
                  <th className="px-4 py-3 font-medium">Diesel Elite</th>
                </tr>
              </thead>
              <tbody>
                {membershipComparison.map((row) => (
                  <tr key={row.feature} className="border-t border-r8-border">
                    <td className="px-4 py-3 text-r8-white">{row.feature}</td>
                    <td className="px-4 py-3 text-r8-secondary">{row.foundation}</td>
                    <td className="px-4 py-3 text-r8-secondary">{row.forge}</td>
                    <td className="px-4 py-3 text-r8-secondary">{row.elite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            ["On-Demand Library", "Train anytime with structured programs and weekly drops."],
            ["Live Class Access", "Show up live or catch member replays when available."],
            ["Diesel Community", "Stay accountable with member check-ins and challenges."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-xl border border-r8-border bg-r8-charcoal p-5">
              <h3 className="font-display text-xl uppercase text-r8-white">{title}</h3>
              <p className="mt-2 text-sm text-r8-secondary">{copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-r8-border bg-r8-elevated p-6 sm:p-8">
          <h3 className="font-display text-3xl uppercase text-r8-white">Member Dashboard Preview</h3>
          <p className="mt-3 max-w-2xl text-sm text-r8-secondary">
            Progress tracking, today&apos;s workout, and upcoming live sessions will live in the member area once accounts are connected.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {["Today's Workout", "Weekly Streak", "Live This Week"].map((label) => (
              <div key={label} className="rounded-lg border border-r8-border bg-r8-black p-4 text-sm text-r8-muted">
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading title="Membership FAQ" />
          <div className="mt-6">
            <FaqAccordion items={membershipFaqs} />
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-r8-border bg-[linear-gradient(180deg,#141414_0%,#0a0a0a_100%)] p-8 text-center">
          <h2 className="font-display text-4xl uppercase text-r8-white">Strength Through Discipline</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/assessment">Get My Personalized Plan</Button>
            <Button href="/coaching" variant="secondary">
              Talk Coaching
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
