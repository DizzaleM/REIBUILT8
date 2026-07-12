import type { MembershipPlan } from "@/types";

export const membershipPlans: MembershipPlan[] = [
  {
    id: "mem-foundation",
    slug: "foundation",
    name: "Foundation",
    monthlyPrice: 29.99,
    annualPrice: 305.9,
    description: "Start structured training with the essentials.",
    features: [
      "Starter workout library",
      "New monthly workouts",
      "Member community access",
      "Progress tracking",
      "Nutrition resources",
    ],
    cta: "Join Foundation",
  },
  {
    id: "mem-built",
    slug: "built",
    name: "Built",
    monthlyPrice: 59.99,
    annualPrice: 611.9,
    popular: true,
    description: "Full library access plus weekly live training.",
    features: [
      "Everything in Foundation",
      "Full workout library",
      "Weekly live classes",
      "Program access",
      "Monthly group coaching",
      "Member discounts",
    ],
    cta: "Join Built",
  },
  {
    id: "mem-elite",
    slug: "elite",
    name: "Elite",
    monthlyPrice: 99.99,
    annualPrice: 1019.9,
    description: "Priority coaching support and personalized adjustments.",
    features: [
      "Everything in Built",
      "Monthly one-on-one coaching session",
      "Personalized program adjustments",
      "Priority support",
      "Form review",
      "Exclusive challenges",
    ],
    cta: "Join Elite",
  },
];

export const membershipComparison = [
  { feature: "Workout library", foundation: "Starter", built: "Full", elite: "Full" },
  { feature: "New workouts", foundation: "Monthly", built: "Weekly drops", elite: "Weekly drops" },
  { feature: "Live classes", foundation: "—", built: "Included", elite: "Included" },
  { feature: "Replays", foundation: "—", built: "Included", elite: "Included" },
  { feature: "Community", foundation: "Included", built: "Included", elite: "Included" },
  { feature: "Challenges", foundation: "Select", built: "Included", elite: "Exclusive" },
  { feature: "Progress tracking", foundation: "Included", built: "Included", elite: "Advanced" },
  { feature: "Nutrition library", foundation: "Included", built: "Included", elite: "Included" },
  { feature: "Group coaching", foundation: "—", built: "Monthly", elite: "Monthly" },
  { feature: "One-on-one coaching", foundation: "—", built: "—", elite: "Monthly session" },
  { feature: "Form review", foundation: "—", built: "Limited", elite: "Priority" },
  { feature: "Product discounts", foundation: "—", built: "10%", elite: "15%" },
  { feature: "Priority support", foundation: "—", built: "—", elite: "Included" },
];

export function getMembershipBySlug(slug: string) {
  return membershipPlans.find((p) => p.slug === slug);
}
