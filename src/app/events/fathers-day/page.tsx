import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { CalendarDays, Clock, MapPin, Info, Heart, Star, Shield, Users, Coffee, Donut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { CalPopupButton } from "@/components/ui/cal-embed";
import { images } from "@/lib/images";
import { siteConfig } from "@/config/site";
import { getEventById } from "@/data/events";

export const metadata: Metadata = {
  title: "Father's Day Daddy & Me Jiu Jitsu - NewGround Kids",
  description:
    "Celebrate Father's Day with a Daddy & Me intro jiu jitsu class for dads & kids ages 3+. Sunday, June 21st at 9 AM in Sherman Oaks. Beginner friendly — enjoy donuts & coffee after!",
};

/* ============================================================
   Father's Day decorative graphics
   Custom inline SVGs that echo the flyer artwork — mustaches,
   neckties, sprinkled donuts and to-go coffee cups. All use
   currentColor so they can be themed via text color.
   ============================================================ */
type GraphicProps = { className?: string; style?: React.CSSProperties };

function Mustache({ className, style }: GraphicProps) {
  return (
    <svg viewBox="0 0 100 40" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M50 9C43 17 33 19 24 17C18 16 12 15 9 20C7 23 8 29 13 30C10 26 12 21 18 22C27 23 37 27 50 24C63 27 73 23 82 22C88 21 90 26 87 30C92 29 93 23 91 20C88 15 82 16 76 17C67 19 57 17 50 9Z" />
    </svg>
  );
}

function Necktie({ className, style }: GraphicProps) {
  return (
    <svg viewBox="0 0 40 64" className={className} style={style} fill="currentColor" aria-hidden="true">
      <path d="M14 3h12l4 8-10 6-10-6z" />
      <path d="M12.5 13h15l-3 30-4.5 18-4.5-18z" />
    </svg>
  );
}

function DonutGraphic({ className, style }: GraphicProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 6a26 26 0 1 0 0 52 26 26 0 0 0 0-52Zm0 17a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
      />
      <rect x="30" y="10" width="3" height="7" rx="1.5" fill="#FDE047" transform="rotate(20 31 13)" />
      <rect x="44" y="20" width="3" height="7" rx="1.5" fill="#FFFFFF" transform="rotate(-35 45 23)" />
      <rect x="46" y="38" width="3" height="7" rx="1.5" fill="#FCA5A5" transform="rotate(40 47 41)" />
      <rect x="30" y="47" width="3" height="7" rx="1.5" fill="#FDE047" transform="rotate(-15 31 50)" />
      <rect x="14" y="38" width="3" height="7" rx="1.5" fill="#FFFFFF" transform="rotate(30 15 41)" />
      <rect x="14" y="20" width="3" height="7" rx="1.5" fill="#FCA5A5" transform="rotate(-30 15 23)" />
    </svg>
  );
}

function CoffeeCup({ className, style }: GraphicProps) {
  return (
    <svg viewBox="0 0 48 60" className={className} style={style} fill="currentColor" aria-hidden="true">
      <rect x="21" y="3" width="6" height="6" rx="2" />
      <path d="M10 12q14-7 28 0l-1.5 4h-25z" />
      <path d="M11.5 18h25l-3 33a4 4 0 0 1-4 3.5H18.5a4 4 0 0 1-4-3.5z" />
    </svg>
  );
}

// Maps the activity icon keys from the event data to rendered icons
const activityIconMap: Record<string, LucideIcon> = { Shield, Users, Donut, Coffee };

