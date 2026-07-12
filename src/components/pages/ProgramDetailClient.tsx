"use client";

import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { useUi } from "@/components/providers/UiProvider";
import { useCart } from "@/components/providers/CartProvider";
import { formatPrice } from "@/lib/utils";
import type { Program } from "@/types";

export function ProgramDetailClient({ program }: { program: Program }) {
  const { openCheckout, setVideoOpen, pushToast } = useUi();
  const { addItem } = useCart();

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Programs", href: "/programs" },
            { label: program.title },
          ]}
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <ImagePlaceholder src={program.image} alt={program.title} label="Add Program Photo" fill />
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <Badge>{program.goal}</Badge>
              <Badge tone="neutral">{program.level}</Badge>
              <Badge tone="neutral">{program.durationWeeks} weeks</Badge>
              <Badge tone="neutral">{program.workouts} workouts</Badge>
            </div>
            <h1 className="mt-4 font-display text-4xl uppercase text-r8-white sm:text-5xl">{program.title}</h1>
            <p className="mt-4 max-w-3xl text-r8-secondary">{program.description}</p>

            <h2 className="mt-10 font-display text-2xl uppercase text-r8-white">What&apos;s Included</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {program.includes.map((item) => (
                <li key={item} className="rounded-lg border border-r8-border bg-r8-elevated px-4 py-3 text-sm text-r8-secondary">
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-2xl uppercase text-r8-white">Weekly Breakdown</h2>
            <div className="mt-4 space-y-2">
              {program.weeklyBreakdown.map((week) => (
                <div key={week.week} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-r8-border px-4 py-3">
                  <p className="text-r8-white">Week {week.week}: {week.focus}</p>
                  <p className="text-sm text-r8-muted">{week.sessions} sessions</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 font-display text-2xl uppercase text-r8-white">Sample Workouts</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {program.sampleWorkouts.map((w) => (
                <div key={w.title} className="rounded-xl border border-r8-border bg-r8-charcoal p-4">
                  <p className="font-medium text-r8-white">{w.title}</p>
                  <p className="mt-1 text-sm text-r8-muted">{w.duration} · {w.focus}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 font-display text-2xl uppercase text-r8-white">Video Preview</h2>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="relative mt-4 block aspect-video w-full overflow-hidden rounded-xl border border-r8-border"
            >
              <ImagePlaceholder src="/images/rei/workout-preview-1.jpg" alt="Program preview" label="Add Preview Video Still" fill />
            </button>

            <h2 className="mt-10 font-display text-2xl uppercase text-r8-white">FAQ</h2>
            <div className="mt-4">
              <FaqAccordion
                items={program.faqs.map((f, i) => ({
                  id: `${program.id}-faq-${i}`,
                  question: f.question,
                  answer: f.answer,
                }))}
              />
            </div>

            <h2 className="mt-10 font-display text-2xl uppercase text-r8-white">Reviews</h2>
            <div className="mt-4 rounded-xl border border-dashed border-r8-border p-6 text-sm text-r8-secondary">
              Member reviews will appear here once collected and approved. Do not invent ratings or testimonials for launch.
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-r8-border bg-r8-elevated p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-r8-muted">One-time purchase</p>
              <p className="mt-2 font-display text-4xl text-r8-white">{formatPrice(program.price)}</p>
              <p className="mt-2 text-sm text-r8-secondary">
                Trainer: Rei · Equipment: {program.equipment.join(", ")}
              </p>
              {program.membershipIncluded ? (
                <p className="mt-3 text-sm text-r8-blue-light">Also available with Built and Elite memberships.</p>
              ) : null}
              <div className="mt-6 space-y-3">
                <Button
                  className="w-full"
                  onClick={() => {
                    addItem({
                      id: program.id,
                      slug: program.slug,
                      name: program.title,
                      price: program.price,
                      image: program.image,
                      type: "program",
                    });
                    pushToast("Program added to cart.");
                  }}
                >
                  Buy Program
                </Button>
                <Button className="w-full" variant="secondary" href="/membership">
                  Join Membership
                </Button>
                <Button className="w-full" variant="ghost" onClick={() => setVideoOpen(true)}>
                  Preview Workout
                </Button>
                <Button
                  className="w-full"
                  variant="dark"
                  onClick={() => openCheckout("Secure checkout for this program will be connected later.")}
                >
                  Mock Checkout
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div className="h-20" />
    </div>
  );
}
