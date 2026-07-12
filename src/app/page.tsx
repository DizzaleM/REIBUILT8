"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  CalendarDays,
  Check,
  Dumbbell,
  Play,
  ShoppingBag,
  UserRound,
  Users,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { PricingCard, TestimonialCard } from "@/components/cards/ContentCards";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { useUi } from "@/components/providers/UiProvider";
import { programs } from "@/data/programs";
import { membershipPlans } from "@/data/memberships";
import { testimonials } from "@/data/testimonials";
import { getFeaturedClass } from "@/data/classes";

const trustItems = [
  "On-demand workouts",
  "Weekly live classes",
  "Personal coaching",
  "Nutrition support",
  "Progress tracking",
];

const paths = [
  {
    title: "On-Demand Programs",
    description: "Structured plans you can start today and train on your schedule.",
    href: "/programs",
    icon: Dumbbell,
  },
  {
    title: "Live Classes",
    description: "Train live with Rei and stay accountable in real time.",
    href: "/live",
    icon: Video,
  },
  {
    title: "One-on-One Coaching",
    description: "Custom strategy, direct feedback, and a plan built around you.",
    href: "/coaching",
    icon: UserRound,
  },
  {
    title: "Membership",
    description: "Unlock the library, live access, and ongoing progress tools.",
    href: "/membership",
    icon: Users,
  },
];

const shopCategories = [
  { name: "Apparel", href: "/shop?category=Apparel" },
  { name: "Supplements", href: "/shop?category=Supplements" },
  { name: "Meal Prep", href: "/meal-prep" },
  { name: "Digital Programs", href: "/shop?category=Digital%20Programs" },
  { name: "Accessories", href: "/shop?category=Accessories" },
  { name: "Gift Cards", href: "/shop?category=Gift%20Cards" },
];

