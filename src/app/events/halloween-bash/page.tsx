import type { Metadata } from "next";
import { getEventBySlug } from "@/data/events";
import { HalloweenEventPage } from "@/components/events/halloween-page";

export const metadata: Metadata = {
  title: "Kids Halloween Bash",
  description:
    "Kids Halloween Bash at New Ground Jiu Jitsu in Sherman Oaks! Saturday, October 24th, 3–7 PM. Costume contest, food, drinks, and a kid-friendly scary movie. $50 for one child, $60 for two siblings, $70 for three.",
};

export default function HalloweenBashPage() {
  const event = getEventBySlug("halloween-bash");
  if (!event) return null;
  return <HalloweenEventPage event={event} />;
}
