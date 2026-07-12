"use client";

import { FormEvent, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <PageHero title="Contact" description="Questions about programs, membership, coaching, or partnerships." />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {sent ? (
          <div className="rounded-xl border border-white/35 bg-white/5 p-6">
            <p className="font-display text-2xl uppercase text-r8-white">Message ready</p>
            <p className="mt-2 text-sm text-r8-secondary">
              This mockup does not send email yet. Connect a form provider or backend before launch.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-r8-border bg-r8-elevated p-6">
            <label className="block text-sm text-r8-secondary">
              Name
              <input required name="name" className="mt-2 w-full rounded-md border border-r8-border bg-r8-black px-3 py-3 text-r8-white" />
            </label>
            <label className="block text-sm text-r8-secondary">
              Email
              <input required type="email" name="email" className="mt-2 w-full rounded-md border border-r8-border bg-r8-black px-3 py-3 text-r8-white" />
            </label>
            <label className="block text-sm text-r8-secondary">
              Message
              <textarea required name="message" rows={5} className="mt-2 w-full rounded-md border border-r8-border bg-r8-black px-3 py-3 text-r8-white" />
            </label>
            <p className="text-sm text-r8-muted">Contact email placeholder: add Dem Diesel’s official email before launch.</p>
            <Button type="submit">Send Message</Button>
          </form>
        )}
      </section>
    </div>
  );
}
