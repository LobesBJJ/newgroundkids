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
    name: "All Sports Showdown",
    emoji: "🏆",
    subtitle: "4 Hours of Game-Day Fun",
    description:
      "Drop off your kids for the ultimate All Sports Showdown! They'll rotate through a lineup of their favorite sports and team games, compete in friendly challenges, refuel with pizza, and wind down with a movie to finish the night — while you enjoy a well-earned night out.",
    date: "September 19th",
    dayOfWeek: "Saturday",
    dropOff: "4:00 PM",
    pickUp: "8:00 PM",
    location: "New Ground Jiu Jitsu",
    addressLine1: "4617 Van Nuys Blvd, Unit B",
    addressLine2: "Sherman Oaks, CA 91403",
    pricing: {
      perChild: 50,
      description: "per child",
    },
    activities: [
      { icon: "Trophy", label: "Multi-Sport Games" },
      { icon: "Medal", label: "Team Challenges & Prizes" },
      { icon: "Pizza", label: "Pizza & Snacks" },
      { icon: "Film", label: "Movie to Finish the Night" },
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
};
