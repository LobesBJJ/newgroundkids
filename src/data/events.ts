// Events Data
// Special events like Parents Night Out, seasonal parties, etc.

import {
  LucideIcon,
  Pizza,
  Gamepad2,
  Palette,
  Film,
  Heart,
  Shield,
  Users,
  Baby,
  Flower,
  Sun,
  Flower2,
  Waves,
  IceCream,
  Music,
  TreePine,
  ShoppingBag,
  Coffee,
  Donut,
  Trophy,
  Medal,
  Zap,
  Star,
  Utensils,
  Timer,
  Ghost,
  Skull,
  Candy,
  Bandage,
} from "lucide-react";

export interface EventActivity {
  icon: string; // Lucide icon name
  label: string;
}

export interface EventTimeSlot {
  label: string;
  ageRange: string;
  time: string;
  calEventSlug: string;
}

export interface EventTier {
  label: string; // e.g. "1 Child"
  kids: number;
  price: number;
  calEventSlug: string;
  note?: string; // e.g. "Siblings only"
  popular?: boolean;
}

export interface RecurringEvent {
  id: string;
  name: string;
  emoji?: string;
  subtitle: string;
  description: string;
  date: string;
  dayOfWeek: string;
  dropOff: string;
  pickUp: string;
  location: string;
  addressLine1: string;
  addressLine2: string;
  pricing: {
    perChild: number;
    description: string;
  };
  activities: EventActivity[];
  calEventSlug: string;
  featured: boolean;
  // Cal.com month/date to open the booking popup on (e.g. "2026-10" / "2026-10-24")
  calMonth?: string;
  calDate?: string;
  // Flat pricing tiers, each sold as its own single-checkout Cal.com event
  // (e.g. 1 child $50, 2 siblings $60, 3 siblings $70)
  tiers?: EventTier[];
  // Optional add-on booking (e.g. sibling discount) sold as a separate Cal.com event
  addOn?: {
    label: string; // e.g. "Sibling Add-On"
    price: number;
    description: string; // e.g. "each additional child from the same family"
    calEventSlug: string;
    note?: string; // shown under the add-on button
    // Step-by-step instructions for booking multiple kids (rendered as numbered tiles)
    steps?: { title: string; detail: string }[];
    example?: string; // e.g. "3 kids = $50 + $10 + $10 = $70"
  };
  // Optional flyer image (served from /public) — shown in the hero and downloadable
  flyer?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  // Who the event is for (shown as a badge), e.g. "New Ground students only"
  audience?: string;
  // Things parents/kids need to know or bring
  requirements?: string[];
  // For display
  tagline?: string;
  theme?: {
    primary: string; // Hex color for buttons/accents
    secondary: string; // Hex color for backgrounds/secondary elements
    burstColor: string;
  };
  timeSlots?: EventTimeSlot[];
}

export const upcomingEvents: RecurringEvent[] = [
  {
    id: "halloween-bash-2026",
    name: "Kids Halloween Bash",
    emoji: "\ud83c\udf83",
    subtitle: "4 Spooky Hours of Fun",
    description:
      "Drop off your little monsters for a Halloween party they\u2019ll be talking about until next October: a costume contest with small prizes for the top 3 costumes, a mummy wrap relay, mini pumpkin decorating, food and drinks, and a kid-friendly scary movie to finish the night \u2014 while you enjoy an evening off.",
    date: "October 24th",
    dayOfWeek: "Saturday",
    dropOff: "3:00 PM",
    pickUp: "7:00 PM",
    location: "New Ground Jiu Jitsu",
    addressLine1: "4617 Van Nuys Blvd, Unit B",
    addressLine2: "Sherman Oaks, CA 91403",
    pricing: {
      perChild: 50,
      description: "one child",
    },
    tiers: [
      { label: "1 Child", kids: 1, price: 50, calEventSlug: "halloween-bash-1-child" },
      {
        label: "2 Kids",
        kids: 2,
        price: 60,
        calEventSlug: "halloween-bash-2-kids",
        note: "Siblings \u00b7 save $40",
        popular: true,
      },
      {
        label: "3 Kids",
        kids: 3,
        price: 70,
        calEventSlug: "halloween-bash-3-kids",
        note: "Siblings \u00b7 save $80",
      },
    ],
    activities: [
      { icon: "Ghost", label: "Costume Contest \u2014 Prizes for Top 3" },
      { icon: "Bandage", label: "Mummy Wrap Relay" },
      { icon: "Palette", label: "Mini Pumpkin Decorating" },
      { icon: "Pizza", label: "Food" },
      { icon: "Candy", label: "Drinks" },
      { icon: "Film", label: "Kid-Friendly Scary Movie" },
    ],
    flyer: {
      src: "/images/events/halloween-bash-flyer.jpg",
      width: 1600,
      height: 2270,
      alt: "Kids Halloween Bash flyer \u2014 Oct 24, 3 PM drop-off, 7 PM pick-up at New Ground Jiu Jitsu",
    },
    audience: "All ages welcome",
    requirements: [
      "Come dressed in your costume \u2014 small prizes for the top 3!",
      "Food and drinks are included",
      "The movie is kid-friendly \u2014 spooky, not scary",
    ],
    calEventSlug: "halloween-bash-1-child",
    calMonth: "2026-10",
    calDate: "2026-10-24",
    featured: true,
    tagline: "You enjoy the night off. We\u2019ll handle the scares.",
    theme: {
      primary: "#F26B1D", // pumpkin orange
      secondary: "#1B1A17", // near-black
      burstColor: "#B5D334", // slime green
    },
  },
];

// Helper to get event by slug
export const getEventBySlug = (slug: string) => {
  const slugMap: Record<string, string> = {
    "halloween-bash": "halloween-bash-2026",
  };
  return upcomingEvents.find((e) => e.id === slugMap[slug]);
};

// Helper to get the next upcoming event
export const getNextEvent = () => upcomingEvents.find((e) => e.featured) || upcomingEvents[0];

// Helper to get event by ID
export const getEventById = (id: string) => upcomingEvents.find((e) => e.id === id);

// Activity icons map for rendering
export const activityIcons: Record<string, LucideIcon> = {
  Gamepad2,
  Palette,
  Pizza,
  Film,
  Heart,
  Shield,
  Users,
  Baby,
  Flower,
  Sun,
  Flower2,
  Waves,
  IceCream,
  Music,
  TreePine,
  ShoppingBag,
  Coffee,
  Donut,
  Trophy,
  Medal,
  Zap,
  Star,
  Utensils,
  Timer,
  Ghost,
  Skull,
  Candy,
  Bandage,
};
