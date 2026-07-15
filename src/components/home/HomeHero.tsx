"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAnimate, useReducedMotion, type AnimationSequence } from "framer-motion";
import {
  ArrowRight,
  Dumbbell,
  Play,
  Swords,
  Timer,
  Users,
  Utensils,
  Volume2,
  VolumeX,
} from "lucide-react";
import { DieselWayLogo } from "@/components/brand/DieselWayLogo";
import { useUi } from "@/components/providers/UiProvider";
import { Button } from "@/components/ui/Button";

const features = [
  { label: "Strength Training", icon: Dumbbell },
  { label: "Combat Training", icon: Swords },
  { label: "Conditioning & Athletics", icon: Timer },
  { label: "Nutrition Guidance", icon: Utensils },
  { label: "Real Support", icon: Users },
];

const HERO_IMAGE = "/images/coach/screenshot-2026-07-12-hero.png";
const SOUND_PREFERENCE_KEY = "diesel-way-impact-sound";
const ENERGY_RAYS = Array.from({ length: 22 }, (_, index) => ({
  angle: index * (360 / 22),
  width: 34 + ((index * 47) % 52),
  delay: (index % 5) * 0.018,
}));
const ENERGY_DEBRIS = Array.from({ length: 18 }, (_, index) => ({
  left: 8 + ((index * 37) % 84),
  top: 18 + ((index * 29) % 66),
  height: 14 + ((index * 17) % 40),
  rotate: -32 + ((index * 23) % 64),
}));

