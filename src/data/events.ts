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
    id: "all-sports-showdown-2026",
    name: "Kids All-Sports Showdown",
    emoji: "🏆",
    subtitle: "4 Hours of Game-Day Fun",
    description:
      "Drop off your kids for the ultimate All-Sports Showdown! Two hours of competitive games across their favorite sports, a post-workout meal to refuel, and a movie to wind down the night — while you enjoy a well-earned night out.",
    date: "September 19th",
    dayOfWeek: "Saturday",
    dropOff: "4:00 PM",
    pickUp: "8:00 PM",
    location: "New Ground Jiu Jitsu",
    addressLine1: "4617 Van Nuys Blvd, Unit B",
    addressLine2: "Sherman Oaks, CA 91403",
    pricing: {
      perChild: 50,
      description: "first child",
    },
    addOn: {
      label: "Sibling Add-On",
      price: 10,
      description: "each additional child from the same family",
      calEventSlug: "all-sports-showdown-sibling",
      note: "Book your first child first, then add one sibling booking per additional child. Full steps below.",
      steps: [
        {
          title: "Book your first child",
          detail:
            "Tap \u201cBook First Child \u2013 $50\u201d, choose the 4:00 PM slot, enter your name and email, and pay. You\u2019ll get a confirmation email right away.",
        },
        {
          title: "Add each sibling",
          detail:
            "Come back to this page and tap \u201cAdd a Sibling \u2013 $10\u201d. Choose the same 4:00 PM slot, enter the sibling\u2019s name plus the name of the child you already registered, and pay. Do this once for every additional sibling.",
        },
        {
          title: "Check your inbox",
          detail:
            "Each child gets their own confirmation email \u2014 that\u2019s their spot. Nothing to print; just bring the kids on the 19th!",
        },
      ],
      example: "Example: 3 kids = one $50 booking + two $10 sibling bookings = $70 total.",
    },
    activities: [
      { icon: "Timer", label: "2 Hours of Competitive Games" },
      { icon: "Medal", label: "Team Challenges & Prizes" },
      { icon: "Utensils", label: "Post-Workout Meal" },
      { icon: "Film", label: "Movie to Finish the Night" },
    ],
    flyer: {
      src: "/images/events/all-sports-showdown-flyer.jpg",
      width: 1600,
      height: 2071,
      alt: "Kids All-Sports Showdown flyer — Sept 19, 4–8 PM at New Ground Jiu Jitsu",
    },
    audience: "New Ground students only",
    requirements: [
      "Wear your uniform or active wear",
      "Bring a change of clothes for after",
      "Bring water",
    ],
    calEventSlug: "all-sports-showdown",
    featured: true,
    tagline: "You enjoy the night off. We'll bring the game.",
    theme: {
      primary: "#2563EB", // Blue-600
      secondary: "#DBEAFE", // Blue-100
      burstColor: "#2563EB",
    },
  },
];

// Helper to get event by slug
export const getEventBySlug = (slug: string) => {
  const slugMap: Record<string, string> = {
    "all-sports-showdown": "all-sports-showdown-2026",
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
};
