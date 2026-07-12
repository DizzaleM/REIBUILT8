import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export const metadata: Metadata = {
  title: "About Dem Diesel",
  description: "Learn about Dem Diesel and the DIESEL WAY approach to structured training and lasting habits.",
};

export default function AboutPage() {
  return (
    <div>
      <PageHero title="Meet Dem Diesel" description="Founder-led training built on structure, accountability, and practical coaching." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative mx-auto aspect-[3/4] max-w-md">
            <div className="pointer-events-none absolute bottom-[10%] left-1/2 h-1/2 w-3/4 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
            <ImagePlaceholder
              src="/images/coach/about-dem-diesel.png"
              alt="Dem Diesel"
              label="Add Dem Diesel Photo"
              fill
              cutout
              objectFit="contain"
              className="object-contain object-bottom"
            />
          </div>
          <div>
            <SectionHeading title="Coaching Philosophy" />
            <p className="mt-4 text-r8-secondary">
              Dem Diesel created DIESEL WAY to give people more than random workouts. The approach combines structure,
              accountability and practical coaching so members can build strength, improve confidence and create habits
              that last.
            </p>
            <p className="mt-4 text-r8-secondary">Train with purpose. Build strength that lasts. Stop starting over.</p>
          </div>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          <PlaceholderBlock title="Why DIESEL WAY Exists" body="Add Dem Diesel’s verified mission statement and founding story here." />
          <PlaceholderBlock title="Training Values" body="Add Dem Diesel’s core training values here — discipline, structure, consistency, and honesty." />
          <PlaceholderBlock title="Qualifications" body="Add Dem Diesel’s verified certifications here." />
          <PlaceholderBlock title="Professional Experience" body="Add Dem Diesel’s professional training experience here." />
          <PlaceholderBlock title="Personal Story" body="Add Dem Diesel’s personal fitness story here." />
          <PlaceholderBlock title="Mission" body="Add the official DIESEL WAY mission statement here once approved." />
        </div>

        <div className="mt-16 rounded-2xl border border-r8-border bg-[linear-gradient(180deg,#10141A_0%,#0B1A33_100%)] p-8 text-center">
          <h2 className="font-display text-4xl uppercase text-r8-white">Ready to Earn Every Rep?</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/assessment">Start Your Assessment</Button>
            <Button href="/coaching" variant="secondary">
              Apply for Coaching
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function PlaceholderBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-dashed border-r8-border bg-r8-charcoal p-6">
      <p className="text-xs uppercase tracking-[0.18em] text-r8-warning">Content Needed</p>
      <h3 className="mt-2 font-display text-2xl uppercase text-r8-white">{title}</h3>
      <p className="mt-3 text-sm text-r8-secondary">{body}</p>
    </div>
  );
}
