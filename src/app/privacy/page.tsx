import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

function PolicyPage({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <div>
      <PageHero title={title} description={description} />
      <section className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-display text-2xl uppercase text-r8-white">{section.heading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-r8-secondary">{section.body}</p>
          </div>
        ))}
        <p className="rounded-lg border border-dashed border-r8-border p-4 text-sm text-r8-muted">
          Placeholder policy content. Replace with attorney-reviewed language before launch.
        </p>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "DIESEL WAY privacy policy placeholder.",
};

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      description="How DIESEL WAY plans to handle visitor and member information."
      sections={[
        {
          heading: "Overview",
          body: "This page is a placeholder for the official privacy policy. Add data collection, storage, and sharing details before launch.",
        },
        {
          heading: "Contact",
          body: "Add the official privacy contact email once confirmed.",
        },
      ]}
    />
  );
}
