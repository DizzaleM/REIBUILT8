/**
 * Future-ready assessment persistence interfaces.
 * No backend is connected in this front-end phase.
 */
import type { AssessmentAnswer, AssessmentLead, AssessmentResult } from "@/types";

export interface AssessmentRecord {
  id: string;
  createdAt: string;
  lead: AssessmentLead;
  answers: AssessmentAnswer[];
  result: AssessmentResult;
}

export interface MemberAssessmentProfile {
  memberId: string;
  latestAssessmentId?: string;
  recommendedProgramSlug?: string;
  recommendedMembershipSlug?: string;
  recommendedMealPlanId?: string;
  history: AssessmentRecord[];
}