export function HomeHero() {
  const { setVideoOpen } = useUi();
  const [scope, animate] = useAnimate<HTMLElement>();
  const reduceMotion = useReducedMotion();
  const hasStarted = useRef(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const restoreSoundPreference = window.setTimeout(() => {
      setSoundEnabled(window.localStorage.getItem(SOUND_PREFERENCE_KEY) === "on");
    }, 0);

    return () => window.clearTimeout(restoreSoundPreference);
  }, []);

  useLayoutEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    if (reduceMotion) return;

    const mobile = window.matchMedia("(max-width: 768px)").matches;

    const impact = mobile ? 0.38 : 0.56;
    const headlineStart = mobile ? 0.58 : 0.88;
    const headlineStagger = mobile ? 0.055 : 0.08;
    const headlineDuration = mobile ? 0.24 : 0.34;
    const photoStart = mobile ? 0.52 : 0.78;
    const photoDuration = mobile ? 0.46 : 0.64;
    const supportStart = mobile ? 0.92 : 1.38;
    const supportDuration = mobile ? 0.3 : 0.42;
    const impactSegments: AnimationSequence = mobile
      ? []
      : [
          [
            ".hero-impact-flash",
            { opacity: [0, 1, 0] },
            { duration: 0.1, times: [0, 0.2, 1], ease: "linear", at: impact },
          ],
          [
            ".hero-impact-flash-secondary",
            { opacity: [0, 0.38, 0] },
            { duration: 0.09, times: [0, 0.18, 1], ease: "linear", at: impact + 0.17 },
          ],
        ];

    const sequence: AnimationSequence = [
      [".hero-logo-final", { opacity: 0, scale: 0.72, filter: "blur(10px)" }, { duration: 0, at: 0 }],
      [".hero-logo-echo", { opacity: 0, scale: 0.65 }, { duration: 0, at: 0 }],
      [".hero-headline-line", { y: "115%", skewX: -8 }, { duration: 0, at: 0 }],
      [
        ".hero-demery",
        {
          opacity: 0,
          scale: 1.08,
          filter: `blur(${mobile ? 5 : 12}px)`,
          clipPath: "inset(0 0 0 100%)",
        },
        { duration: 0, at: 0 },
      ],
      [".hero-support", { opacity: 0, y: 22 }, { duration: 0, at: 0 }],
      [".hero-energy-field", { opacity: 0, scale: 0.8 }, { duration: 0, at: 0 }],
      [".hero-speed-field", { opacity: 0, scale: 1.32 }, { duration: 0, at: 0 }],
      [".hero-aura-core", { opacity: 0, scale: 0.55 }, { duration: 0, at: 0 }],
      [".hero-aura-outer", { opacity: 0, scale: 0.7 }, { duration: 0, at: 0 }],
      [".hero-energy-debris", { opacity: 0, y: 50, scaleY: 0.3 }, { duration: 0, at: 0 }],
      [".hero-shockwave-primary", { opacity: 0, scale: 0.35 }, { duration: 0, at: 0 }],
      [".hero-shockwave-secondary", { opacity: 0, scale: 0.35 }, { duration: 0, at: 0 }],
      [
        ".hero-energy-field",
        { opacity: [0, 0.78, 0.42], scale: [0.8, 1.1, 1] },
        { duration: impact, times: [0, 0.72, 1], ease: [0.16, 1, 0.3, 1], at: 0 },
      ],
      [
        ".hero-speed-field",
        { opacity: [0, 0.92, 0.18], scale: [1.32, 0.82, 1] },
        { duration: impact, times: [0, 0.75, 1], ease: [0.4, 0, 0.2, 1], at: 0.06 },
      ],
      [
        ".hero-aura-outer",
        { opacity: [0, 0.8, 0.35], scale: [0.7, 1.2, 1] },
        { duration: impact, times: [0, 0.7, 1], ease: [0.16, 1, 0.3, 1], at: 0.09 },
      ],
      [
        ".hero-aura-core",
        { opacity: [0, 1, 0.62], scale: [0.55, 1.14, 1] },
        { duration: impact - 0.08, times: [0, 0.72, 1], ease: [0.16, 1, 0.3, 1], at: 0.15 },
      ],
      [
        ".hero-energy-debris",
        { opacity: [0, 0.9, 0], y: [50, -20, -120], scaleY: [0.3, 1.35, 0.7] },
        { duration: mobile ? 0.48 : 0.72, times: [0, 0.38, 1], ease: "easeOut", at: 0.16 },
      ],
      [
        ".hero-logo-echo",
        { opacity: [0, 0.78, 0], scale: [0.65, 1.42, 0.82] },
        { duration: mobile ? 0.24 : 0.34, times: [0, 0.45, 1], ease: "easeInOut", at: impact - 0.24 },
      ],
      [".hero-logo-final", { opacity: 1, scale: 1.28, filter: "blur(0px)" }, { duration: 0, at: impact }],
      ...impactSegments,
      [
        ".hero-logo-final",
        {
          scale: [1.28, 0.91, 1.055, 1],
          filter: [
            "drop-shadow(0 0 55px rgba(104,214,255,0.95)) drop-shadow(0 0 18px rgba(255,255,255,1))",
            "drop-shadow(0 18px 44px rgba(0,0,0,0.85)) drop-shadow(0 0 30px rgba(255,197,87,0.55))",
            "drop-shadow(0 0 28px rgba(122,221,255,0.65)) drop-shadow(0 9px 24px rgba(0,0,0,0.76))",
            "drop-shadow(0 0 18px rgba(122,221,255,0.42)) drop-shadow(0 7px 18px rgba(0,0,0,0.7))",
          ],
        },
        { duration: mobile ? 0.24 : 0.3, times: [0, 0.34, 0.72, 1], ease: [0.16, 1, 0.3, 1], at: impact },
      ],
      [
        ".hero-stage",
        { x: [0, -7, 6, -4, 3, 0], y: [0, 4, -3, 2, -1, 0] },
        { duration: mobile ? 0.16 : 0.24, ease: "linear", at: impact },
      ],
      [
        ".hero-shockwave-primary",
        { opacity: [0.75, 0], scale: [0.35, 2.2] },
        { duration: mobile ? 0.35 : 0.48, ease: "easeOut", at: impact },
      ],
      [
        ".hero-shockwave-secondary",
        { opacity: [0.55, 0], scale: [0.35, 2.65] },
        { duration: mobile ? 0.38 : 0.52, ease: "easeOut", at: impact + 0.16 },
      ],
      [
        ".hero-energy-field",
        { opacity: 0, scale: 1.25 },
        { duration: mobile ? 0.32 : 0.48, ease: "easeOut", at: impact + 0.3 },
      ],
      [
        ".hero-speed-field",
        { opacity: 0, scale: 1.1 },
        { duration: mobile ? 0.3 : 0.45, ease: "easeOut", at: impact + 0.25 },
      ],
      [
        ".hero-aura-core",
        { opacity: 0, scale: 1.5 },
        { duration: mobile ? 0.3 : 0.48, ease: "easeOut", at: impact + 0.28 },
      ],
      [
        ".hero-aura-outer",
        { opacity: 0, scale: 1.38 },
        { duration: mobile ? 0.34 : 0.52, ease: "easeOut", at: impact + 0.3 },
      ],
      [
        ".hero-headline-1",
        { y: "0%", skewX: 0 },
        { duration: headlineDuration, ease: [0.16, 1, 0.3, 1], at: headlineStart },
      ],
      [
        ".hero-headline-2",
        { y: "0%", skewX: 0 },
        { duration: headlineDuration, ease: [0.16, 1, 0.3, 1], at: headlineStart + headlineStagger },
      ],
      [
        ".hero-headline-3",
        { y: "0%", skewX: 0 },
        { duration: headlineDuration, ease: [0.16, 1, 0.3, 1], at: headlineStart + headlineStagger * 2 },
      ],
      [
        ".hero-demery",
        { opacity: 1, scale: 1, filter: "blur(0px)", clipPath: "inset(0 0 0 0%)" },
        { duration: photoDuration, ease: [0.16, 1, 0.3, 1], at: photoStart },
      ],
      [
        ".hero-support",
        { opacity: 1, y: 0 },
        { duration: supportDuration, ease: [0.16, 1, 0.3, 1], at: supportStart },
      ],
    ];

    const playback = animate(sequence);

    return () => {
      playback.stop();
      hasStarted.current = false;
    };
  }, [animate, reduceMotion]);

  const toggleSound = () => {
    const nextValue = !soundEnabled;
    setSoundEnabled(nextValue);
    window.localStorage.setItem(SOUND_PREFERENCE_KEY, nextValue ? "on" : "off");
  };

  return (
    <section
      ref={scope}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[radial-gradient(circle_at_30%_35%,#101923_0%,#050608_42%,#020202_100%)] lg:min-h-[920px]"
    >
      <div className="hero-film-grain pointer-events-none absolute inset-0 z-[1] opacity-[0.04]" aria-hidden="true" />
      <div
        className="hero-energy-field pointer-events-none absolute inset-[-15%] z-[2] bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.94)_0%,rgba(88,206,255,0.42)_8%,rgba(44,120,255,0.18)_22%,rgba(255,185,69,0.09)_34%,transparent_58%)] opacity-0 blur-2xl will-change-[transform,opacity]"
        aria-hidden="true"
      />
      <div
        className="hero-speed-field pointer-events-none absolute inset-0 z-[3] overflow-hidden opacity-0 will-change-[transform,opacity]"
        aria-hidden="true"
      >
        {ENERGY_RAYS.map(({ angle, width, delay }, index) => (
          <span
            key={angle}
            className="absolute left-[30%] top-[40%] h-[2px] origin-left bg-gradient-to-r from-white via-[#7DDDFF] to-transparent"
            style={{
              width: `${width}vw`,
              opacity: 0.28 + (index % 4) * 0.14,
              transform: `rotate(${angle}deg) translateX(5vw)`,
              transitionDelay: `${delay}s`,
            }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden" aria-hidden="true">
        {ENERGY_DEBRIS.map(({ left, top, height, rotate }) => (
          <span
            key={`${left}-${top}`}
            className="hero-energy-debris absolute w-px bg-gradient-to-t from-transparent via-[#8FE4FF] to-white shadow-[0_0_8px_rgba(108,221,255,0.9)]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              height: `${height}px`,
              transform: `rotate(${rotate}deg)`,
            }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(0,0,0,0.72)_100%)]" aria-hidden="true" />
      <div
        className="hero-impact-flash pointer-events-none absolute inset-0 z-40 hidden bg-white opacity-0 min-[769px]:block"
        aria-hidden="true"
      />
      <div
        className="hero-impact-flash-secondary pointer-events-none absolute inset-0 z-40 hidden bg-[#B9EAFF] opacity-0 min-[769px]:block"
        aria-hidden="true"
      />

      <div className="hero-stage relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1500px] grid-cols-1 px-4 pb-28 pt-28 will-change-transform sm:px-6 sm:pt-32 lg:min-h-[920px] lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:items-center lg:gap-10 lg:px-12 lg:pb-16 lg:pt-28">
        <div className="relative z-20 flex flex-col justify-center">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10 lg:gap-12">
            <div className="w-[clamp(200px,42vw,280px)] shrink-0 lg:w-[clamp(240px,18vw,290px)]">
              <div className="relative">
                <div
                  className="hero-aura-outer pointer-events-none absolute inset-[-65%] rounded-[44%] bg-[conic-gradient(from_20deg,transparent_0deg,rgba(93,219,255,0.45)_42deg,transparent_78deg,rgba(255,191,79,0.32)_128deg,transparent_176deg,rgba(255,255,255,0.48)_232deg,transparent_292deg)] opacity-0 blur-2xl will-change-[transform,opacity]"
                  aria-hidden="true"
                />
                <div
                  className="hero-aura-core pointer-events-none absolute inset-[-35%] rounded-[50%] bg-[radial-gradient(circle,rgba(255,255,255,0.92)_0%,rgba(96,218,255,0.58)_18%,rgba(52,125,255,0.24)_42%,transparent_70%)] opacity-0 blur-xl will-change-[transform,opacity]"
                  aria-hidden="true"
                />
                <div
                  className="hero-shockwave-primary pointer-events-none absolute inset-[-18%] rounded-[50%] border-2 border-white/80 opacity-0 shadow-[0_0_18px_rgba(115,224,255,0.9)] will-change-[transform,opacity]"
                  aria-hidden="true"
                />
                <div
                  className="hero-shockwave-secondary pointer-events-none absolute inset-[-18%] rounded-[50%] border border-[#80DDFF]/70 opacity-0 shadow-[0_0_26px_rgba(255,195,84,0.55)] will-change-[transform,opacity]"
                  aria-hidden="true"
                />
                <div
                  className="hero-logo-echo pointer-events-none absolute inset-0 opacity-0 blur-[1px] [filter:drop-shadow(-10px_0_16px_rgba(77,205,255,0.95))_drop-shadow(10px_0_16px_rgba(255,182,62,0.8))]"
                  aria-hidden="true"
                >
                  <DieselWayLogo variant="hero" priority className="!w-full" />
                </div>
                <div className="hero-logo-final relative will-change-[transform,opacity,filter]">
                  <DieselWayLogo variant="hero" priority className="!w-full" />
                </div>
              </div>
            </div>

            <h1 className="m-0 flex min-w-0 flex-col font-display text-[clamp(3rem,8vw,6.5rem)] font-bold uppercase leading-[0.82] tracking-[-0.035em] text-white lg:text-[clamp(74px,5.8vw,112px)]">
              <span className="w-max overflow-hidden">
                <span className="hero-headline-line hero-headline-1 block will-change-transform">Strength</span>
              </span>
              <span className="w-max overflow-hidden">
                <span className="hero-headline-line hero-headline-2 block will-change-transform">Through</span>
              </span>
              <span className="-mb-[0.1em] w-max overflow-hidden pb-[0.1em] text-[#FFC857] [text-shadow:0_0_28px_rgba(255,190,72,0.28)]">
                <span className="hero-headline-line hero-headline-3 block will-change-transform">Discipline.</span>
              </span>
            </h1>
          </div>

          <div className="hero-support will-change-[transform,opacity]">
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
        </div>

        <div className="relative mt-10 flex min-h-[360px] items-end justify-center sm:min-h-[480px] lg:mt-0 lg:h-full lg:min-h-[720px] lg:justify-end">
          <div className="hero-demery relative z-[1] flex h-full w-full items-end justify-center overflow-hidden will-change-[opacity,filter,clip-path] lg:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${HERO_IMAGE}?v=clean1`}
              alt="Dem Diesel, founder of The Diesel Way"
              className="h-auto max-h-[480px] w-auto max-w-full object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.55)] sm:max-h-[600px] lg:max-h-[860px] lg:h-[min(86vh,860px)]"
              fetchPriority="high"
              decoding="async"
            />
          </div>

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

          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? "Disable future hero sound" : "Enable future hero sound"}
            aria-pressed={soundEnabled}
            className="absolute bottom-24 right-0 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition hover:border-white/45 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:bottom-4 sm:right-[302px] lg:bottom-8 lg:right-[292px]"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4" aria-hidden />
            ) : (
              <VolumeX className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
