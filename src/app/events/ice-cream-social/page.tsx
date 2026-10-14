import type { Metadata } from "next";
import { getEventBySlug } from "@/data/events";
import { IceCreamEventPage } from "@/components/events/ice-cream-page";

export const metadata: Metadata = {
  title: "Ice Cream Social",
  description:
    "Ice Cream Social at New Ground Jiu Jitsu in Sherman Oaks — Saturday, January 23, 2–4 PM. Learn jiu jitsu, meet new friends, share ice cream at the end. Free for New Ground students who bring a friend who doesn't train jiu jitsu.",
};

export default function IceCreamSocialPage() {
  const event = getEventBySlug("ice-cream-social");
  if (!event) return null;
  return <IceCreamEventPage event={event} />;
}
