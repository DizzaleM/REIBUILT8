"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CalendarDays,
  Check,
  Dumbbell,
  ShoppingBag,
  Swords,
  UserRound,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/FadeIn";
import { HomeHero } from "@/components/home/HomeHero";
import { TreatedPhoto } from "@/components/ui/TreatedPhoto";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { PricingCard, TestimonialCard } from "@/components/cards/ContentCards";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { useUi } from "@/components/providers/UiProvider";
import { programs } from "@/data/programs";
import { membershipPlans } from "@/data/memberships";
import { testimonials } from "@/data/testimonials";
import { getFeaturedClass } from "@/data/classes";

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

const performanceCards = [
  {
    title: "Strength Training",
    description: "Build lasting strength with progressive, structured lifting programs.",
    href: "/programs/build-strength",
    image: "/images/programs/build-strength.jpg",
    alt: "Rei locking out a heavy deadlift",
  },
  {
    title: "Boxing",
    description: "Develop speed, power, and striking skill through structured boxing work.",
    href: "/combat",
    image: "/images/programs/combat-heavy-bag.jpg",
    alt: "Rei training on a heavy bag",
  },
  {
    title: "Kickboxing",
    description: "Conditioning and striking fundamentals for athletic confidence.",
    href: "/combat#categories",
    image: "/images/combat/boxing-2.jpg",
    alt: "Athlete training striking fundamentals",
  },
  {
    title: "Athletic Conditioning",
    description: "Engine work that supports strength, combat, and real-life performance.",
    href: "/programs/athletic-performance",
    image: "/images/programs/athletic-performance.jpg",
    alt: "Rei showing athletic physique after training",
  },
];

const shopCategories = [
  { name: "Apparel", href: "/shop?category=Apparel", image: "/images/products/r8-hoodie.jpg" },
  { name: "Supplements", href: "/shop?category=Supplements", image: "/images/products/r8-supplement.jpg" },
  { name: "Meal Prep", href: "/meal-prep", image: "/images/products/r8-meal-prep.jpg" },
  {
    name: "Digital Programs",
    href: "/shop?category=Digital%20Programs",
    image: "/images/programs/build-strength.jpg",
  },
  { name: "Accessories", href: "/shop?category=Accessories", image: "/images/products/r8-shaker.jpg" },
  { name: "Gift Cards", href: "/shop?category=Gift%20Cards", image: "/images/products/r8-hat.jpg" },
];

export default function HomePage() {
  const { setReserveOpen, openCheckout } = useUi();
  const [annual, setAnnual] = useState(false);
  const featured = programs.filter((p) => p.featured).slice(0, 4);
  const nextClass = getFeaturedClass();

  return (
    <div>
      <HomeHero />

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

      <section className="border-y border-r8-border bg-r8-black-2 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading
              eyebrow="Strength + Combat + Conditioning"
              title="Train for Performance"
              description="REIBUILT 8 combines strength training, combat performance, and lifestyle coaching into one premium platform."
              align="center"
            />
          </FadeIn>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {performanceCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative min-h-72 overflow-hidden rounded-xl border border-r8-border"
              >
                <TreatedPhoto src={card.image} alt={card.alt} className="absolute inset-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-r8-black via-r8-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-2xl uppercase text-r8-white">{card.title}</h3>
                  <p className="mt-2 text-sm text-r8-secondary">{card.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-r8-blue-light">
                    {card.title === "Boxing" || card.title === "Kickboxing" ? (
                      <Swords className="h-3.5 w-3.5" />
                    ) : (
                      <Zap className="h-3.5 w-3.5" />
                    )}
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[16/11] lg:aspect-[4/5]">
              <TreatedPhoto src="/images/live/live-class-1.jpg" alt="Athletes training in a live coaching session" />
              <div className="absolute left-4 top-4 z-10">
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
              <li>
                {nextClass.durationMinutes} minutes · {nextClass.level}
              </li>
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

      <section className="border-y border-r8-border bg-r8-black-2 py-20">
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
            <div className="relative mx-auto aspect-[3/4] max-w-md">
              <div className="pointer-events-none absolute bottom-[10%] left-1/2 h-1/2 w-3/4 -translate-x-1/2 rounded-full bg-r8-blue/20 blur-3xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/rei/IMG_4303.png"
                alt="Rei, REIBUILT 8 coach"
                className="relative h-full w-full object-contain object-bottom"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeading title="Shop REIBUILT 8" align="center" />
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shopCategories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative flex min-h-44 items-end overflow-hidden rounded-xl border border-r8-border bg-r8-elevated p-6 transition hover:border-r8-blue"
              >
                <TreatedPhoto
                  src={cat.image}
                  alt={`${cat.name} category`}
                  className="absolute inset-0 opacity-70 transition group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-r8-black via-r8-black/50 to-transparent" />
                <div className="relative z-10 flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-r8-blue-light" />
                  <span className="font-display text-2xl uppercase text-r8-white">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-r8-border bg-r8-black-2 py-20">
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
          <p className="mt-6 text-center text-xs text-r8-muted">
            Sample content — portraits are stock photography until verified member photos are approved.
          </p>
        </div>
      </section>

      <section className="border-y border-r8-border bg-r8-black-2 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <FadeIn>
            <div className="relative mx-auto aspect-[3/4] max-w-md">
              <div className="pointer-events-none absolute bottom-[10%] left-1/2 h-1/2 w-3/4 -translate-x-1/2 rounded-full bg-r8-blue/20 blur-3xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/programs/athletic-performance.png"
                alt="Rei showing athletic back development"
                className="relative h-full w-full object-contain object-bottom"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <SectionHeading title="Meet Rei" />
            <p className="mt-4 text-r8-secondary">
              Rei created REIBUILT 8 to deliver more than random workouts — strength training, combat performance, and
              practical coaching so members can build confidence and habits that last.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about">Meet Your Coach</Button>
              <Button href="/combat" variant="secondary">
                Explore Combat
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

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

      <section className="border-t border-r8-border bg-[linear-gradient(180deg,#090B0F_0%,#0B1A33_100%)] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold uppercase leading-none text-r8-white sm:text-5xl">
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
