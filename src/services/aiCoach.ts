import type { AssessmentLead, AssessmentResult } from "@/types";

/**
 * AI Coach abstraction layer.
 *
 * Current behavior: returns mocked coach responses (no network calls).
 *
 * Future connection point:
 * - Replace `getCoachTake` body with a server-side API route call
 *   such as `POST /api/ai-coach` (not implemented yet).
 * - Keep API keys ONLY on the server (OpenAI, Anthropic, etc.).
 * - Never call provider SDKs directly from the browser.
 */
export interface CoachMessageInput {
  lead: AssessmentLead;
  result: AssessmentResult;
}

export async function getCoachTake(input: CoachMessageInput): Promise<string[]> {
  await new Promise((r) => setTimeout(r, 350));

  const name = input.lead.firstName || "Athlete";
  const { result } = input;

  return [
    `${name}, here's the straight talk: you don't need more random motivation — you need a plan you can repeat. Your snapshot points to ${result.tier.toLowerCase()} with a focus on ${result.primaryGoal.toLowerCase()}.`,
    `Lean into ${result.strengths.join(" and ").toLowerCase()}. That's your current edge. Then attack ${result.opportunities.join(" and ").toLowerCase()} with boring consistency. Boring wins.`,
    `If you want the fastest path, start the recommended program, join ${result.recommendedMembershipSlug} membership, and keep me in the loop through coaching checkpoints. Built different starts with doing the unsexy work on schedule.`,
  ];
}

export async function generatePlanSummary(input: CoachMessageInput): Promise<string> {
  const lines = await getCoachTake(input);
  return lines.join("\n\n");
}
