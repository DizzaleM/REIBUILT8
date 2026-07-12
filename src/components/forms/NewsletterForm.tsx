"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useUi } from "@/components/providers/UiProvider";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const { pushToast } = useUi();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    pushToast("Welcome to the list. Delivery will be connected later.");
    setFirstName("");
    setEmail("");
  };

  if (success) {
    return (
      <div className="rounded-xl border border-r8-blue/40 bg-r8-blue/10 p-6 text-center">
        <p className="font-display text-2xl uppercase text-r8-white">You&apos;re in.</p>
        <p className="mt-2 text-sm text-r8-secondary">Training tips and program updates are coming soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-3" : "grid gap-3 sm:grid-cols-3"}>
      <label className="sr-only" htmlFor="news-first">
        First name
      </label>
      <input
        id="news-first"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First name"
        className="rounded-md border border-r8-border bg-r8-charcoal px-4 py-3 text-r8-white"
      />
      <label className="sr-only" htmlFor="news-email">
        Email
      </label>
      <input
        id="news-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="rounded-md border border-r8-border bg-r8-charcoal px-4 py-3 text-r8-white"
      />
      <Button type="submit" className="w-full">
        Join the List
      </Button>
    </form>
  );
}