export default function FathersDayPage() {
  const event = getEventById("fathers-day-2026");

  if (!event) {
    return null;
  }

  const RED = event.theme?.primary ?? "#DC2626";
  const RED_DARK = "#991B1B"; // Red-800 for gradients
  const INK = "#0B0B0B"; // Near-black flyer background

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero Section - Father's Day flyer theme (dark + red + white) */}
        <section className="relative overflow-hidden py-16 md:py-24" style={{ backgroundColor: INK }}>
          {/* Red glow + subtle confetti pattern */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${RED}40 0%, transparent 55%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(#ffffff 1.5px, transparent 1.5px), radial-gradient(#ffffff 1.5px, transparent 1.5px)",
              backgroundSize: "44px 44px",
              backgroundPosition: "0 0, 22px 22px",
            }}
          />

          {/* Floating flyer graphics */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <Mustache className="absolute top-[12%] left-[6%] h-8 w-20 rotate-[-8deg] text-white/80" />
            <Heart
              className="absolute top-[22%] left-[16%] h-6 w-6 animate-pulse fill-current"
              style={{ color: RED }}
            />
            <Star className="absolute top-[9%] left-[34%] h-5 w-5 fill-current text-white/50" />
            <CoffeeCup className="absolute top-[14%] right-[9%] h-14 w-12 rotate-[10deg] text-white/85" />
            <DonutGraphic className="absolute top-[10%] right-[26%] h-12 w-12 rotate-[-6deg]" style={{ color: RED }} />
            <Star className="absolute top-[30%] right-[6%] h-6 w-6 fill-current" style={{ color: RED }} />
            <Necktie className="absolute bottom-[20%] left-[8%] h-16 w-10 rotate-[-12deg]" style={{ color: RED }} />
            <Heart className="absolute bottom-[16%] left-[26%] h-5 w-5 fill-current text-white/40" />
            <DonutGraphic className="absolute bottom-[14%] right-[12%] h-14 w-14 rotate-[12deg] text-white/90" />
            <Star className="absolute bottom-[30%] right-[24%] h-4 w-4 fill-current text-white/40" />
            <Mustache className="absolute top-[48%] right-[4%] h-7 w-16 rotate-[6deg]" style={{ color: RED }} />
            <Heart
              className="absolute top-[50%] left-[4%] h-7 w-7 fill-current"
              style={{ color: RED }}
            />
          </div>

          <Container className="relative z-10">
            <div className="text-center">
              <Badge
                className="animate-slide-down mb-6 border-2 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                style={{ borderColor: RED }}
              >
                <CalendarDays className="mr-2 h-4 w-4" style={{ color: RED }} />
                {event.dayOfWeek}, {event.date}
              </Badge>

              <p
                className="font-heading animate-slide-up mb-2 text-lg tracking-[0.25em] md:text-xl"
                style={{ color: RED }}
              >
                New Ground Jiu Jitsu
              </p>

              <h1 className="animate-slide-up font-heading mb-4 text-6xl leading-[0.95] md:text-8xl lg:text-9xl">
                <span className="text-white">Daddy</span>{" "}
                <span style={{ color: RED }}>&amp; Me</span>
              </h1>

              <p className="animate-slide-up animation-delay-100 font-heading mb-2 text-2xl text-white md:text-3xl">
                {event.subtitle}
              </p>

              <p className="animation-delay-200 animate-slide-up mx-auto max-w-2xl text-lg text-white/70 md:text-xl">
                {event.tagline}
              </p>

              {/* Quick Info Pills */}
              <div className="animate-slide-up animation-delay-400 mt-8 flex flex-wrap items-center justify-center gap-3">
                <Badge className="border border-white/20 bg-white/10 px-4 py-2 text-sm text-white">
                  <Users className="mr-1.5 h-3.5 w-3.5" />
                  Kids Ages 3+
                </Badge>
                <Badge className="border border-white/20 bg-white/10 px-4 py-2 text-sm text-white">
                  <Shield className="mr-1.5 h-3.5 w-3.5" />
                  Beginner Friendly
                </Badge>
                <Badge className="border border-white/20 bg-white/10 px-4 py-2 text-sm text-white">
                  <Clock className="mr-1.5 h-3.5 w-3.5" />
                  Starts 9:00 AM
                </Badge>
              </div>

              {/* CTA Button */}
              <div className="animate-slide-up animation-delay-400 mt-8">
                <CalPopupButton
                  eventType={event.calEventSlug}
                  className="font-heading inline-flex h-16 items-center justify-center gap-3 rounded-full border-4 border-white px-12 text-xl text-white transition-all hover:scale-105"
                  style={{
                    backgroundColor: RED,
                    boxShadow: `0 8px 30px ${RED}66`,
                  }}
                >
                  <Mustache className="h-5 w-12 text-white" />
                  Reserve Your Spot
                </CalPopupButton>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto mt-12 max-w-2xl">
              <div
                className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border-4 border-white"
                style={{ boxShadow: `0 0 60px ${RED}55` }}
              >
                <Image
                  src={images.camps.training1}
                  alt="Dads and kids training jiu jitsu together at New Ground"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              {/* Decorative graphics around image */}
              <Mustache className="absolute -top-5 -left-6 z-10 h-9 w-24 rotate-[-10deg] text-white drop-shadow-lg" />
              <DonutGraphic className="absolute -right-5 -bottom-4 z-10 h-16 w-16 rotate-[12deg] drop-shadow-lg" style={{ color: RED }} />
            </div>
          </Container>

          {/* Bottom transition into white section */}
          <div
            className="absolute right-0 bottom-0 left-0 h-24"
            style={{ background: "linear-gradient(to top, white 0%, transparent 100%)" }}
          />
        </section>

        {/* Event Details & Pricing */}
        <Section className="relative overflow-hidden bg-white">
          {/* Subtle mustache pattern background */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='40' viewBox='0 0 100 40' fill='%23DC2626'%3E%3Cpath d='M50 9C43 17 33 19 24 17C18 16 12 15 9 20C7 23 8 29 13 30C10 26 12 21 18 22C27 23 37 27 50 24C63 27 73 23 82 22C88 21 90 26 87 30C92 29 93 23 91 20C88 15 82 16 76 17C67 19 57 17 50 9Z'/%3E%3C/svg%3E")`,
                backgroundSize: "120px 48px",
              }}
            />
          </div>

          <Container>
            <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left: Event Details */}
              <div className="relative z-10 flex flex-col">
                <div className="mb-6 inline-flex items-center gap-2">
                  <Badge
                    className="border-2 text-sm font-bold"
                    style={{ borderColor: RED, color: RED, backgroundColor: event.theme?.secondary }}
                  >
                    <Star className="mr-1 h-3 w-3 fill-current" />
                    FATHER&apos;S DAY SPECIAL
                  </Badge>
                </div>

                <h2 className="font-heading mb-2 text-3xl md:text-4xl">Event Details</h2>

                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{event.description}</p>

                {/* Event Logistics Card */}
                <Card
                  className="flex flex-1 flex-col border-2"
                  style={{
                    backgroundColor: event.theme?.secondary || "#FEE2E2",
                    borderColor: RED,
                    boxShadow: `6px 6px 0px 0px ${RED}`,
                  }}
                >
                  <CardContent className="flex flex-1 flex-col p-6">
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: RED }}
                        >
                          <CalendarDays className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-heading text-lg font-bold">WHEN</h4>
                          <p className="text-lg">
                            {event.dayOfWeek}, {event.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: RED }}
                        >
                          <Clock className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-heading text-lg font-bold">TIME</h4>
                          <p className="text-lg font-semibold">Starts {event.dropOff}</p>
                          <p className="text-sm opacity-70">Donuts &amp; coffee right after class</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: RED }}
                        >
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-heading text-lg font-bold">WHERE</h4>
                          <p className="text-lg">{event.location}</p>
                          <p className="text-sm opacity-70">{event.addressLine1}</p>
                          <p className="text-sm opacity-70">{event.addressLine2}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-4">
                      <p className="text-center text-sm font-medium" style={{ color: RED }}>
                        No experience necessary. All levels welcome!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Pricing / What's Included Card */}
              <div className="relative flex flex-col">
                {/* Decorative graphics around card */}
                <CoffeeCup className="absolute -top-5 -left-5 z-20 h-14 w-12 rotate-[-10deg] drop-shadow-lg" style={{ color: RED }} />
                <DonutGraphic className="absolute -right-4 -bottom-4 z-20 h-16 w-16 rotate-[10deg] drop-shadow-lg" style={{ color: RED }} />

                <Card className="relative flex flex-1 flex-col overflow-hidden border-4 shadow-2xl" style={{ borderColor: RED }}>
                  {/* Card Header with gradient */}
                  <div
                    className="relative p-8 text-center text-white"
                    style={{ background: `linear-gradient(135deg, ${RED} 0%, ${RED_DARK} 100%)` }}
                  >
                    <Mustache className="absolute top-4 left-4 h-5 w-14 text-white/20" />
                    <DonutGraphic className="absolute right-4 bottom-3 h-9 w-9 text-white/15" />

                    <p className="mb-2 text-sm font-bold tracking-widest text-white/80 uppercase">Daddy &amp; Me</p>
                    <p className="font-heading text-6xl">${event.pricing.perChild}</p>
                    <p className="mt-1 text-sm font-medium tracking-wide text-white/90 uppercase">
                      {event.pricing.description}
                    </p>
                    <p className="mt-2 text-xs font-medium tracking-wide text-white/80">
                      +$10 per additional child
                    </p>
                  </div>

                  <CardContent className="flex flex-1 flex-col p-6">
                    {/* What's Included */}
                    <p className="mb-4 text-xs font-bold tracking-wider uppercase" style={{ color: RED }}>
                      What&apos;s Included
                    </p>
                    <ul className="mb-6 space-y-3">
                      {event.activities.map((activity, i) => {
                        const IconComponent = activityIconMap[activity.icon];
                        return (
                          <li key={i} className="flex items-center gap-3">
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-full"
                              style={{ backgroundColor: event.theme?.secondary }}
                            >
                              {IconComponent && <IconComponent className="h-4 w-4" style={{ color: RED }} />}
                            </div>
                            <span className="font-medium">{activity.label}</span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Who Can Attend */}
                    <p className="mb-3 text-xs font-bold tracking-wider uppercase" style={{ color: RED }}>
                      Who Can Attend
                    </p>
                    <ul className="mb-6 space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <Heart className="h-3 w-3 fill-current" style={{ color: RED }} />
                        Dads &amp; their kids
                      </li>
                      <li className="flex items-center gap-2">
                        <Heart className="h-3 w-3 fill-current" style={{ color: RED }} />
                        Kids ages 3 and up
                      </li>
                      <li className="flex items-center gap-2">
                        <Heart className="h-3 w-3 fill-current" style={{ color: RED }} />
                        No prior jiu jitsu experience needed
                      </li>
                    </ul>

                    {/* Primary CTA */}
                    <div className="mt-auto">
                      <CalPopupButton
                        eventType={event.calEventSlug}
                        className="font-heading flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 text-base text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                        style={{ borderColor: RED, backgroundColor: RED }}
                      >
                        <Shield className="h-4 w-4" />
                        Reserve Your Spot
                      </CalPopupButton>

                      <p className="text-muted-foreground mt-4 text-center text-sm">
                        Questions? Call{" "}
                        <a
                          href={`tel:${siteConfig.contact.phoneRaw}`}
                          className="font-medium hover:underline"
                          style={{ color: RED }}
                        >
                          {siteConfig.contact.phone}
                        </a>
                      </p>

                      <p className="text-muted-foreground mt-3 text-center text-xs">
                        <Info className="mr-1 inline h-3 w-3" />
                        Select number of children when booking. Spots limited!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* Donuts & Coffee Banner - echoes the flyer's red bar */}
        <Section className="relative overflow-hidden text-white" style={{ backgroundColor: RED }} spacing="sm">
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <DonutGraphic className="absolute top-[18%] left-[6%] h-16 w-16 text-white" />
            <CoffeeCup className="absolute right-[8%] bottom-[10%] h-16 w-14 text-white" />
            <Star className="absolute top-[30%] right-[24%] h-6 w-6 fill-current text-white" />
            <Mustache className="absolute bottom-[24%] left-[28%] h-8 w-20 text-white" />
          </div>
          <Container>
            <div className="relative flex flex-col items-center justify-center gap-4 text-center">
              <div className="flex items-center gap-4">
                <DonutGraphic className="h-10 w-10 text-white" />
                <Coffee className="h-9 w-9" />
              </div>
              <h2 className="font-heading text-3xl text-white md:text-4xl">Enjoy Donuts &amp; Coffee After</h2>
              <p className="max-w-xl text-white/90">
                Once you roll off the mats, hang out and refuel with the crew. Fresh donuts for the kids
                and a hot coffee bar for the dads — our treat.
              </p>
            </div>
          </Container>
        </Section>

        {/* Private Events Banner */}
        <Section className="relative overflow-hidden text-white" style={{ backgroundColor: INK }}>
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <Necktie className="absolute top-[18%] left-[10%] h-20 w-12" style={{ color: RED }} />
            <Mustache className="absolute right-[12%] bottom-[16%] h-12 w-28" style={{ color: RED }} />
          </div>

          <Container>
            <div className="relative flex flex-col items-center justify-between gap-8 rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm md:flex-row">
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-heading mb-3 text-3xl text-white">Looking for Private Events?</h2>
                <p className="max-w-xl text-white/70">
                  We also host private team parties, corporate events, and group sessions. Get in touch to
                  reserve the facility for your group.
                </p>
              </div>
              <Button
                size="lg"
                className="font-heading border-2 border-white bg-white hover:bg-white/90"
                style={{ color: RED }}
                asChild
              >
                <Link href="/contact">Inquire About Private Events</Link>
              </Button>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
