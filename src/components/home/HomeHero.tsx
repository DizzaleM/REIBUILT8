"use client";

import { Activity, Dumbbell, HeartPulse, Play, Swords, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useUi } from "@/components/providers/UiProvider";

const features = [
  { label: "Strength Training", icon: Dumbbell },
  { label: "Combat Training", icon: Swords },
  { label: "Live Coaching", icon: Target },
  { label: "Nutrition", icon: HeartPulse },
  { label: "Progress Tracking", icon: Activity },
];

export function HomeHero() {
  const { setVideoOpen } = useUi();

  return (
    <section className="relative min-h-[720px] overflow-hidden bg-r8-black lg:min-h-[800px]">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_42%,rgba(10,132,255,0.22),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_85%,rgba(0,81,204,0.1),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#050608_0%,#050608_38%,rgba(5,6,8,0.55)_62%,rgba(5,6,8,0.15)_100%)]" />

      <div className="relative mx-auto grid min-h-[720px] max-w-[1400px] items-center gap-6 px-4 pb-16 pt-28 sm:px-6 lg:min-h-[800px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:px-8 lg:pb-10">
        {/* Copy */}
        <div className="relative z-20 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-r8-blue-light">
            Online Coaching. Real Results.
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.75rem,7vw,5.25rem)] font-bold uppercase leading-[0.88] tracking-wide text-r8-white">
            Train Different.
            <span className="mt-1 block text-r8-blue">Build Your Next Level.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-r8-secondary sm:text-lg">
            Custom training, structured programs and real support designed to help you become stronger, more consistent
            and more confident.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/assessment" size="lg" className="shadow-[0_0_24px_rgba(10,132,255,0.35)]">
              Start Your Journey
            </Button>
            <Button href="/programs" variant="secondary" size="lg" className="border-white/35">
              <Play className="h-4 w-4" /> Browse Programs
            </Button>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
            {features.map(({ label, icon: Icon }) => (
              <li key={label} className="min-w-0">
                <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full border border-r8-blue/45 text-r8-blue-light">
                  <Icon className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <span className="block text-[11px] font-semibold uppercase leading-snug tracking-[0.1em] text-r8-secondary">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rei cutout — IMG_4303 */}
        <div className="relative z-10 mx-auto flex h-[460px] w-full max-w-lg items-end justify-center sm:h-[540px] lg:h-[680px] lg:max-w-none lg:w-[52%]">
          <div className="pointer-events-none absolute bottom-[12%] left-1/2 h-[58%] w-[72%] -translate-x-1/2 rounded-full bg-r8-blue/30 blur-[70px]" />
          <div className="pointer-events-none absolute inset-y-[8%] right-[8%] w-24 bg-gradient-to-l from-r8-blue/20 to-transparent blur-2xl" />

          <div
            className="relative h-full w-full"
            style={{
              maskImage: "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/rei/IMG_4303.png"
              alt="Rei, founder of REIBUILT 8, standing in athletic pose"
              className="h-full w-full object-contain object-[center_15%] drop-shadow-[0_30px_60px_rgba(10,132,255,0.22)]"
              fetchPriority="high"
            />
          </div>

          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="absolute bottom-6 right-2 z-20 flex w-[min(100%,250px)] items-center gap-3 rounded-xl border border-white/15 bg-r8-black/65 p-3 text-left backdrop-blur-md transition hover:border-r8-blue sm:right-4"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-r8-blue text-white shadow-[0_0_18px_rgba(10,132,255,0.45)]">
              <Play className="h-4 w-4 fill-current" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] uppercase tracking-[0.14em] text-r8-blue-light">
                Welcome from Your Coach
              </span>
              <span className="block text-sm font-medium text-r8-white">Watch Video</span>
              <span className="mt-1 block h-0.5 w-full overflow-hidden rounded bg-white/10">
                <span className="block h-full w-1/3 bg-r8-blue" />
              </span>
              <span className="mt-1 block text-[10px] text-r8-muted">1:32</span>
            </span>
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-r8-black to-transparent" />
    </section>
  );
}
