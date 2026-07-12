"use client";

import { useMemo, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { LiveClassCard } from "@/components/cards/ContentCards";
import { useUi } from "@/components/providers/UiProvider";
import { getFeaturedClass, liveClasses } from "@/data/classes";

export default function LivePage() {
  const { setReserveOpen, setLoginNoticeOpen } = useUi();
  const featured = getFeaturedClass();
  const [type, setType] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [timezone, setTimezone] = useState("Eastern");

  const types = ["All", "Strength", "Conditioning", "Mobility", "Recovery"];
  const levels = ["All", "All levels", "Beginner", "Intermediate", "Advanced"];

  const filtered = useMemo(() => {
    return liveClasses.filter((c) => {
      if (type !== "All" && c.type !== type) return false;
      if (difficulty !== "All" && c.level !== difficulty) return false;
      return true;
    });
  }, [type, difficulty]);

  const upcoming = filtered.filter((c) => !c.isPast);
  const past = filtered.filter((c) => c.isPast);

  return (
    <div>
      <PageHero
        title="Live Classes"
        description="Train live with Rei. Reserve your spot, show up ready, and use replays when life gets in the way."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 overflow-hidden rounded-2xl border border-r8-border bg-r8-elevated lg:grid-cols-2">
          <div className="relative min-h-72">
            <ImagePlaceholder src={featured.image} alt={featured.title} label="Add Class Photo" fill />
            <div className="absolute left-4 top-4">
              <Badge>Live</Badge>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-r8-blue-light">Featured Upcoming Class</p>
            <h2 className="mt-3 font-display text-3xl uppercase text-r8-white">{featured.title}</h2>
            <p className="mt-3 text-r8-secondary">
              {featured.day} · {featured.time} {timezone} · {featured.durationMinutes} min
            </p>
            <p className="mt-2 text-sm text-r8-muted">
              {featured.level} · {featured.equipment} · Coach {featured.coach}
            </p>
            <p className="mt-4 text-sm text-r8-secondary">{featured.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => setReserveOpen(true)}>Reserve Your Spot</Button>
              <Button variant="secondary" href="/membership">
                Get Live Access
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <label className="text-sm text-r8-secondary">
            Type
            <select value={type} onChange={(e) => setType(e.target.value)} className="ml-2 rounded-md border border-r8-border bg-r8-charcoal px-3 py-2 text-r8-white">
              {types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-r8-secondary">
            Difficulty
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="ml-2 rounded-md border border-r8-border bg-r8-charcoal px-3 py-2 text-r8-white">
              {levels.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-r8-secondary">
            Timezone
            <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="ml-2 rounded-md border border-r8-border bg-r8-charcoal px-3 py-2 text-r8-white">
              {["Eastern", "Central", "Mountain", "Pacific"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>

        <h2 className="mt-10 font-display text-3xl uppercase text-r8-white">Weekly Calendar</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {upcoming.map((c) => (
            <div key={c.id} className="rounded-xl border border-r8-border bg-r8-charcoal p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-r8-muted">{c.day}</p>
              <p className="mt-2 font-display text-xl uppercase text-r8-white">{c.title}</p>
              <p className="mt-1 text-sm text-r8-secondary">
                {c.time} {timezone}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-display text-3xl uppercase text-r8-white">Upcoming Classes</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {upcoming.map((liveClass) => (
            <LiveClassCard key={liveClass.id} liveClass={liveClass} onReserve={() => setReserveOpen(true)} />
          ))}
        </div>

        <h2 className="mt-12 font-display text-3xl uppercase text-r8-white">Past Classes</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {past.map((liveClass) => (
            <LiveClassCard
              key={liveClass.id}
              liveClass={liveClass}
              onReserve={() => setLoginNoticeOpen(true)}
            />
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-r8-border bg-r8-elevated p-6">
          <h3 className="font-display text-2xl uppercase text-r8-white">Streaming Platform</h3>
          <p className="mt-3 max-w-3xl text-sm text-r8-secondary">
            Live classes will eventually be hosted using an integrated streaming platform. Platform selection, replay
            delivery, and attendance tracking will be connected in a later phase.
          </p>
        </div>
      </section>
    </div>
  );
}
