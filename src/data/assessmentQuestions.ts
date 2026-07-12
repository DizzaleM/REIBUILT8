export type AssessmentQuestionType = "single" | "multi" | "scale";

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  helper?: string;
  type: AssessmentQuestionType;
  options: { value: string; label: string; score?: number }[];
  scoringKey?:
    | "strength"
    | "cardio"
    | "movement"
    | "nutrition"
    | "recovery"
    | "mindset"
    | "consistency"
    | "goal"
    | "level";
}

/**
 * Conversational fitness assessment questions.
 * Edit this file to update the assessment without touching React components.
 */
export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "q-goal",
    prompt: "Alright, let's get honest — what's the main thing you want to build right now?",
    helper: "Pick the goal that matters most over the next 90 days.",
    type: "single",
    scoringKey: "goal",
    options: [
      { value: "strength", label: "Get stronger and more capable in the gym" },
      { value: "fat-loss", label: "Drop body fat and tighten things up" },
      { value: "performance", label: "Move better, feel more athletic" },
      { value: "habits", label: "Stop restarting and finally stay consistent" },
      { value: "home", label: "Train effectively at home with limited equipment" },
    ],
  },
  {
    id: "q-level",
    prompt: "Where are you starting from — no ego, just clarity?",
    helper: "This helps us match intensity and structure.",
    type: "single",
    scoringKey: "level",
    options: [
      { value: "beginner", label: "Beginner — I'm rebuilding the basics", score: 35 },
      { value: "returning", label: "Returning — I know what to do, I've just been inconsistent", score: 55 },
      { value: "intermediate", label: "Intermediate — I train regularly and want better structure", score: 75 },
      { value: "advanced", label: "Advanced — I need sharper programming and accountability", score: 90 },
    ],
  },
  {
    id: "q-consistency",
    prompt: "Be real with me: how consistent have you been over the last 8 weeks?",
    type: "single",
    scoringKey: "consistency",
    options: [
      { value: "ghost", label: "I've been more of a ghost than a gym member", score: 25 },
      { value: "on-off", label: "On and off — good for a week, then life hits", score: 45 },
      { value: "mostly", label: "Mostly consistent, with a few missed weeks", score: 70 },
      { value: "locked", label: "Locked in — I show up even when motivation dips", score: 90 },
    ],
  },
  {
    id: "q-strength",
    prompt: "How would you rate your current strength base?",
    helper: "Think compound lifts, body control, and load confidence.",
    type: "scale",
    scoringKey: "strength",
    options: [
      { value: "1", label: "1 — Starting from scratch", score: 20 },
      { value: "2", label: "2 — Building foundations", score: 40 },
      { value: "3", label: "3 — Solid intermediate base", score: 65 },
      { value: "4", label: "4 — Strong and progressing", score: 80 },
      { value: "5", label: "5 — High capacity, need sharper peaking", score: 95 },
    ],
  },
  {
    id: "q-cardio",
    prompt: "Cardio and conditioning — what's the current vibe?",
    type: "single",
    scoringKey: "cardio",
    options: [
      { value: "avoid", label: "I avoid it like it owes me money", score: 25 },
      { value: "occasional", label: "I get some in, but it's random", score: 50 },
      { value: "steady", label: "I train conditioning with intention most weeks", score: 75 },
      { value: "engine", label: "My engine is a real weapon", score: 90 },
    ],
  },
  {
    id: "q-movement",
    prompt: "How does your body feel when you move — stiff, solid, or somewhere in between?",
    type: "single",
    scoringKey: "movement",
    options: [
      { value: "stiff", label: "Stiff and limited — mobility needs work", score: 30 },
      { value: "ok", label: "Okay, but certain areas always feel tight", score: 55 },
      { value: "good", label: "Pretty good — I move well most days", score: 75 },
      { value: "fluid", label: "Fluid and athletic", score: 90 },
    ],
  },
  {
    id: "q-nutrition",
    prompt: "Nutrition check-in: what's actually happening outside the gym?",
    type: "single",
    scoringKey: "nutrition",
    options: [
      { value: "chaos", label: "It's chaos — meals are improvised", score: 30 },
      { value: "trying", label: "I'm trying, but weekends wipe me out", score: 50 },
      { value: "structured", label: "Mostly structured with room to tighten", score: 75 },
      { value: "dialed", label: "Dialed in and repeatable", score: 90 },
    ],
  },
  {
    id: "q-recovery",
    prompt: "Recovery and sleep — are you actually rebuilding, or just surviving?",
    type: "single",
    scoringKey: "recovery",
    options: [
      { value: "fried", label: "Fried — sleep and stress are winning", score: 30 },
      { value: "inconsistent", label: "Inconsistent recovery habits", score: 50 },
      { value: "decent", label: "Decent — I protect sleep most nights", score: 75 },
      { value: "elite", label: "Recovery is part of the plan", score: 90 },
    ],
  },
  {
    id: "q-mindset",
    prompt: "When training gets hard, what's your default move?",
    type: "single",
    scoringKey: "mindset",
    options: [
      { value: "quit", label: "I negotiate with myself and usually skip", score: 30 },
      { value: "half", label: "I show up, but I half-commit", score: 50 },
      { value: "push", label: "I push through with a plan", score: 75 },
      { value: "compete", label: "I compete with yesterday's version of me", score: 95 },
    ],
  },
  {
    id: "q-schedule",
    prompt: "How many days can you realistically train each week?",
    helper: "Pick the number you can protect — not the fantasy calendar.",
    type: "single",
    scoringKey: "consistency",
    options: [
      { value: "2", label: "2 days — quality over quantity", score: 45 },
      { value: "3", label: "3 days — solid and sustainable", score: 65 },
      { value: "4", label: "4 days — ready for structured progression", score: 80 },
      { value: "5plus", label: "5+ days — high capacity if recovery is managed", score: 90 },
    ],
  },
  {
    id: "q-challenge",
    prompt: "What's been the biggest thing knocking you off track?",
    type: "single",
    options: [
      { value: "time", label: "Time and schedule chaos" },
      { value: "plan", label: "No clear plan" },
      { value: "accountability", label: "No accountability" },
      { value: "nutrition", label: "Nutrition inconsistency" },
      { value: "motivation", label: "Motivation fades after 2–3 weeks" },
      { value: "injury", label: "Aches, stiffness, or past setbacks" },
    ],
  },
  {
    id: "q-support",
    prompt: "What level of support do you actually want?",
    type: "single",
    options: [
      { value: "self", label: "Give me the plan — I'll run it" },
      { value: "community", label: "Plan + community + live classes" },
      { value: "group", label: "I want group coaching checkpoints" },
      { value: "1on1", label: "I want direct one-on-one coaching" },
    ],
  },
];

export const ASSESSMENT_ESTIMATE = "About 2 minutes";
