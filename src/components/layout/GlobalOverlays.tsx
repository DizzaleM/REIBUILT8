"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { useUi } from "@/components/providers/UiProvider";
import { useCart } from "@/components/providers/CartProvider";
import { programs } from "@/data/programs";
import { products } from "@/data/products";
import { liveClasses } from "@/data/classes";
import { meals } from "@/data/meals";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";

export function GlobalOverlays() {
  const {
    checkoutOpen,
    setCheckoutOpen,
    checkoutMessage,
    videoOpen,
    setVideoOpen,
    searchOpen,
    setSearchOpen,
    loginNoticeOpen,
    setLoginNoticeOpen,
    reserveOpen,
    setReserveOpen,
    cartDrawerOpen,
    setCartDrawerOpen,
    pushToast,
  } = useUi();
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { programs: [], products: [], classes: [], meals: [] };
    return {
      programs: programs.filter((p) => `${p.title} ${p.summary}`.toLowerCase().includes(q)).slice(0, 4),
      products: products.filter((p) => `${p.name} ${p.description}`.toLowerCase().includes(q)).slice(0, 4),
      classes: liveClasses.filter((c) => `${c.title} ${c.description}`.toLowerCase().includes(q)).slice(0, 4),
      meals: meals.filter((m) => `${m.name} ${m.category}`.toLowerCase().includes(q)).slice(0, 4),
    };
  }, [query]);

  return (
    <>
      <Modal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} title="Checkout Coming Soon">
        <div className="mb-5 flex justify-center">
          <Logo href={false} variant="modal" />
        </div>
        <p className="text-sm leading-relaxed text-r8-secondary">{checkoutMessage}</p>
        <p className="mt-3 text-sm text-r8-muted">
          Secure payment processing will be connected later. No card details are collected in this mockup.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/membership" onClick={() => setCheckoutOpen(false)}>
            View Membership
          </Button>
          <Button variant="secondary" onClick={() => setCheckoutOpen(false)}>
            Keep Browsing
          </Button>
        </div>
      </Modal>

      <Modal open={videoOpen} onClose={() => setVideoOpen(false)} title="Meet Your Coach" className="sm:max-w-2xl">
        <div className="mb-5 flex justify-center">
          <Logo href={false} variant="modal" />
        </div>
        <div className="aspect-video rounded-lg border border-r8-border bg-r8-black bg-grid-subtle">
          <div className="flex h-full items-center justify-center p-6 text-center">
            <div>
              <p className="font-display text-2xl uppercase text-r8-white">Welcome Video Placeholder</p>
              <p className="mt-2 text-sm text-r8-secondary">
                A welcome video from Dem Diesel will be added later. Duration preview: 1:32
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal open={reserveOpen} onClose={() => setReserveOpen(false)} title="Reserve Your Spot">
        <p className="text-sm text-r8-secondary">
          Live class reservations require a membership and member login. Authentication and booking will be connected in a
          future phase.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/login" onClick={() => setReserveOpen(false)}>
            Log In
          </Button>
          <Button href="/membership" variant="secondary" onClick={() => setReserveOpen(false)}>
            Join Membership
          </Button>
        </div>
      </Modal>

      <Modal open={loginNoticeOpen} onClose={() => setLoginNoticeOpen(false)} title="Authentication Coming Soon">
        <p className="text-sm text-r8-secondary">
          Member authentication will be connected in a future development phase.
        </p>
        <Button className="mt-6" onClick={() => setLoginNoticeOpen(false)}>
          Got It
        </Button>
      </Modal>

      <Modal open={searchOpen} onClose={() => setSearchOpen(false)} title="Search DIESEL WAY" className="sm:max-w-2xl">
        <label htmlFor="site-search" className="sr-only">
          Search
        </label>
        <input
          id="site-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search programs, classes, products, meals..."
          className="w-full rounded-md border border-r8-border bg-r8-black px-4 py-3 text-r8-white"
          autoFocus
        />
        <div className="mt-6 space-y-6">
          <SearchGroup title="Programs" items={results.programs.map((p) => ({ href: `/programs/${p.slug}`, name: p.title, desc: p.summary, type: "Program" }))} onNavigate={() => setSearchOpen(false)} />
          <SearchGroup title="Products" items={results.products.map((p) => ({ href: `/shop/${p.slug}`, name: p.name, desc: p.description, type: "Product" }))} onNavigate={() => setSearchOpen(false)} />
          <SearchGroup title="Classes" items={results.classes.map((c) => ({ href: "/live", name: c.title, desc: c.description, type: "Class" }))} onNavigate={() => setSearchOpen(false)} />
          <SearchGroup title="Meals" items={results.meals.map((m) => ({ href: "/meal-prep", name: m.name, desc: m.category, type: "Meal" }))} onNavigate={() => setSearchOpen(false)} />
          {!query.trim() ? <p className="text-sm text-r8-muted">Start typing to search mock catalog data.</p> : null}
        </div>
      </Modal>

      <Modal open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} title="Your Cart" className="sm:max-w-md">
        {items.length === 0 ? (
          <div>
            <p className="text-sm text-r8-secondary">Your cart is empty.</p>
            <Button href="/shop" className="mt-4" onClick={() => setCartDrawerOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.variant}`} className="rounded-lg border border-r8-border p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-r8-white">{item.name}</p>
                    <p className="text-sm text-r8-secondary">{formatPrice(item.price)}</p>
                    {(item.size || item.variant) && (
                      <p className="text-xs text-r8-muted">
                        {[item.size, item.variant].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeItem(item.id, item.variant, item.size)}
                    className="text-r8-muted hover:text-r8-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    className="rounded border border-r8-border p-1"
                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant, item.size)}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    className="rounded border border-r8-border p-1"
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant, item.size)}
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
            <div className="border-t border-r8-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-r8-secondary">Subtotal</span>
                <span className="text-r8-white">{formatPrice(subtotal)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button href="/cart" onClick={() => setCartDrawerOpen(false)}>
                View Cart
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setCartDrawerOpen(false);
                  setCheckoutOpen(true);
                  pushToast("Checkout mock opened.");
                }}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

function SearchGroup({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: { href: string; name: string; desc: string; type: string }[];
  onNavigate: () => void;
}) {
  if (!items.length) return null;
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-r8-muted">{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.href + item.name}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="block rounded-lg border border-r8-border bg-r8-black px-3 py-3 hover:border-white/50"
            >
              <p className="text-xs uppercase tracking-wider text-r8-secondary">{item.type}</p>
              <p className="font-medium text-r8-white">{item.name}</p>
              <p className="line-clamp-1 text-xs text-r8-muted">{item.desc}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
