import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fitness Assessment",
  description:
    "Take the REIBUILT 8 fitness assessment for a personalized program and membership recommendation.",
};

export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
