import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "DIESEL WAY shipping policy placeholder.",
};

export default function ShippingPolicyPage() {
  return (
    <div>
      <PageHero title="Shipping Policy" description="Placeholder shipping details for physical products." />
      <section className="mx-auto max-w-3xl px-4 py-12 text-sm text-r8-secondary sm:px-6 lg:px-8">
        <p>
          Add carriers, timelines, regions, and costs once fulfillment is confirmed. Digital products do not require
          shipping.
        </p>
      </section>
    </div>
  );
}