export default function HomePage() {
  const { setVideoOpen, setReserveOpen, openCheckout } = useUi();
  const [annual, setAnnual] = useState(false);
  const featured = programs.filter((p) => p.featured).slice(0, 4);
  const nextClass = getFeaturedClass();

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[100svh] overflow-hidden bg-r8-black pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(8,107,255,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(0,70,199,0.12),transparent_45%)]" />
        <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-20">
          <div className="relative z-10 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-r8-blue-light">
              Online Training. Real Structure. Real Results.
            </p>
            <h1 className="mt-5 font-display text-5xl font-bold uppercase leading-[0.9] tracking-wide text-r8-white sm:text-6xl lg:text-7xl">
              Train Different.
              <span className="mt-2 block text-r8-blue">Build Your Next Level.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-r8-secondary sm:text-lg">
              Structured workouts, live coaching, nutrition support and real accountability designed to help you build
              lasting results.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/assessment" size="lg">
                Start Your Journey
              </Button>
              <Button href="/programs" variant="secondary" size="lg">
                Browse Programs
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-xs uppercase tracking-[0.14em] text-r8-muted">
              {trustItems.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-r8-blue-light" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[620px]">
            <div className="hero-image-fade absolute inset-0">
              <ImagePlaceholder
                src="/images/rei/hero-rei.jpg"
                alt="Rei coaching portrait placeholder"
                label="Add Rei Photo"
                fill
                priority
                className="object-cover object-top"
              />
            </div>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="absolute bottom-6 right-4 z-10 flex w-[min(100%,280px)] items-center gap-3 rounded-xl border border-r8-border bg-r8-black/80 p-3 text-left backdrop-blur-md transition hover:border-r8-blue sm:right-0"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-r8-blue text-white">
                <Play className="h-4 w-4 fill-current" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.16em] text-r8-blue-light">Meet Your Coach</span>
                <span className="block text-sm font-medium text-r8-white">Watch Rei&apos;s Introduction</span>
                <span className="block text-xs text-r8-muted">1:32</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick paths */}
      <section className="border-t border-r8-border bg-r8-black-2 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading title="Choose How You Want to Train" align="center" />
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map((path, index) => (
              <FadeIn key={path.href} delay={index * 0.05}>
                <Link
                  href={path.href}
                  className="group flex h-full flex-col rounded-xl border border-r8-border bg-r8-elevated p-6 transition hover:-translate-y-1 hover:border-r8-blue"
                >
                  <path.icon className="h-6 w-6 text-r8-blue-light" />
                  <h3 className="mt-5 font-display text-2xl uppercase text-r8-white">{path.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-r8-secondary">{path.description}</p>
                  <span className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-r8-blue-light">
                    Explore →
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured programs */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading title="Programs Built for Real Results" />
              <Button href="/programs" variant="secondary">
                View All Programs
              </Button>
            </div>
          </FadeIn>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featured.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Live class */}
      <section className="border-y border-r8-border bg-r8-black-2 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[16/11] lg:aspect-[4/5]">
              <ImagePlaceholder src="/images/rei/live-class.jpg" alt="Live training session" label="Add Class Photo" fill />
              <div className="absolute left-4 top-4">
                <Badge>Live</Badge>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <SectionHeading eyebrow="Upcoming Session" title="Train Live with Rei" />
            <h3 className="mt-6 font-display text-3xl uppercase text-r8-white">{nextClass.title}</h3>
            <ul className="mt-4 space-y-2 text-r8-secondary">
              <li className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-r8-blue-light" />
                {nextClass.day} · {nextClass.time} {nextClass.timezone}
              </li>
              <li>{nextClass.durationMinutes} minutes · {nextClass.level}</li>
              <li>Equipment: {nextClass.equipment}</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => setReserveOpen(true)}>Reserve Your Spot</Button>
              <Button href="/live" variant="secondary">
                View Full Schedule
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Coaching */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FadeIn>
            <SectionHeading title="Coaching Built Around You" />
            <p className="mt-4 max-w-xl text-r8-secondary">
              Get a customized training strategy, direct accountability and a plan designed around your goals, schedule
              and experience level.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Personalized workout plan",
                "Initial fitness assessment",
                "Weekly progress review",
                "Form feedback",
                "Nutrition guidance",
                "Direct coach communication",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-r8-secondary">
                  <Check className="mt-0.5 h-4 w-4 text-r8-blue-light" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/coaching">Apply for Coaching</Button>
              <Button href="/assessment" variant="secondary">
                See How It Works
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <ImagePlaceholder src="/images/rei/coaching-rei.jpg" alt="Rei coaching" label="Add Rei Photo" fill />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Shop categories */}
      <section className="border-y border-r8-border bg-r8-black-2 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading title="Shop REIBUILT 8" align="center" />
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shopCategories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative flex min-h-40 items-end overflow-hidden rounded-xl border border-r8-border bg-r8-elevated p-6 transition hover:border-r8-blue"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-r8-black via-r8-black/40 to-transparent" />
                <div className="absolute inset-0 opacity-40 transition group-hover:opacity-60">
                  <ImagePlaceholder alt={cat.name} label={cat.name} fill />
                </div>
                <div className="relative z-10 flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-r8-blue-light" />
                  <span className="font-display text-2xl uppercase text-r8-white">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading title="Choose Your Membership" align="center" />
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-lg border border-r8-border bg-r8-charcoal p-1">
                <button
                  type="button"
                  onClick={() => setAnnual(false)}
                  className={`rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                    !annual ? "bg-r8-blue text-white" : "text-r8-secondary"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setAnnual(true)}
                  className={`rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                    annual ? "bg-r8-blue text-white" : "text-r8-secondary"
                  }`}
                >
                  Annual · Save 15%
                </button>
              </div>
            </div>
          </FadeIn>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {membershipPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                annual={annual}
                onJoin={() =>
                  openCheckout(
                    `Secure payment processing for the ${plan.name} plan will be connected later. No card details are collected in this mockup.`,
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="border-y border-r8-border bg-r8-black-2 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Train Anytime, Anywhere"
              description="A preview of the member experience — workouts, progress, and live sessions in one place."
              align="center"
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-r8-border bg-r8-charcoal p-4 sm:p-6">
              <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-xl border border-r8-border bg-r8-elevated p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-r8-muted">Today&apos;s Workout</p>
                      <h3 className="mt-1 font-display text-2xl uppercase text-r8-white">Lower Strength A</h3>
                    </div>
                    <Button size="sm">Continue</Button>
                  </div>
                  <div className="relative mt-4 aspect-video overflow-hidden rounded-lg">
                    <ImagePlaceholder src="/images/rei/workout-preview-1.jpg" alt="Workout preview" label="Add Workout Photo" fill />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <StatCard label="Workouts Completed" value="18" />
                  <StatCard label="Calories Burned" value="6,420" />
                  <StatCard label="Current Streak" value="12 days" />
                  <StatCard label="Program Progress" value="62%" />
                </div>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-r8-border bg-r8-elevated p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-r8-muted">Weekly Activity</p>
                  <div className="mt-4 flex h-28 items-end gap-2">
                    {[40, 65, 50, 80, 70, 90, 55].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t bg-r8-blue/80" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-r8-border bg-r8-elevated p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-r8-muted">Upcoming Live Class</p>
                  <p className="mt-3 font-display text-xl uppercase text-r8-white">{nextClass.title}</p>
                  <p className="mt-1 text-sm text-r8-secondary">
                    {nextClass.day} · {nextClass.time} {nextClass.timezone}
                  </p>
                  <Button href="/live" variant="secondary" size="sm" className="mt-4">
                    View Schedule
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading title="What Members Are Saying" align="center" />
          </FadeIn>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-dashed border-r8-border bg-r8-charcoal p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-r8-warning">Sample Content</p>
            <p className="mt-2 text-sm text-r8-secondary">
              Transformation gallery placeholders — replace with approved before-and-after photos before launch.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {["Before / After 1", "Before / After 2", "Before / After 3"].map((label) => (
                <div key={label} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <ImagePlaceholder alt={label} label={label} fill />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Rei */}
      <section className="border-y border-r8-border bg-r8-black-2 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <ImagePlaceholder src="/images/rei/about-rei.jpg" alt="Meet Rei" label="Add Rei Photo" fill />
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <SectionHeading title="Meet Rei" />
            <p className="mt-4 text-r8-secondary">
              Rei created REIBUILT 8 to give people more than random workouts. His approach combines structure,
              accountability and practical coaching so members can build strength, improve confidence and create habits
              that last.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about">Meet Your Coach</Button>
              <Button href="/assessment" variant="secondary">
                Start Training
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Email signup */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              title="Get Training Tips from Rei"
              description="Join the list for workouts, nutrition tips, class announcements and new program releases."
              align="center"
            />
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-r8-border bg-[linear-gradient(180deg,#090B0F_0%,#0B1A33_100%)] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Activity className="mx-auto h-8 w-8 text-r8-blue-light" />
          <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-none text-r8-white sm:text-5xl">
            Ready to Build Your Next Level?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/membership" size="lg">
              Join REIBUILT 8
            </Button>
            <Button href="/programs" variant="secondary" size="lg">
              Explore Programs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-r8-border bg-r8-elevated p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-r8-muted">{label}</p>
      <p className="mt-2 font-display text-3xl text-r8-white">{value}</p>
    </div>
  );
}
