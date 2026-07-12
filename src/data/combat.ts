export interface CombatCategory {
  id: string;
  title: string;
  description: string;
  level: string;
}

export interface CombatProgram {
  id: string;
  slug: string;
  title: string;
  difficulty: string;
  durationWeeks: number;
  equipment: string[];
  workouts: number;
  videoLessons: number;
  summary: string;
  image: string;
  imageAlt: string;
  price: number;
}

export interface CombatClass {
  day: string;
  title: string;
  time: string;
}

export interface CombatProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const combatCategories: CombatCategory[] = [
  { id: "beginner-boxing", title: "Beginner Boxing", description: "Learn stance, guard, and clean fundamentals.", level: "Beginner" },
  { id: "kickboxing", title: "Kickboxing Fundamentals", description: "Build striking confidence with kicks and combinations.", level: "All levels" },
  { id: "heavy-bag", title: "Heavy Bag Workouts", description: "Power, timing, and round-based bag conditioning.", level: "All levels" },
  { id: "fight-conditioning", title: "Fight Conditioning", description: "Engine work built for rounds, recovery, and durability.", level: "Intermediate" },
  { id: "footwork", title: "Footwork & Movement", description: "Angles, balance, and ring awareness.", level: "All levels" },
  { id: "speed-agility", title: "Speed & Agility", description: "Quickness drills that transfer to striking and athletics.", level: "All levels" },
  { id: "power-striking", title: "Power Striking", description: "Generate force with mechanics, not just effort.", level: "Intermediate" },
  { id: "self-defense", title: "Self Defense Basics", description: "Practical awareness and foundational defensive skills.", level: "Beginner" },
  { id: "youth", title: "Youth Boxing", description: "Age-appropriate boxing skill, focus, and confidence.", level: "Youth" },
  { id: "womens", title: "Women's Self Defense", description: "Supportive, technique-first training for confidence.", level: "All levels" },
  { id: "advanced-combos", title: "Advanced Combination Training", description: "Link punches and movement under pressure.", level: "Advanced" },
  { id: "shadowboxing", title: "Shadowboxing", description: "Refine technique and rhythm with focused solo rounds.", level: "All levels" },
  { id: "private", title: "Private Lessons", description: "One-on-one coaching tailored to your goals.", level: "Custom" },
];

export const combatPrograms: CombatProgram[] = [
  {
    id: "cprog-1",
    slug: "30-day-boxing-fundamentals",
    title: "30-Day Boxing Fundamentals",
    difficulty: "Beginner",
    durationWeeks: 4,
    equipment: ["Gloves", "Hand wraps", "Jump rope optional"],
    workouts: 20,
    videoLessons: 18,
    summary: "Build stance, jab, cross, defense, and consistency in 30 days.",
    image: "/images/programs/combat-heavy-bag.jpg",
    imageAlt: "Rei throwing punches on a heavy bag",
    price: 49,
  },
  {
    id: "cprog-2",
    slug: "heavy-bag-blueprint",
    title: "Heavy Bag Blueprint",
    difficulty: "All levels",
    durationWeeks: 6,
    equipment: ["Heavy bag", "Gloves", "Hand wraps"],
    workouts: 24,
    videoLessons: 20,
    summary: "Round structure, power shots, and bag conditioning with clear progressions.",
    image: "/images/combat/boxing-2.jpg",
    imageAlt: "Boxing gloves and heavy bag training setup",
    price: 59,
  },
  {
    id: "cprog-3",
    slug: "power-punch-system",
    title: "Power Punch System",
    difficulty: "Intermediate",
    durationWeeks: 6,
    equipment: ["Gloves", "Heavy bag", "Resistance bands"],
    workouts: 22,
    videoLessons: 16,
    summary: "Mechanics-first power development for cleaner, harder punches.",
    image: "/images/programs/combat-heavy-bag.jpg",
    imageAlt: "Athlete developing punching power on the bag",
    price: 69,
  },
  {
    id: "cprog-4",
    slug: "fight-conditioning-8-week",
    title: "Fight Conditioning 8 Week Program",
    difficulty: "Intermediate",
    durationWeeks: 8,
    equipment: ["Jump rope", "Bodyweight", "Bag optional"],
    workouts: 32,
    videoLessons: 24,
    summary: "Conditioning for rounds, recovery, and athletic durability.",
    image: "/images/programs/athletic-performance.jpg",
    imageAlt: "Athlete prepared for conditioning work",
    price: 79,
  },
  {
    id: "cprog-5",
    slug: "kickboxing-essentials",
    title: "Kickboxing Essentials",
    difficulty: "Beginner",
    durationWeeks: 5,
    equipment: ["Gloves", "Shin guards optional"],
    workouts: 20,
    videoLessons: 18,
    summary: "Foundational kickboxing striking and movement for every level.",
    image: "/images/combat/boxing-2.jpg",
    imageAlt: "Kickboxing fundamentals training imagery",
    price: 55,
  },
  {
    id: "cprog-6",
    slug: "shadowboxing-masterclass",
    title: "Shadowboxing Masterclass",
    difficulty: "All levels",
    durationWeeks: 4,
    equipment: ["Open space"],
    workouts: 16,
    videoLessons: 14,
    summary: "Solo rounds that sharpen technique, rhythm, and fight IQ.",
    image: "/images/programs/combat-heavy-bag.jpg",
    imageAlt: "Focused striking practice",
    price: 39,
  },
  {
    id: "cprog-7",
    slug: "speed-footwork-academy",
    title: "Speed & Footwork Academy",
    difficulty: "All levels",
    durationWeeks: 5,
    equipment: ["Agility ladder optional", "Jump rope"],
    workouts: 18,
    videoLessons: 15,
    summary: "Quickness, angles, and movement that transfer to every sport.",
    image: "/images/programs/athletic-performance.jpg",
    imageAlt: "Athletic movement and footwork training",
    price: 49,
  },
  {
    id: "cprog-8",
    slug: "youth-boxing-starter",
    title: "Youth Boxing Starter Program",
    difficulty: "Youth",
    durationWeeks: 4,
    equipment: ["Youth gloves", "Hand wraps"],
    workouts: 16,
    videoLessons: 12,
    summary: "Confidence, focus, and fundamentals for young athletes.",
    image: "/images/community/community-1.jpg",
    imageAlt: "Young athletes training in a supportive environment",
    price: 45,
  },
];

