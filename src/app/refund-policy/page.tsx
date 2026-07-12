import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "REIBUILT 8 refund policy placeholder.",
};

export default function RefundPolicyPage() {
  return (
    <div>
      <PageHero title="Refund Policy" description="Placeholder refund terms for programs, memberships, and products." />
      <section className="mx-auto max-w-3xl px-4 py-12 text-sm text-r8-secondary sm:px-6 lg:px-8">
        <p>
          Add official refund windows for digital programs, memberships, apparel, supplements, and meal prep before launch.
        </p>
      </section>
    </div>
  );
}
