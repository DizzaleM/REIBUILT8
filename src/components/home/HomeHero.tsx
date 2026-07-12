"use client";

import {
  ArrowRight,
  Dumbbell,
  Play,
  Timer,
  Users,
  Utensils,
  Swords,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DieselWayLogo } from "@/components/brand/DieselWayLogo";
import { useUi } from "@/components/providers/UiProvider";

const features = [
  { label: "Strength Training", icon: Dumbbell },
  { label: "Combat Training", icon: Swords },
  { label: "Conditioning & Athletics", icon: Timer },
  { label: "Nutrition Guidance", icon: Utensils },
  { label: "Real Support", icon: Users },
];

const HERO_IMAGE = "/images/coach/screenshot-2026-07-12-hero.png";

export function HomeHero() {
  const { setVideoOpen } = useUi();

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-black lg:min-h-[920px]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_78%_35%,rgba(255,255,255,0.07)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1500px] grid-cols-1 px-4 pb-28 pt-28 sm:px-6 sm:pt-32 lg:min-h-[920px] lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:items-center lg:gap-10 lg:px-12 lg:pb-16 lg:pt-28">
        {/* Left: logo + headline + copy + CTAs + features */}
        <div className="relative z-20 flex flex-col justify-center">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10 lg:gap-12">
            <div className="w-[clamp(200px,42vw,280px)] shrink-0 lg:w-[clamp(240px,18vw,290px)]">
              <DieselWayLogo variant="hero" priority className="!w-full" />
            </div>

            <h1 className="m-0 flex min-w-0 flex-col font-display text-[clamp(3rem,8vw,6.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.035em] text-white lg:text-[clamp(74px,5.8vw,112px)]">
              <span>Strength</span>
              <span>Through</span>
              <span className="text-[#B0B0B0]">Discipline.</span>
            </h1>
          </div>

          <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-[#D0D0D0] sm:text-base lg:mt-10 lg:text-lg">
            Train with Dem Diesel. Structured programs, combat training, and real support — built for people who earn
            every rep.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/assessment" size="lg" className="!bg-white !text-black hover:!bg-[#E5E5E5]">
              Start Training
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </Button>
            <Button href="/programs" variant="secondary" size="lg" className="!border-white !text-white">
              Explore Programs
            </Button>
          </div>

          <ul className="mt-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {features.map(({ label, icon: Icon }) => (
              <li key={label} className="min-w-0">
                <Icon className="mb-3 h-6 w-6 text-white" strokeWidth={1.35} />
                <span className="block text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-[#A8A8A8] sm:text-[11px]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Demery + video card */}
        <div className="relative mt-10 flex min-h-[360px] items-end justify-center sm:min-h-[480px] lg:mt-0 lg:h-full lg:min-h-[720px] lg:justify-end">
          <div
            className="pointer-events-none absolute bottom-[18%] left-1/2 h-[55%] w-[75%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.09)_0%,transparent_70%)] blur-2xl lg:left-auto lg:right-[12%] lg:translate-x-0"
            aria-hidden
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${HERO_IMAGE}?v=clean1`}
            alt="Dem Diesel, founder of The Diesel Way"
            className="relative z-[1] h-auto max-h-[480px] w-auto max-w-full object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] sm:max-h-[600px] lg:max-h-[860px] lg:h-[min(86vh,860px)]"
            fetchPriority="high"
            decoding="async"
          />

          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="absolute bottom-2 right-0 z-30 flex w-[min(100%,280px)] items-center gap-3 rounded-xl border border-white/15 bg-black/70 p-3 text-left shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:border-white/40 hover:bg-black/80 sm:bottom-4 sm:right-2 lg:bottom-8 lg:right-0"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] uppercase tracking-[0.16em] text-[#C7C7C7]">
                Welcome to The Diesel Way
              </span>
              <span className="mt-0.5 block text-sm font-medium text-white">Watch Introduction</span>
              <span className="mt-2 flex items-center gap-2">
                <span className="h-0.5 flex-1 overflow-hidden rounded bg-white/10">
                  <span className="block h-full w-[34%] bg-white" />
                </span>
                <span className="text-[10px] tabular-nums text-[#8C8C8C]">1:32</span>
              </span>
            </span>
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[#1a1a1a]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${HERO_IMAGE}?v=clean1`} alt="" className="h-full w-full object-cover object-top" aria-hidden />
              <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                  <Play className="h-3 w-3 fill-current" />
                </span>
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