export const combatSchedule: CombatClass[] = [
  { day: "Monday", title: "Boxing Fundamentals", time: "6:30 PM ET" },
  { day: "Tuesday", title: "Fight Conditioning", time: "6:30 PM ET" },
  { day: "Wednesday", title: "Heavy Bag Training", time: "6:30 PM ET" },
  { day: "Thursday", title: "Kickboxing", time: "6:30 PM ET" },
  { day: "Friday", title: "Power & Speed", time: "6:00 PM ET" },
  { day: "Saturday", title: "Open Skills Class", time: "10:00 AM ET" },
  { day: "Sunday", title: "Recovery Mobility", time: "9:00 AM ET" },
];

export const combatEquipment: CombatProduct[] = [
  { id: "ce1", name: "Boxing Gloves", price: 79, image: "/images/products/r8-gym-bag.jpg", description: "Training gloves for bag and pad work." },
  { id: "ce2", name: "Hand Wraps", price: 14, image: "/images/products/r8-resistance-bands.jpg", description: "Supportive wraps for every session." },
  { id: "ce3", name: "Heavy Bag", price: 189, image: "/images/combat/boxing-2.jpg", description: "Durable bag for home or gym striking." },
  { id: "ce4", name: "Focus Mitts", price: 49, image: "/images/products/r8-hat.jpg", description: "Pad work partner tools for combinations." },
  { id: "ce5", name: "Jump Rope", price: 24, image: "/images/products/r8-shaker.jpg", description: "Speed rope for warm-ups and conditioning." },
  { id: "ce6", name: "Resistance Bands", price: 44, image: "/images/products/r8-resistance-bands.jpg", description: "Add load to shadow and activation work." },
  { id: "ce7", name: "Mouth Guard", price: 19, image: "/images/products/r8-supplement.jpg", description: "Protective essential for partner drills." },
  { id: "ce8", name: "Shin Guards", price: 59, image: "/images/products/r8-shorts.jpg", description: "Comfortable guards for kickboxing practice." },
  { id: "ce9", name: "Training Shoes", price: 110, image: "/images/products/r8-shorts.jpg", description: "Stable footwear for footwork and bag rounds." },
  { id: "ce10", name: "Agility Ladder", price: 29, image: "/images/products/r8-journal.jpg", description: "Footwork patterns and speed drills." },
  { id: "ce11", name: "Medicine Ball", price: 39, image: "/images/products/r8-meal-prep.jpg", description: "Rotational power and conditioning tool." },
];
