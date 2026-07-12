"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { PricingCard } from "@/components/cards/ContentCards";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { assessmentQuestions, ASSESSMENT_ESTIMATE } from "@/data/assessmentQuestions";
import { buildRecommendations } from "@/lib/programRecommendations";
import { analytics } from "@/lib/analytics";
import { getCoachTake } from "@/services/aiCoach";
import { getProgramBySlug } from "@/data/programs";
import { getMembershipBySlug } from "@/data/memberships";
import { useUi } from "@/components/providers/UiProvider";
import type { AssessmentAnswer, AssessmentLead, AssessmentResult } from "@/types";
import { cn } from "@/lib/utils";

type Stage = "intro" | "questions" | "lead" | "results";

export default function AssessmentPage() {
  const reduce = useReducedMotion();
  const { openCheckout } = useUi();
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [lead, setLead] = useState<AssessmentLead>({ firstName: "", email: "", fitnessGoal: "" });
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [coachTake, setCoachTake] = useState<string[]>([]);
  const [annual, setAnnual] = useState(false);

  const question = assessmentQuestions[index];
  const total = assessmentQuestions.length;
  const progress = stage === "questions" ? ((index + 1) / total) * 100 : stage === "lead" ? 100 : stage === "results" ? 100 : 0;
  const selected = question ? answers[question.id] : undefined;
  const canContinue = Boolean(selected);

  useEffect(() => {
    analytics.assessmentStarted();
  }, []);

  const answerList: AssessmentAnswer[] = useMemo(
    () => Object.entries(answers).map(([questionId, value]) => ({ questionId, value })),
    [answers],
  );

  const start = () => {
    setStage("questions");
    setIndex(0);
  };

  const selectOption = (value: string) => {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    analytics.questionAnswered({ questionId: question.id, value });
  };

  const next = () => {
    if (!canContinue) return;
    if (index < total - 1) {
      setIndex((i) => i + 1);
      return;
    }
    setStage("lead");
  };

  const back = () => {
    if (stage === "lead") {
      setStage("questions");
      setIndex(total - 1);
      return;
    }
    if (index > 0) setIndex((i) => i - 1);
    else setStage("intro");
  };

  const revealResults = async () => {
    if (!lead.firstName.trim() || !lead.email.trim()) return;
    const built = buildRecommendations(answerList);
    setResult(built);
    analytics.assessmentCompleted({ overall: built.scores.overall, tier: built.tier });
    analytics.programRecommended({ slug: built.recommendedProgramSlug });
    analytics.membershipRecommended({ slug: built.recommendedMembershipSlug });
    analytics.leadCaptured({ email: lead.email });
    const take = await getCoachTake({ lead, result: built });
    setCoachTake(take);
    setStage("results");
  };

  const program = result ? getProgramBySlug(result.recommendedProgramSlug) : null;
  const membership = result ? getMembershipBySlug(result.recommendedMembershipSlug) : null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-r8-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(8,107,255,0.16),transparent_50%)]" />
      <div className="relative mx-auto flex min-h-full max-w-3xl flex-col px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <Logo href="/" />
          <Link href="/" className="text-xs uppercase tracking-[0.16em] text-r8-muted hover:text-r8-white">
            Exit
          </Link>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-r8-muted">
            <span>
              {stage === "questions"
                ? `Question ${index + 1} of ${total}`
                : stage === "lead"
                  ? "Get your plan"
                  : stage === "results"
                    ? "Your report"
                    : "Fitness assessment"}
            </span>
            <span>{ASSESSMENT_ESTIMATE}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-r8-elevated">
            <motion.div
              className="h-full bg-r8-blue"
              animate={{ width: `${progress}%` }}
              transition={{ duration: reduce ? 0 : 0.35 }}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center py-8">
          <AnimatePresence mode="wait">
            {stage === "intro" ? (
              <motion.div
                key="intro"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                className="text-center"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-r8-blue-light">
                  Premium Coaching Consultation
                </p>
                <h1 className="mt-4 font-display text-4xl uppercase leading-none text-r8-white sm:text-5xl">
                  Get Your Personalized Plan
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-r8-secondary">
                  Answer a few direct questions. Get a coaching-style readiness report, program recommendation, and
                  membership guidance — no fluff, no shame, just clarity.
                </p>
                <Button className="mt-8" size="lg" onClick={start}>
                  Start Assessment
                </Button>
              </motion.div>
            ) : null}

            {stage === "questions" && question ? (
              <motion.div
                key={question.id}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="font-display text-3xl uppercase leading-tight text-r8-white sm:text-4xl">
                  {question.prompt}
                </h2>
                {question.helper ? <p className="mt-3 text-sm text-r8-secondary">{question.helper}</p> : null}
                <div className="mt-8 space-y-3">
                  {question.options.map((option) => {
                    const active = selected === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => selectOption(option.value)}
                        className={cn(
                          "flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-4 text-left transition",
                          active
                            ? "border-r8-blue bg-r8-blue/10 text-r8-white"
                            : "border-r8-border bg-r8-elevated text-r8-secondary hover:border-r8-blue/50 hover:text-r8-white",
                        )}
                      >
                        <span className="text-sm sm:text-base">{option.label}</span>
                        {active ? <Check className="h-4 w-4 text-r8-blue-light" /> : null}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-8 flex items-center justify-between gap-3">
                  <Button variant="ghost" onClick={back}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button onClick={next} disabled={!canContinue}>
                    Continue <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ) : null}

            {stage === "lead" ? (
              <motion.div
                key="lead"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
              >
                <h2 className="font-display text-3xl uppercase text-r8-white sm:text-4xl">
                  Get My Personalized Plan
                </h2>
                <p className="mt-3 text-r8-secondary">
                  Enter your details to unlock your coaching report. PDF email delivery can be connected later.
                </p>
                <div className="mt-8 space-y-4">
                  <label className="block text-sm text-r8-secondary">
                    First name
                    <input
                      required
                      value={lead.firstName}
                      onChange={(e) => setLead((prev) => ({ ...prev, firstName: e.target.value }))}
                      className="mt-2 w-full rounded-md border border-r8-border bg-r8-elevated px-4 py-3 text-r8-white"
                    />
                  </label>
                  <label className="block text-sm text-r8-secondary">
                    Email address
                    <input
                      required
                      type="email"
                      value={lead.email}
                      onChange={(e) => setLead((prev) => ({ ...prev, email: e.target.value }))}
                      className="mt-2 w-full rounded-md border border-r8-border bg-r8-elevated px-4 py-3 text-r8-white"
                    />
                  </label>
                  <label className="block text-sm text-r8-secondary">
                    Fitness goal (optional)
                    <input
                      value={lead.fitnessGoal ?? ""}
                      onChange={(e) => setLead((prev) => ({ ...prev, fitnessGoal: e.target.value }))}
                      className="mt-2 w-full rounded-md border border-r8-border bg-r8-elevated px-4 py-3 text-r8-white"
                      placeholder="What does the next level look like for you?"
                    />
                  </label>
                </div>
                <div className="mt-8 flex items-center justify-between gap-3">
                  <Button variant="ghost" onClick={back}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </Button>
                  <Button onClick={revealResults} disabled={!lead.firstName.trim() || !lead.email.trim()}>
                    Reveal My Results
                  </Button>
                </div>
              </motion.div>
            ) : null}

            {stage === "results" && result ? (
              <motion.div
                key="results"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10 pb-16"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-r8-blue-light">
                    {lead.firstName}&apos;s Fitness Snapshot
                  </p>
                  <h2 className="mt-3 font-display text-4xl uppercase text-r8-white">Your Coaching Report</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <ScoreTile label="Overall Score" value={`${result.scores.overall}`} />
                  <ScoreTile label="Fitness Tier" value={result.tier} />
                  <ScoreTile label="Training Readiness" value={result.trainingReadiness} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoTile label="Primary Goal" value={result.primaryGoal} />
                  <InfoTile label="Current Fitness Level" value={result.currentLevel} />
                  <InfoTile label="Consistency Rating" value={`${result.scores.consistency}`} />
                  <InfoTile label="Recovery Rating" value={`${result.scores.recovery}`} />
                  <InfoTile label="Nutrition Rating" value={`${result.scores.nutrition}`} />
                  <InfoTile label="Movement Rating" value={`${result.scores.movement}`} />
                  <InfoTile label="Cardio Rating" value={`${result.scores.cardio}`} />
                  <InfoTile label="Strength Rating" value={`${result.scores.strength}`} />
                  <InfoTile label="Mindset Rating" value={`${result.scores.mindset}`} />
                  <InfoTile label="Overall Readiness Score" value={`${result.scores.readiness}`} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-r8-border bg-r8-elevated p-5">
                    <h3 className="font-display text-xl uppercase text-r8-white">Strengths</h3>
                    <ul className="mt-3 space-y-2 text-sm text-r8-secondary">
                      {result.strengths.map((s) => (
                        <li key={s}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-r8-border bg-r8-elevated p-5">
                    <h3 className="font-display text-xl uppercase text-r8-white">Opportunities</h3>
                    <ul className="mt-3 space-y-2 text-sm text-r8-secondary">
                      {result.opportunities.map((s) => (
                        <li key={s}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border border-r8-border bg-r8-charcoal p-6">
                  <h3 className="font-display text-2xl uppercase text-r8-white">Coach&apos;s Take</h3>
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-r8-secondary">
                    {(coachTake.length ? coachTake : result.coachTake).map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl uppercase text-r8-white">Your First 30 Days</h3>
                  <ol className="mt-4 space-y-3">
                    {result.first30Days.map((item, i) => (
                      <li key={item} className="rounded-lg border border-r8-border bg-r8-elevated px-4 py-3 text-sm text-r8-secondary">
                        <span className="text-r8-blue-light">0{i + 1}.</span> {item}
                      </li>
                    ))}
                  </ol>
                </div>

                {program ? (
                  <div>
                    <h3 className="mb-4 font-display text-2xl uppercase text-r8-white">Recommended Program</h3>
                    <ProgramCard program={program} />
                  </div>
                ) : null}

                {membership ? (
                  <div>
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                      <h3 className="font-display text-2xl uppercase text-r8-white">Recommended Membership</h3>
                      <button
                        type="button"
                        onClick={() => setAnnual((v) => !v)}
                        className="text-xs uppercase tracking-[0.14em] text-r8-blue-light"
                      >
                        Toggle {annual ? "Monthly" : "Annual"}
                      </button>
                    </div>
                    <PricingCard
                      plan={membership}
                      annual={annual}
                      onJoin={() => {
                        analytics.membershipRecommended({ slug: membership.slug, action: "join-click" });
                        openCheckout(
                          `Secure payment processing for the ${membership.name} plan will be connected later.`,
                        );
                      }}
                    />
                    <p className="mt-3 text-sm text-r8-muted">Coaching option: {result.coachingOption}</p>
                  </div>
                ) : null}

                <div className="rounded-xl border border-dashed border-r8-border p-4 text-sm text-r8-muted">
                  Want a PDF copy emailed later? Email delivery and assessment history storage will be connected in a future
                  backend phase. Interfaces are already prepared.
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    href="/coaching#apply"
                    onClick={() => analytics.bookConsultationClicked({ source: "assessment" })}
                  >
                    Book a Free Consultation
                  </Button>
                  <Button href="/programs" variant="secondary">
                    Browse Programs
                  </Button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ScoreTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-r8-border bg-r8-elevated p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-r8-muted">{label}</p>
      <p className="mt-2 font-display text-2xl uppercase text-r8-white">{value}</p>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-r8-border bg-r8-black p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-r8-muted">{label}</p>
      <p className="mt-1 text-sm text-r8-white">{value}</p>
    </div>
  );
}
