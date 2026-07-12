import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "DIESEL WAY terms of service placeholder.",
};

export default function TermsPage() {
  return (
    <div>
      <PageHero title="Terms of Service" description="Placeholder terms for the DIESEL WAY platform." />
      <section className="mx-auto max-w-3xl space-y-6 px-4 py-12 text-sm leading-relaxed text-r8-secondary sm:px-6 lg:px-8">
        <p>Replace this page with attorney-reviewed terms covering memberships, digital products, live classes, and coaching.</p>
        <p className="rounded-lg border border-dashed border-r8-border p-4 text-r8-muted">
          Placeholder content — do not launch with this language.
        </p>
      </section>
    </div>
  );
}
