"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/providers/CartProvider";
import { useUi } from "@/components/providers/UiProvider";
import { cn, navLinks } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const { setSearchOpen, setCartDrawerOpen } = useUi();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          solid ? "border-r8-border bg-r8-black/95 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-6 lg:px-8">
          <Logo showWordmark className="min-w-0" />

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
            {navLinks.filter((l) => l.href !== "/assessment").map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-2.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition",
                    active ? "text-r8-blue-light" : "text-r8-secondary hover:text-r8-white",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="hidden rounded-md p-2 text-r8-secondary hover:text-r8-white sm:inline-flex"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/login"
              className="hidden rounded-md px-2 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-r8-secondary hover:text-r8-white md:inline-flex"
            >
              Login
            </Link>
            <button
              type="button"
              aria-label={`Cart with ${count} items`}
              onClick={() => setCartDrawerOpen(true)}
              className="relative rounded-md p-2 text-r8-secondary hover:text-r8-white"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-r8-blue px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            </button>
            <Button href="/membership" size="sm" className="hidden lg:inline-flex">
              Join Now
            </Button>
            <button
              type="button"
              className="rounded-md p-2 text-r8-white xl:hidden"
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
            className="fixed inset-0 z-40 bg-r8-black xl:hidden"
          >
            <div className="flex h-full flex-col px-4 pb-8 pt-20">
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto" aria-label="Mobile">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg border border-transparent px-4 py-4 font-display text-2xl uppercase tracking-wide text-r8-white hover:border-r8-border hover:bg-r8-charcoal"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-4 font-display text-2xl uppercase tracking-wide text-r8-secondary"
                >
                  Login
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="rounded-lg px-4 py-4 text-left font-display text-2xl uppercase tracking-wide text-r8-secondary"
                >
                  Search
                </button>
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
