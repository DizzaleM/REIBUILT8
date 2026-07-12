"use client";

import { useMemo, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { programs } from "@/data/programs";

const goals = ["All", "Strength", "Fat Loss", "Performance", "General Fitness", "Mobility", "Habits"];
const levels = ["All", "Beginner", "All levels", "Intermediate", "Advanced"];
const durations = ["All", "4", "6", "8", "10"];
const locations = ["All", "Gym", "Home", "Both"];
const sorts = ["Featured", "Newest", "Price Low to High", "Price High to Low", "Duration"] as const;

export default function ProgramsPage() {
  const [goal, setGoal] = useState("All");
  const [level, setLevel] = useState("All");
  const [duration, setDuration] = useState("All");
  const [location, setLocation] = useState("All");
  const [equipmentOnly, setEquipmentOnly] = useState(false);
  const [membershipOnly, setMembershipOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Strength", "Fat Loss", "Athletic Performance", "Mobility", "Home Training", "Beginner", "Challenges"];

  const filtered = useMemo(() => {
    let list = [...programs];
    if (goal !== "All") list = list.filter((p) => p.goal === goal);
    if (level !== "All") list = list.filter((p) => p.level === level);
    if (duration !== "All") list = list.filter((p) => String(p.durationWeeks) === duration);
    if (location !== "All") list = list.filter((p) => p.location === location);
    if (equipmentOnly) list = list.filter((p) => p.equipment.some((e) => e.toLowerCase().includes("dumbbell") || e.toLowerCase().includes("bodyweight")));
    if (membershipOnly) list = list.filter((p) => p.membershipIncluded);
    list = list.filter((p) => p.price <= maxPrice);
    if (category === "Beginner") list = list.filter((p) => p.level === "Beginner");
    else if (category !== "All") list = list.filter((p) => p.category === category || p.type === category);

    switch (sort) {
      case "Newest":
        list.sort((a, b) => Number(b.newest) - Number(a.newest));
        break;
      case "Price Low to High":
        list.sort((a, b) => a.price - b.price);
        break;
      case "Price High to Low":
        list.sort((a, b) => b.price - a.price);
        break;
      case "Duration":
        list.sort((a, b) => a.durationWeeks - b.durationWeeks);
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [goal, level, duration, location, equipmentOnly, membershipOnly, maxPrice, sort, category]);

  return (
    <div>
      <PageHero
        title="Training Programs"
        description="Choose a structured program based on your goals, experience level, schedule and available equipment."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-md border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${
                category === c ? "border-white bg-white/10 text-r8-secondary" : "border-r8-border text-r8-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit space-y-4 rounded-xl border border-r8-border bg-r8-charcoal p-4">
            <FilterSelect label="Goal" value={goal} onChange={setGoal} options={goals} />
            <FilterSelect label="Level" value={level} onChange={setLevel} options={levels} />
            <FilterSelect label="Duration (weeks)" value={duration} onChange={setDuration} options={durations} />
            <FilterSelect label="Location" value={location} onChange={setLocation} options={locations} />
            <label className="block text-xs uppercase tracking-[0.14em] text-r8-muted">
              Max price (${maxPrice})
              <input
                type="range"
                min={29}
                max={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-2 w-full accent-white"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-r8-secondary">
              <input type="checkbox" checked={equipmentOnly} onChange={(e) => setEquipmentOnly(e.target.checked)} />
              Minimal equipment friendly
            </label>
            <label className="flex items-center gap-2 text-sm text-r8-secondary">
              <input type="checkbox" checked={membershipOnly} onChange={(e) => setMembershipOnly(e.target.checked)} />
              Membership included
            </label>
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-r8-muted">{filtered.length} programs</p>
              <label className="text-sm text-r8-secondary">
                Sort{" "}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
                  className="ml-2 rounded-md border border-r8-border bg-r8-elevated px-3 py-2 text-r8-white"
                >
                  {sorts.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.length === 0 ? (
                <div className="col-span-full rounded-xl border border-r8-border bg-r8-elevated p-10 text-center">
                  <p className="font-display text-2xl uppercase text-r8-white">No programs match these filters</p>
                  <p className="mt-2 text-sm text-r8-secondary">Clear filters to see the full program library.</p>
                  <button
                    type="button"
                    className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-r8-secondary"
                    onClick={() => {
                      setGoal("All");
                      setLevel("All");
                      setDuration("All");
                      setLocation("All");
                      setCategory("All");
                      setEquipmentOnly(false);
                      setMembershipOnly(false);
                      setMaxPrice(100);
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filtered.map((program) => <ProgramCard key={program.id} program={program} />)
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block text-xs uppercase tracking-[0.14em] text-r8-muted">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-r8-border bg-r8-elevated px-3 py-2 text-sm text-r8-white"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
