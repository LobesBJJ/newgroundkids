import type { Metadata } from "next";
import { getEventBySlug } from "@/data/events";
import { EventPage } from "@/components/events/event-page";

export const metadata: Metadata = {
  title: "All Sports Showdown",
  description:
    "All Sports Showdown Parents Night Out! Saturday, September 19th, 4–8 PM in Sherman Oaks. Drop off your kids for multi-sport games, team challenges, and pizza while you enjoy a night out.",
};

export default function AllSportsShowdownPage() {
  const event = getEventBySlug("all-sports-showdown");
  if (!event) return null;
  return <EventPage event={event} />;
}
