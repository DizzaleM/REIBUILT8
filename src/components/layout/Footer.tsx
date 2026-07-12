"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useUi } from "@/components/providers/UiProvider";

/** Inline social icons — do not import brand icons from lucide-react. */
function SocialIcon({ label, path }: { label: string; path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <title>{label}</title>
      <path d={path} />
    </svg>
  );
}

const SOCIALS = [
  {
    href: "#",
    label: "Instagram",
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
  },
  {
    href: "#",
    label: "YouTube",
    path: "M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31.5 31.5 0 0 0 1 12a31.5 31.5 0 0 0 .1 4.5 3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 23 12a31.5 31.5 0 0 0 0-4.5zM10 15.5v-7l6 3.5-6 3.5z",
  },
  {
    href: "#",
    label: "TikTok",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78c.3 0 .59.04.86.13v-3.5a6.37 6.37 0 0 0-.86-.06A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 10.95 4.35V13.2a8.27 8.27 0 0 0 4.84 1.55V11.3a4.84 4.84 0 0 1-.35-4.61Z",
  },
  {
    href: "#",
    label: "Facebook",
    path: "M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z",
  },
] as const;

export function Footer() {
  const { pushToast } = useUi();
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    pushToast("You're on the list. Email delivery will be connected later.");
    setEmail("");
  };

  return (
    <footer className="mt-auto border-t border-r8-border bg-r8-black-2">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-r8-secondary">
            Built Different. Structured training, live coaching, and practical resources for lasting results.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="rounded-md border border-r8-border p-2 text-r8-secondary hover:border-r8-blue hover:text-r8-blue-light"
              >
                <SocialIcon label={social.label} path={social.path} />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Train"
          links={[
            { href: "/programs", label: "Programs" },
            { href: "/live", label: "Live Classes" },
            { href: "/coaching", label: "Coaching" },
            { href: "/membership", label: "Membership" },
          ]}
        />
        <FooterCol
          title="Shop"
          links={[
            { href: "/shop", label: "Shop" },
            { href: "/shop?category=Apparel", label: "Apparel" },
            { href: "/shop?category=Supplements", label: "Supplements" },
            { href: "/meal-prep", label: "Meal Prep" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
            { href: "/assessment", label: "Assessment" },
            { href: "/login", label: "Login" },
          ]}
        />
        <FooterCol
          title="Policies"
          links={[
            { href: "/privacy", label: "Privacy Policy" },
            { href: "/terms", label: "Terms" },
            { href: "/refund-policy", label: "Refund Policy" },
            { href: "/shipping-policy", label: "Shipping Policy" },
            { href: "/fitness-disclaimer", label: "Fitness Disclaimer" },
          ]}
        />
      </div>

      <div className="border-t border-r8-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <form onSubmit={onSubmit} className="w-full max-w-md">
            <label htmlFor="footer-email" className="text-xs font-semibold uppercase tracking-[0.18em] text-r8-muted">
              Get training updates
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-md border border-r8-border bg-r8-charcoal px-3 py-3 text-sm text-r8-white placeholder:text-r8-muted"
              />
              <Button type="submit">Join</Button>
            </div>
          </form>
          <p className="text-sm text-r8-muted">© 2026 REIBUILT 8. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="font-display text-lg uppercase tracking-wide text-r8-white">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-r8-secondary hover:text-r8-blue-light">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
