// Birthday Party Packages Data
// Based on NewGround Kids official pricing

import { images } from "@/lib/images";

export interface BirthdayPackage {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  deposit: number;
  duration: string;
  maxKids: number;
  hosts: number;
  featured?: boolean;
  color?: "coral" | "accent" | "purple";
  features: string[];
  bonuses?: string[];
}

export const birthdayPackages: BirthdayPackage[] = [
  {
    id: "small",
    name: "Small Party",
    subtitle: "Up to 12 Kids",
    price: 499,
    deposit: 200,
    duration: "2 hours",
    maxKids: 12,
    hosts: 1,
    color: "coral",
    features: [
      "45 minutes of gameplay & activities",
      "45 minutes of free play on mats",
      "30 minutes in party area for food, drinks & cake",
      "Digital invitations (design only)",
      "Setup and cleanup included",
      "Special belt ceremony for birthday child",
    ],
  },
  {
    id: "medium",
    name: "Medium Party",
    subtitle: "Up to 16 Kids",
    price: 699,
    deposit: 200,
    duration: "2 hours",
    maxKids: 16,
    hosts: 2,
    featured: true,
    color: "accent",
    features: [
      "45 minutes of gameplay & activities",
      "45 minutes of free play + indoor bounce house (ages 5-9)",
      "30 minutes in party area for food, drinks & cake",
      "Digital invitations (design only)",
      "Setup and cleanup included",
      "Special belt ceremony for birthday child",
    ],
    bonuses: ["Birthday child gets a free week of Jiu Jitsu classes"],
  },
  {
    id: "large",
    name: "Large Party",
    subtitle: "Up to 20 Kids",
    price: 899,
    deposit: 200,
    duration: "2.5 hours",
    maxKids: 20,
    hosts: 2,
    color: "purple",
    features: [
      "60 minutes of gameplay + indoor bounce house (ages 5-9)",
      "45 minutes of free play + bounce house (indoor or outdoor)",
      "45 minutes in party area for food, drinks & cake",
      "Premium invitations (custom designed)",
      "Setup and cleanup included",
      "Special belt ceremony for birthday child",
    ],
    bonuses: ["Birthday child gets a free month of classes", "Pizza and drinks for all guests"],
  },
];

export interface BirthdayExtra {
  id: string;
  name: string;
  price: number;
  note?: string;
  description?: string;
}

export const birthdayExtras: BirthdayExtra[] = [
  {
    id: "extra-time",
    name: "Extra 30 Minutes",
    price: 100,
  },
  {
    id: "extra-kids",
    name: "Additional Kids",
    price: 15,
    note: "per child",
  },
  {
    id: "decorations",
    name: "Balloons & Decorations",
    price: 100,
  },
  {
    id: "face-painting",
    name: "Face Painting",
    price: 125,
    note: "per artist/hr",
    description: "Small party: 1 artist | Medium/Large: 2 artists ($175/hr)",
  },
  {
    id: "nerf",
    name: "Nerf Battle for Gameplay",
    price: 100,
  },
  {
    id: "photo",
    name: "Photo Package",
    price: 350,
    note: "50 HQ photos",
    description: "Professional photos delivered within 48 hours",
  },
  {
    id: "bounce-house",
    name: "Large Outdoor Bounce House",
    price: 200,
    note: "$125 as substitute",
    description: "Upgrade to large outdoor bounce house",
  },
];

// "Party Moments" gallery on the birthday party page.
// Photos render first, then videos. Each item is tagged with the party
// experience it shows so parents can filter by what they want to book.
export type PartyMomentCategory = "indoor-bounce" | "outdoor-bounce" | "nerf" | "extras";

export const partyMomentCategories: {
  id: PartyMomentCategory;
  label: string;
  /** Compact label for small tiles on phones */
  short: string;
}[] = [
  { id: "indoor-bounce", label: "Indoor Bounce House", short: "Indoor Bounce" },
  { id: "outdoor-bounce", label: "Outdoor Bounce House", short: "Outdoor Bounce" },
  { id: "nerf", label: "Nerf Battle", short: "Nerf Battle" },
  { id: "extras", label: "Photo Booth & Face Paint", short: "Booth & Paint" },
];

export interface PartyMoment {
  id: string;
  type: "image" | "video";
  category: PartyMomentCategory;
  src: string;
  alt: string;
  caption?: string;
  /** Video only: still frame shown before playback */
  poster?: string;
  /** Video only: drives tile shape */
  orientation?: "landscape" | "portrait";
}

const PM_IMG = "/images/party-moments";
const PM_VID = "/videos/party-moments";

export const partyMoments: PartyMoment[] = [
  // Photos
  {
    id: "indoor-bounce-party",
    type: "image",
    category: "indoor-bounce",
    src: `${PM_IMG}/indoor-bounce-party.jpg`,
    alt: "Kids racing down the double slide of the indoor bounce house during a birthday party",
    caption: "Slide races on the mats",
  },
  {
    id: "indoor-bounce-setup",
    type: "image",
    category: "indoor-bounce",
    src: `${PM_IMG}/indoor-bounce-setup.jpg`,
    alt: "Indoor bounce house with obstacle course and double slide set up on the academy mats",
    caption: "Set up and ready before guests arrive",
  },
  {
    id: "photo-booth-guest",
    type: "image",
    category: "extras",
    src: images.birthday.DSC06085,
    alt: "Party guest posing at the photo booth",
  },
  {
    id: "photo-booth-setup",
    type: "image",
    category: "extras",
    src: images.birthday.DSC06065,
    alt: "Photo booth set up in front of a sequin backdrop",
  },
  {
    id: "face-paint-logo",
    type: "image",
    category: "extras",
    src: images.birthday.DSC06037,
    alt: "Guest getting a NewGround logo painted on her cheek",
  },
  {
    id: "face-paint-full",
    type: "image",
    category: "extras",
    src: images.birthday.DSC06039,
    alt: "Smiling guest with full face paint",
  },
  // Videos
  {
    id: "outdoor-bounce-party",
    type: "video",
    category: "outdoor-bounce",
    orientation: "landscape",
    src: `${PM_VID}/outdoor-bounce-party.mp4`,
    poster: `${PM_IMG}/outdoor-bounce-party-poster.jpg`,
    alt: "Video of kids jumping and sliding in the large outdoor bounce house at a party",
    caption: "Party in full swing",
  },
  {
    id: "outdoor-bounce-setup",
    type: "video",
    category: "outdoor-bounce",
    orientation: "landscape",
    src: `${PM_VID}/outdoor-bounce-setup.mp4`,
    poster: `${PM_IMG}/outdoor-bounce-setup-poster.jpg`,
    alt: "Walkaround video of the large tropical bounce house and slide combo",
    caption: "Bounce + slide combo walkaround",
  },
  {
    id: "nerf-battle",
    type: "video",
    category: "nerf",
    orientation: "portrait",
    src: `${PM_VID}/nerf-battle.mp4`,
    poster: `${PM_IMG}/nerf-battle-poster.jpg`,
    alt: "Video of kids in vests and masks playing a Nerf battle among foam bunkers",
    caption: "Indoor Nerf arena",
  },
];

// Stats for the stats bar
export const birthdayStats = [
  { value: "500+", label: "Parties Hosted" },
  { value: "4.9", label: "Star Rating" },
  { value: "2-2.5", label: "Hours of Fun" },
  { value: "12-20", label: "Kids per Party" },
];
