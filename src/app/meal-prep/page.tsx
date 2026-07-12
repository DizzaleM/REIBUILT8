"use client";

import { useMemo, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { MealCard } from "@/components/cards/ContentCards";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/providers/CartProvider";
import { useUi } from "@/components/providers/UiProvider";
import { meals } from "@/data/meals";
import { faqs } from "@/data/faqs";

export default function MealPrepPage() {
  const [category, setCategory] = useState("All");
  const [proteinMin, setProteinMin] = useState(0);
  const [calorieMax, setCalorieMax] = useState(700);
  const [dietary, setDietary] = useState("All");
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">("subscription");
  const [fulfillment, setFulfillment] = useState("Delivery");
  const { addItem } = useCart();
  const { pushToast } = useUi();

  const categories = ["All", ...Array.from(new Set(meals.map((m) => m.category)))];
  const dietOptions = ["All", "High Protein", "Plant-Based", "Dairy Free", "Breakfast", "Gluten Friendly", "Pescatarian"];

  const filtered = useMemo(() => {
    return meals.filter((meal) => {
      if (category !== "All" && meal.category !== category) return false;
      if (meal.protein < proteinMin) return false;
      if (meal.calories > calorieMax) return false;
      if (dietary !== "All" && !meal.dietary.includes(dietary)) return false;
      return true;
    });
  }, [category, proteinMin, calorieMax, dietary]);

  return (
    <div>
      <PageHero
        title="Meals That Support the Work"
        description="Weekly meal options designed to support training — mock ordering experience only."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-r8-warning/40 bg-r8-warning/10 p-4 text-sm text-r8-warning">
          Meal availability, ingredients, allergens, preparation methods, delivery areas and nutrition information must be
          confirmed before launch.
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="inline-flex rounded-lg border border-r8-border p-1">
            <button
              type="button"
              onClick={() => setPurchaseType("subscription")}
              className={`rounded-md px-3 py-2 text-xs uppercase tracking-[0.12em] ${purchaseType === "subscription" ? "bg-white text-black" : "text-r8-secondary"}`}
            >
              Subscription
            </button>
            <button
              type="button"
              onClick={() => setPurchaseType("one-time")}
              className={`rounded-md px-3 py-2 text-xs uppercase tracking-[0.12em] ${purchaseType === "one-time" ? "bg-white text-black" : "text-r8-secondary"}`}
            >
              One-time
            </button>
          </div>
          <select
            value={fulfillment}
            onChange={(e) => setFulfillment(e.target.value)}
            className="rounded-md border border-r8-border bg-r8-charcoal px-3 py-2 text-sm text-r8-white"
          >
            <option>Delivery</option>
            <option>Pickup</option>
          </select>
          <p className="self-center text-sm text-r8-muted">Weekly ordering cutoff: Thursday 12:00 PM (placeholder)</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit space-y-4 rounded-xl border border-r8-border bg-r8-charcoal p-4">
            <label className="block text-xs uppercase tracking-[0.14em] text-r8-muted">
              Category
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 w-full rounded-md border border-r8-border bg-r8-elevated px-3 py-2 text-sm text-r8-white">
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="block text-xs uppercase tracking-[0.14em] text-r8-muted">
              Min protein ({proteinMin}g)
              <input type="range" min={0} max={50} value={proteinMin} onChange={(e) => setProteinMin(Number(e.target.value))} className="mt-2 w-full accent-white" />
            </label>
            <label className="block text-xs uppercase tracking-[0.14em] text-r8-muted">
              Max calories ({calorieMax})
              <input type="range" min={350} max={700} value={calorieMax} onChange={(e) => setCalorieMax(Number(e.target.value))} className="mt-2 w-full accent-white" />
            </label>
            <label className="block text-xs uppercase tracking-[0.14em] text-r8-muted">
              Dietary preference
              <select value={dietary} onChange={(e) => setDietary(e.target.value)} className="mt-2 w-full rounded-md border border-r8-border bg-r8-elevated px-3 py-2 text-sm text-r8-white">
                {dietOptions.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>
            <div className="rounded-lg border border-r8-border p-3 text-sm text-r8-secondary">
              Bundle option: 6-meal and 12-meal packages will be configurable at checkout launch.
            </div>
          </aside>

          <div>
            <h2 className="font-display text-2xl uppercase text-r8-white">Weekly Featured Meals</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onAdd={() => {
                    addItem({
                      id: meal.id,
                      slug: meal.slug,
                      name: meal.name,
                      price: purchaseType === "subscription" ? meal.subscriptionPrice : meal.price,
                      image: meal.image,
                      type: "meal",
                      variant: `${purchaseType} · ${fulfillment}`,
                    });
                    pushToast(`${meal.name} added to cart.`);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-3xl uppercase text-r8-white">Meal Prep FAQ</h2>
          <div className="mt-6">
            <FaqAccordion items={faqs.filter((f) => f.category === "Meal Prep" || f.id === "faq-6")} />
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button href="/cart">Review Cart</Button>
        </div>
      </section>
    </div>
  );
}
