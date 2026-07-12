import { getTier, getTrainingReadiness, labelForAnswer, scoreAssessment } from "@/lib/assessmentScoring";
import type { AssessmentAnswer, AssessmentResult } from "@/types";

export function buildRecommendations(answers: AssessmentAnswer[]): AssessmentResult {
  const scores = scoreAssessment(answers);
  const map = Object.fromEntries(answers.map((a) => [a.questionId, a.value]));

  const goal = String(map["q-goal"] ?? "habits");
  const level = String(map["q-level"] ?? "returning");
  const support = String(map["q-support"] ?? "community");
  const challenge = String(map["q-challenge"] ?? "plan");

  let recommendedProgramSlug = "home-training";
  if (goal === "strength") recommendedProgramSlug = "build-strength";
  if (goal === "fat-loss") recommendedProgramSlug = "fat-loss-accelerator";
  if (goal === "performance") recommendedProgramSlug = "athletic-performance";
  if (goal === "combat") recommendedProgramSlug = "30-day-boxing-fundamentals";
  if (goal === "home") recommendedProgramSlug = "home-training";
  if (goal === "habits") recommendedProgramSlug = "28-day-consistency-challenge";
  if (level === "beginner" && goal !== "home" && goal !== "combat") recommendedProgramSlug = "home-training";
  if (level === "beginner" && goal === "combat") recommendedProgramSlug = "30-day-boxing-fundamentals";
  if (level === "intermediate" && goal === "combat") recommendedProgramSlug = "heavy-bag-blueprint";
  if (level === "advanced" && goal === "combat") recommendedProgramSlug = "power-punch-system";
  if (scores.movement < 45 && goal === "performance") recommendedProgramSlug = "mobility-reset";
  if (challenge === "motivation" && goal === "combat") recommendedProgramSlug = "fight-conditioning-8-week";

  let recommendedMembershipSlug: "foundation" | "built" | "elite" = "built";
  if (support === "self" || scores.overall < 45) recommendedMembershipSlug = "foundation";
  if (support === "community" || support === "group") recommendedMembershipSlug = "built";
  if (support === "1on1" || scores.overall >= 80) recommendedMembershipSlug = "elite";

  let coachingOption = "Self-guided with membership structure";
  if (support === "group") coachingOption = "Monthly group coaching checkpoints";
  if (support === "1on1" || recommendedMembershipSlug === "elite") {
    coachingOption = "One-on-one coaching consult recommended";
  }
  if (challenge === "accountability" || challenge === "plan") {
    coachingOption = "Coaching application recommended for accountability";
  }

  const dimensions = [
    { key: "strength", label: "Strength", value: scores.strength },
    { key: "cardio", label: "Cardio", value: scores.cardio },
    { key: "movement", label: "Movement", value: scores.movement },
    { key: "nutrition", label: "Nutrition", value: scores.nutrition },
    { key: "recovery", label: "Recovery", value: scores.recovery },
    { key: "mindset", label: "Mindset", value: scores.mindset },
    { key: "consistency", label: "Consistency", value: scores.consistency },
  ].sort((a, b) => b.value - a.value);

  const strengths = dimensions.slice(0, 2).map((d) => d.label);
  const opportunities = dimensions.slice(-2).map((d) => d.label);

  const primaryGoal = labelForAnswer("q-goal", goal);
  const currentLevel = labelForAnswer("q-level", level);

  const coachTake = [
    `You're not starting from zero — you're starting from clarity. Your primary target is clear: ${primaryGoal.toLowerCase()}. That gives us a lane to train in instead of bouncing between random workouts.`,
    `Your readiness score sits at ${scores.readiness}. That means we build with structure, not chaos. Protect the days you can actually train and stop negotiating with the perfect week that never shows up.`,
    `The biggest unlock for you right now is improving ${opportunities.join(" and ").toLowerCase()} while leaning on ${strengths.join(" and ").toLowerCase()}. Do that for 30 days and the plan starts compounding.`,
  ];

  const first30Days = [
    "Train 3–4 protected sessions each week — same days, same time window.",
    `Start the recommended program and complete week one exactly as written.`,
    "Track protein, sleep, and workouts in one place. Keep it simple and honest.",
  ];

  return {
    scores,
    tier: getTier(scores.overall),
    trainingReadiness: getTrainingReadiness(scores.readiness),
    primaryGoal,
    currentLevel,
    recommendedProgramSlug,
    recommendedMembershipSlug,
    coachingOption,
    strengths,
    opportunities,
    coachTake,
    first30Days,
  };
}
