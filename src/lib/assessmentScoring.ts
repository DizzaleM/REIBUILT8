import { assessmentQuestions } from "@/data/assessmentQuestions";
import type { AssessmentAnswer, AssessmentScores } from "@/types";

function clamp(n: number) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function scoreAssessment(answers: AssessmentAnswer[]): AssessmentScores {
  const map = Object.fromEntries(answers.map((a) => [a.questionId, a.value]));

  const getScore = (questionId: string, fallback = 50) => {
    const question = assessmentQuestions.find((q) => q.id === questionId);
    const value = map[questionId];
    if (!question || value === undefined) return fallback;
    const option = question.options.find((o) => o.value === String(value));
    return option?.score ?? fallback;
  };

  const strength = getScore("q-strength");
  const cardio = getScore("q-cardio");
  const movement = getScore("q-movement");
  const nutrition = getScore("q-nutrition");
  const recovery = getScore("q-recovery");
  const mindset = getScore("q-mindset");
  const consistency = Math.round((getScore("q-consistency") + getScore("q-schedule")) / 2);
  const levelBoost = getScore("q-level", 55);

  const overall = clamp(
    strength * 0.18 +
      cardio * 0.12 +
      movement * 0.12 +
      nutrition * 0.14 +
      recovery * 0.12 +
      mindset * 0.14 +
      consistency * 0.18,
  );

  const readiness = clamp(overall * 0.7 + levelBoost * 0.15 + consistency * 0.15);

  return {
    strength,
    cardio,
    movement,
    nutrition,
    recovery,
    mindset,
    consistency,
    overall,
    readiness,
  };
}

export function getTier(overall: number) {
  if (overall >= 85) return "Elite Ready";
  if (overall >= 70) return "Discipline Ready";
  if (overall >= 55) return "Foundation Strong";
  if (overall >= 40) return "Building Phase";
  return "Reset Mode";
}

export function getTrainingReadiness(readiness: number) {
  if (readiness >= 80) return "High — ready for progressive structure";
  if (readiness >= 60) return "Solid — ready with smart volume";
  if (readiness >= 45) return "Developing — prioritize consistency first";
  return "Reset — start simple and stack wins";
}

export function labelForAnswer(questionId: string, value: string | string[] | number) {
  const question = assessmentQuestions.find((q) => q.id === questionId);
  const option = question?.options.find((o) => o.value === String(value));
  return option?.label ?? String(value);
}
