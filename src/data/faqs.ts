import type { FaqItem } from "@/types";

export const faqs: FaqItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "Do I need a gym membership?",
    answer:
      "Not always. Home Training and many live classes can be completed with minimal equipment. Strength and athletic programs work best with gym access.",
  },
  {
    id: "faq-2",
    category: "Membership",
    question: "Can I cancel anytime?",
    answer:
      "Membership cancellation and billing terms will be finalized before launch. This mockup shows the planned experience only.",
  },
  {
    id: "faq-3",
    category: "Coaching",
    question: "How does coaching application work?",
    answer:
      "Submit the coaching form, complete an assessment, and Rei will review fit before offering a coaching plan.",
  },
  {
    id: "faq-4",
    category: "Live",
    question: "What if I miss a live class?",
    answer:
      "Members on Built and Elite plans will have access to replays once livestreaming is connected.",
  },
  {
    id: "faq-5",
    category: "Shop",
    question: "When will apparel and supplements ship?",
    answer:
      "Shipping timelines, inventory, and product details will be confirmed before the store goes live.",
  },
  {
    id: "faq-6",
    category: "Meal Prep",
    question: "Do you deliver meals everywhere?",
    answer:
      "Delivery areas and pickup options are placeholders until operations are confirmed.",
  },
];

export const coachingFaqs: FaqItem[] = [
  {
    id: "cfaq-1",
    question: "Who is coaching best for?",
    answer:
      "Members who want personalized programming, accountability, and direct feedback based on their schedule and goals.",
  },
  {
    id: "cfaq-2",
    question: "Is coaching medical advice?",
    answer:
      "No. Coaching provides general fitness and lifestyle guidance. It is not medical treatment or diagnosis.",
  },
  {
    id: "cfaq-3",
    question: "How long does onboarding take?",
    answer:
      "Most applicants complete assessment and kickoff within one to two weeks depending on availability.",
  },
];

export const membershipFaqs: FaqItem[] = [
  {
    id: "mfaq-1",
    question: "What is the difference between Built and Elite?",
    answer:
      "Built includes the full library and live classes. Elite adds monthly one-on-one coaching and priority support.",
  },
  {
    id: "mfaq-2",
    question: "Are programs included in membership?",
    answer:
      "Built and Elite include program access. Foundation includes a starter library with monthly additions.",
  },
];
