"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/providers/CartProvider";
import { useUi } from "@/components/providers/UiProvider";
import { cn } from "@/lib/utils";

/** Header nav matches brand mockup */
const headerLinks = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/combat", label: "Combat" },
  { href: "/shop", label: "Shop" },
  { href: "/meal-prep", label: "Meal Prep" },
  { href: "/about", label: "About" },
  { href: "/community", label: "Community" },
];

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const { setCartDrawerOpen } = useUi();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = !isHome || scrolled || mobileOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "border-b border-r8-border/80 bg-r8-black/90 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-r8-black/80 via-r8-black/40 to-transparent",
        )}
      >
        <div className="mx-auto grid h-[72px] max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:h-[80px] sm:px-6 lg:px-8">
          {/* Left: Logo */}
          <div className="justify-self-start overflow-visible">
            <Logo variant="nav" />
          </div>

          {/* Center: Nav */}
          <nav className="hidden items-center justify-center gap-1 lg:flex" aria-label="Primary">
            {headerLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-r8-white/75 transition hover:text-r8-white",
                    active && "text-r8-white",
                  )}
                >
                  {link.label}
                  {active ? (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-white" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <button
              type="button"
              aria-label={`Cart with ${count} items`}
              onClick={() => setCartDrawerOpen(true)}
              className="relative hidden rounded-md p-2 text-r8-white/70 hover:text-r8-white sm:inline-flex"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-black">
                {count}
              </span>
            </button>

            <Link
              href="/login"
              className="hidden rounded-md border border-white/25 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-r8-white transition hover:border-white/50 hover:bg-white/5 md:inline-flex"
            >
              Log In
            </Link>

            <Button href="/membership" size="sm" className="hidden rounded-md px-5 sm:inline-flex">
              Join Now
            </Button>

            <button
              type="button"
              className="rounded-md p-2 text-r8-white lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-r8-black lg:hidden"
          >
            <div className="flex h-full flex-col px-4 pb-8 pt-28">
              <div className="mb-6">
                <Logo variant="nav" />
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto" aria-label="Mobile">
                {headerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-4 py-4 font-display text-2xl uppercase tracking-wide text-r8-white hover:bg-r8-charcoal"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-4 font-display text-2xl uppercase tracking-wide text-r8-secondary"
                >
                  Log In
                </Link>
                <Link
                  href="/cart"
                  className="rounded-lg px-4 py-4 font-display text-2xl uppercase tracking-wide text-r8-secondary"
                >
                  Cart ({count})
                </Link>
              </nav>
              <Button href="/membership" className="mt-4 w-full" size="lg">
                Join Now
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
