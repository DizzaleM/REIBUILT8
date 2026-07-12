"use client";

import Link from "next/link";
import { useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/PageHero";
import { useCart } from "@/components/providers/CartProvider";
import { useUi } from "@/components/providers/UiProvider";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const { openCheckout, pushToast } = useUi();
  const [promo, setPromo] = useState("");
  const shipping = items.length ? 7.99 : 0;
  const tax = subtotal * 0.07;
  const discount = promo.trim().toUpperCase() === "R8START" ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal + shipping + tax - discount);

  return (
    <div>
      <PageHero title="Your Cart" description="Local cart mockup using your browser storage." />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <EmptyState
            title="Cart is empty"
            description="Browse the shop, meal prep, or programs to add items."
            action={
              <Button href="/shop">Continue Shopping</Button>
            }
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.variant}`} className="rounded-xl border border-r8-border bg-r8-elevated p-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Link href={item.type === "program" ? `/programs/${item.slug}` : item.type === "meal" ? "/meal-prep" : `/shop/${item.slug}`} className="font-display text-xl uppercase text-r8-white hover:text-r8-blue-light">
                        {item.name}
                      </Link>
                      <p className="mt-1 text-sm text-r8-blue-light">{formatPrice(item.price)}</p>
                      {(item.size || item.variant) && (
                        <p className="text-xs text-r8-muted">{[item.size, item.variant].filter(Boolean).join(" · ")}</p>
                      )}
                    </div>
                    <button type="button" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.id, item.variant, item.size)}>
                      <Trash2 className="h-4 w-4 text-r8-muted hover:text-r8-white" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <button type="button" aria-label="Decrease" className="rounded border border-r8-border p-1" onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant, item.size)}>
                      <Minus className="h-3 w-3" />
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" aria-label="Increase" className="rounded border border-r8-border p-1" onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant, item.size)}>
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-r8-border bg-r8-charcoal p-6">
              <h2 className="font-display text-2xl uppercase text-r8-white">Order Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-r8-secondary">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-r8-secondary">Shipping estimate</dt><dd>{formatPrice(shipping)}</dd></div>
                <div className="flex justify-between"><dt className="text-r8-secondary">Tax estimate</dt><dd>{formatPrice(tax)}</dd></div>
                {discount > 0 ? <div className="flex justify-between text-r8-success"><dt>Promo</dt><dd>-{formatPrice(discount)}</dd></div> : null}
                <div className="flex justify-between border-t border-r8-border pt-3 text-base"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
              </dl>
              <label className="mt-6 block text-xs uppercase tracking-[0.14em] text-r8-muted">
                Promo code
                <div className="mt-2 flex gap-2">
                  <input value={promo} onChange={(e) => setPromo(e.target.value)} className="w-full rounded-md border border-r8-border bg-r8-black px-3 py-2 text-sm text-r8-white" placeholder="Try R8START" />
                  <Button variant="secondary" onClick={() => pushToast(promo.trim().toUpperCase() === "R8START" ? "Promo applied." : "Promo not recognized in mockup.")}>
                    Apply
                  </Button>
                </div>
              </label>
              <Button className="mt-6 w-full" onClick={() => openCheckout()}>
                Proceed to Checkout
              </Button>
              <Button href="/shop" variant="ghost" className="mt-2 w-full">
                Continue Shopping
              </Button>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
