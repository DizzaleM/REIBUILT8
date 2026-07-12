import type { Testimonial } from "@/types";

/** Sample content — stock portraits until verified member photos are approved. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Marcus T.",
    program: "Build Strength",
    quote:
      "The structure finally made training feel intentional. I stopped guessing and started progressing week to week.",
    rating: 5,
    verified: true,
    imageLabel: "Sample portrait",
    image: "/images/testimonials/member-1.jpg",
  },
  {
    id: "t2",
    name: "Jordan P.",
    program: "Combat Training",
    quote:
      "The boxing sessions gave me confidence and conditioning without the chaos. Clear coaching, clean structure.",
    rating: 5,
    verified: true,
    imageLabel: "Sample portrait",
    image: "/images/testimonials/member-2.jpg",
  },
  {
    id: "t3",
    name: "Alex R.",
    program: "Home Training",
    quote:
      "I travel a lot and needed something realistic. The plan kept me accountable without needing a perfect gym setup.",
    rating: 5,
    verified: true,
    imageLabel: "Sample portrait",
    image: "/images/testimonials/member-3.jpg",
  },
];
