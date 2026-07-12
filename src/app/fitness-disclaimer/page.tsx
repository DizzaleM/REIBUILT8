import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Fitness Disclaimer",
  description: "DIESEL WAY fitness disclaimer placeholder.",
};

export default function FitnessDisclaimerPage() {
  return (
    <div>
      <PageHero
        title="Fitness Disclaimer"
        description="Training and nutrition content is general information, not medical advice."
      />
      <section className="mx-auto max-w-3xl space-y-4 px-4 py-12 text-sm leading-relaxed text-r8-secondary sm:px-6 lg:px-8">
        <p>
          DIESEL WAY provides fitness education and coaching resources for general informational purposes. Always consult
          a qualified healthcare professional before beginning a new training or nutrition program.
        </p>
        <p>
          Results vary. No specific outcomes are guaranteed. Stop exercise and seek medical care if you experience pain,
          dizziness, or other concerning symptoms.
        </p>
        <p className="rounded-lg border border-dashed border-r8-border p-4 text-r8-muted">
          Expand this disclaimer with attorney-reviewed language before launch.
        </p>
      </section>
    </div>
  );
}
