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
      "Diesel Community access",
      "Progress tracking",
      "Nutrition resources",
    ],
    cta: "Join Foundation",
  },
  {
    id: "mem-forge",
    slug: "forge",
    name: "Forge",
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
    cta: "Join Forge",
  },
  {
    id: "mem-elite",
    slug: "elite",
    name: "Diesel Elite",
    monthlyPrice: 99.99,
    annualPrice: 1019.9,
    description: "Priority coaching support and personalized adjustments.",
    features: [
      "Everything in Forge",
      "Monthly one-on-one coaching session",
      "Personalized program adjustments",
      "Priority support",
      "Form review",
      "Exclusive challenges",
    ],
    cta: "Join Diesel Elite",
  },
];

export const membershipComparison = [
  { feature: "Workout library", foundation: "Starter", forge: "Full", elite: "Full" },
  { feature: "New workouts", foundation: "Monthly", forge: "Weekly drops", elite: "Weekly drops" },
  { feature: "Live classes", foundation: "—", forge: "Included", elite: "Included" },
  { feature: "Replays", foundation: "—", forge: "Included", elite: "Included" },
  { feature: "Diesel Community", foundation: "Included", forge: "Included", elite: "Included" },
  { feature: "Challenges", foundation: "Select", forge: "Included", elite: "Exclusive" },
  { feature: "Progress tracking", foundation: "Included", forge: "Included", elite: "Advanced" },
  { feature: "Nutrition library", foundation: "Included", forge: "Included", elite: "Included" },
  { feature: "Group coaching", foundation: "—", forge: "Monthly", elite: "Monthly" },
  { feature: "One-on-one coaching", foundation: "—", forge: "—", elite: "Monthly session" },
  { feature: "Form review", foundation: "—", forge: "Limited", elite: "Priority" },
  { feature: "Product discounts", foundation: "—", forge: "10%", elite: "15%" },
  { feature: "Priority support", foundation: "—", forge: "—", elite: "Included" },
];

export function getMembershipBySlug(slug: string) {
  return membershipPlans.find((p) => p.slug === slug);
}
