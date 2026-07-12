"use client";

import { FormEvent, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { TestimonialCard } from "@/components/cards/ContentCards";
import { coachingFaqs } from "@/data/faqs";
import { testimonials } from "@/data/testimonials";

const process = [
  "Apply",
  "Complete assessment",
  "Meet with Dem Diesel",
  "Receive your plan",
  "Track progress",
  "Adjust and improve",
];

export default function CoachingPage() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <PageHero
        eyebrow="Personal Coaching"
        title="Coaching With Dem Diesel"
        description="Customized training strategy, direct accountability, and a plan designed around your goals, schedule, and experience level."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Who Coaching Is For" />
            <ul className="mt-6 space-y-3 text-r8-secondary">
              <li>You want structure without guessing.</li>
              <li>You need accountability that fits real life.</li>
              <li>You are ready to train with clear weekly targets.</li>
              <li>You want form feedback and practical nutrition guidance.</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#apply">Apply for Coaching</Button>
              <Button href="/assessment" variant="secondary">
                Take the Assessment
              </Button>
            </div>
          </div>
          <div className="relative mx-auto aspect-[3/4] max-w-md">
            <div className="pointer-events-none absolute bottom-[10%] left-1/2 h-1/2 w-3/4 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
            <ImagePlaceholder
              src="/images/coach/coaching-dem-diesel.png"
              alt="Coaching with Dem Diesel"
              label="Add Dem Diesel Photo"
              fill
              cutout
              objectFit="contain"
              className="object-contain object-bottom"
            />
          </div>
        </div>

        <div className="mt-20">
          <SectionHeading title="What Is Included" align="center" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Personalized workout plan",
              "Initial fitness assessment",
              "Weekly progress review",
              "Form feedback",
              "Nutrition guidance",
              "Direct coach communication",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-r8-border bg-r8-elevated p-5 text-r8-secondary">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <SectionHeading title="Coaching Process" align="center" />
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((step, index) => (
              <li key={step} className="rounded-xl border border-r8-border bg-r8-charcoal p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-r8-secondary">Step {index + 1}</p>
                <p className="mt-2 font-display text-2xl uppercase text-r8-white">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20">
          <SectionHeading title="What Members Are Saying" align="center" />
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div id="apply" className="mt-20 scroll-mt-28 rounded-2xl border border-r8-border bg-r8-elevated p-6 sm:p-8">
          <SectionHeading title="Coaching Application" description="Submit the form below. Nothing is stored in this mockup." />
          {submitted ? (
            <div className="mt-8 rounded-xl border border-white/35 bg-white/5 p-6">
              <p className="font-display text-2xl uppercase text-r8-white">Application received</p>
              <p className="mt-2 text-sm text-r8-secondary">
                Thanks for applying. In the live system, Dem Diesel&apos;s team would review your details and follow up by email.
              </p>
              <Button href="/assessment" className="mt-6">
                Continue with Assessment
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                ["firstName", "First name"],
                ["lastName", "Last name"],
                ["email", "Email", "email"],
                ["phone", "Phone", "tel"],
              ].map(([id, label, type = "text"]) => (
                <label key={id} className="text-sm text-r8-secondary">
                  {label}
                  <input
                    id={id}
                    name={id}
                    type={type}
                    required={id !== "phone"}
                    className="mt-2 w-full rounded-md border border-r8-border bg-r8-black px-3 py-3 text-r8-white"
                  />
                </label>
              ))}
              <label className="text-sm text-r8-secondary">
                Primary fitness goal
                <select name="goal" required className="mt-2 w-full rounded-md border border-r8-border bg-r8-black px-3 py-3 text-r8-white">
                  <option value="">Select</option>
                  <option>Strength</option>
                  <option>Fat loss</option>
                  <option>Performance</option>
                  <option>Consistency</option>
                </select>
              </label>
              <label className="text-sm text-r8-secondary">
                Experience level
                <select name="level" required className="mt-2 w-full rounded-md border border-r8-border bg-r8-black px-3 py-3 text-r8-white">
                  <option value="">Select</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>
              <label className="text-sm text-r8-secondary">
                Preferred training location
                <select name="location" required className="mt-2 w-full rounded-md border border-r8-border bg-r8-black px-3 py-3 text-r8-white">
                  <option value="">Select</option>
                  <option>Gym</option>
                  <option>Home</option>
                  <option>Both</option>
                </select>
              </label>
              <label className="text-sm text-r8-secondary">
                Coaching budget
                <select name="budget" className="mt-2 w-full rounded-md border border-r8-border bg-r8-black px-3 py-3 text-r8-white">
                  <option value="">Select</option>
                  <option>Under $150/mo</option>
                  <option>$150–$300/mo</option>
                  <option>$300+/mo</option>
                </select>
              </label>
              <label className="md:col-span-2 text-sm text-r8-secondary">
                Biggest challenge
                <textarea name="challenge" rows={3} className="mt-2 w-full rounded-md border border-r8-border bg-r8-black px-3 py-3 text-r8-white" />
              </label>
              <label className="md:col-span-2 text-sm text-r8-secondary">
                Additional notes
                <textarea name="notes" rows={3} className="mt-2 w-full rounded-md border border-r8-border bg-r8-black px-3 py-3 text-r8-white" />
              </label>
              <div className="md:col-span-2">
                <Button type="submit">Submit Application</Button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-20">
          <SectionHeading title="Coaching FAQ" />
          <div className="mt-6">
            <FaqAccordion items={coachingFaqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
