import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Diesel Community",
  description: "Train with the Diesel Crew — challenges, check-ins, and member support.",
};

export default function CommunityPage() {
  return (
    <div>
      <PageHero
        title="Diesel Community"
        description="Stay accountable with the Diesel Crew — member check-ins, challenges, and shared progress. Full community tools connect with membership accounts later."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="Discipline With Accountability"
          description="This preview shows how Diesel Members features will appear once accounts are live."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Weekly Check-Ins", "Share wins and stay consistent with the Diesel Crew."],
            ["Member Challenges", "Join focused challenges that keep training sharp."],
            ["Diesel Training Club", "Train with people who take the work seriously."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-xl border border-r8-border bg-r8-elevated p-6">
              <h3 className="font-display text-2xl uppercase text-r8-white">{title}</h3>
              <p className="mt-3 text-sm text-r8-secondary">{copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/membership">Join the Diesel Crew</Button>
          <Button href="/assessment" variant="secondary">
            Take the Assessment
          </Button>
        </div>
      </section>
    </div>
  );
}
