export type Difficulty = "Beginner" | "All levels" | "Intermediate" | "Advanced";

export interface Program {
  id: string;
  slug: string;
  title: string;
  type: string;
  goal: string;
  level: Difficulty;
  durationWeeks: number;
  workouts: number;
  equipment: string[];
  location: "Gym" | "Home" | "Both";
  price: number;
  membershipIncluded: boolean;
  summary: string;
  description: string;
  includes: string[];
  weeklyBreakdown: { week: number; focus: string; sessions: number }[];
  sampleWorkouts: { title: string; duration: string; focus: string }[];
  faqs: { question: string; answer: string }[];
  image: string;
  featured?: boolean;
  newest?: boolean;
  category: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "Apparel" | "Supplements" | "Accessories" | "Digital Programs" | "Meal Prep" | "Gift Cards";
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  badges?: string[];
  inStock: boolean;
  inventoryLabel?: string;
  sizes?: string[];
  variants?: string[];
  image: string;
  gallery?: string[];
  isFavorite?: boolean;
  shippingSummary: string;
  returnsSummary: string;
  isSupplement?: boolean;
}

export interface LiveClass {
  id: string;
  slug: string;
  title: string;
  day: string;
  time: string;
  timezone: string;
  durationMinutes: number;
  level: Difficulty;
  type: string;
  equipment: string;
  coach: string;
  spotsRemaining: number;
  totalSpots: number;
  description: string;
  isPast?: boolean;
  image: string;
}

export interface Meal {
  id: string;
  slug: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  price: number;
  subscriptionPrice: number;
  dietary: string[];
  image: string;
  featured?: boolean;
}

export interface MembershipPlan {
  id: string;
  slug: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  description: string;
  features: string[];
  cta: string;
}

export interface Testimonial {
  id: string;
  name: string;
  program: string;
  quote: string;
  rating: number;
  verified: boolean;
  imageLabel: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
  size?: string;
  type: "product" | "meal" | "program";
}

export interface AssessmentAnswer {
  questionId: string;
  value: string | string[] | number;
}

export interface AssessmentLead {
  firstName: string;
  email: string;
  fitnessGoal?: string;
}

export interface AssessmentScores {
  strength: number;
  cardio: number;
  movement: number;
  nutrition: number;
  recovery: number;
  mindset: number;
  consistency: number;
  overall: number;
  readiness: number;
}

export interface AssessmentResult {
  scores: AssessmentScores;
  tier: string;
  trainingReadiness: string;
  primaryGoal: string;
  currentLevel: string;
  recommendedProgramSlug: string;
  recommendedMembershipSlug: string;
  coachingOption: string;
  strengths: string[];
  opportunities: string[];
  coachTake: string[];
  first30Days: string[];
}

export interface AssessmentHistoryReady {
  id: string;
  completedAt: string;
  lead: AssessmentLead;
  answers: AssessmentAnswer[];
  result: AssessmentResult;
}
