import Image from "next/image";
import Link from "next/link";
import { Creepster, Luckiest_Guy } from "next/font/google";
import {
  CalendarDays,
  Clock,
  MapPin,
  Ghost,
  Skull,
  Candy,
  Moon,
  Sparkles,
  Download,
  CheckCircle2,
  Users,
  Ticket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { CalPopupButton } from "@/components/ui/cal-embed";
import { siteConfig } from "@/config/site";
import { activityIcons, type RecurringEvent } from "@/data/events";

// Flyer-inspired display fonts
const creepster = Creepster({ subsets: ["latin"], weight: "400", display: "swap" });
const luckiest = Luckiest_Guy({ subsets: ["latin"], weight: "400", display: "swap" });

// Palette pulled from the printed flyer
const ink = "#1B1A17"; // near-black background
const inkSoft = "#262420"; // slightly lifted panels
const pumpkin = "#F26B1D";
const pumpkinDeep = "#C9530F";
const slime = "#B5D334";
const cream = "#EFE3C3";
const creamMuted = "#B8AC8C";

// Speckled "old paper" texture used across the dark sections
const speckle = `radial-gradient(rgba(239,227,195,0.16) 0.8px, transparent 0.9px), radial-gradient(rgba(239,227,195,0.09) 0.6px, transparent 0.8px)`;

function Floater({
  icon: Icon,
  className,
  color,
  size = 32,
}: {
  icon: LucideIcon;
  className?: string;
  color: string;
  size?: number;
}) {
  return (
    <Icon
      className={`pointer-events-none absolute ${className ?? ""}`}
      style={{ color, width: size, height: size }}
      strokeWidth={2.25}
      aria-hidden
    />
  );
}

// Outlined, drippy display text like the flyer headline
function DisplayText({
  children,
  color,
  className,
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        color,
        WebkitTextStroke: "0.035em " + cream,
        paintOrder: "stroke fill",
        textShadow: "0.05em 0.06em 0 rgba(0,0,0,0.55)",
      }}
    >
      {children}
    </span>
  );
}

export function HalloweenEventPage({ event }: { event: RecurringEvent }) {
  const tiers = event.tiers ?? [];
  const calConfig =
    event.calMonth || event.calDate
      ? { ...(event.calMonth && { month: event.calMonth }), ...(event.calDate && { date: event.calDate }) }
      : undefined;

  return (
    <>
      <Header />

      <main className="flex-1" style={{ backgroundColor: ink }}>
        {/* ---------------- Hero ---------------- */}
        <section
          className="relative overflow-hidden py-16 md:py-24"
          style={{
            backgroundColor: ink,
            backgroundImage: speckle,
            backgroundSize: "9px 9px, 23px 23px",
            backgroundPosition: "0 0, 4px 7px",
          }}
        >
          {/* Moon glow */}
          <div
            className="pointer-events-none absolute -top-32 right-[8%] h-96 w-96 rounded-full opacity-25 blur-3xl"
            style={{ background: pumpkin }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 left-[5%] h-96 w-96 rounded-full opacity-15 blur-3xl"
            style={{ background: slime }}
          />

          {/* Floating spooky bits */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <Floater icon={Ghost} color={cream} size={44} className="top-[12%] left-[4%] opacity-40 animate-pulse" />
            <Floater icon={Moon} color={cream} size={56} className="top-[8%] right-[6%] opacity-30" />
            <Floater icon={Skull} color={slime} size={30} className="bottom-[18%] left-[12%] opacity-40" />
            <Floater icon={Candy} color={pumpkin} size={30} className="top-[45%] left-[8%] opacity-40" />
            <Floater icon={Sparkles} color={slime} size={22} className="top-[22%] left-[38%] opacity-50" />
            <Floater icon={Sparkles} color={cream} size={18} className="bottom-[28%] right-[10%] opacity-50" />
            <Floater icon={Ghost} color={pumpkin} size={34} className="bottom-[12%] right-[22%] opacity-35" />
          </div>

          <Container className="relative z-10">
            <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <div className="min-w-0 text-center lg:text-left">
                {/* Date pill */}
                <div className="mb-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  <span
                    className={`${luckiest.className} inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-sm tracking-wide uppercase`}
                    style={{ borderColor: slime, color: slime, backgroundColor: "rgba(181,211,52,0.08)" }}
                  >
                    <CalendarDays className="h-4 w-4" />
                    {event.dayOfWeek}, {event.date}
                  </span>
                  <span
                    className={`${luckiest.className} inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-sm tracking-wide uppercase`}
                    style={{ borderColor: pumpkin, color: pumpkin, backgroundColor: "rgba(242,107,29,0.08)" }}
                  >
                    <Ghost className="h-4 w-4" />
                    Parents&apos; night off
                  </span>
                  {event.audience && (
                    <span
                      className={`${luckiest.className} inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 text-sm tracking-wide uppercase`}
                      style={{ borderColor: cream, color: cream, backgroundColor: "rgba(239,227,195,0.08)" }}
                    >
                      <Users className="h-4 w-4" />
                      {event.audience}
                    </span>
                  )}
                </div>

                {/* Headline */}
                <h1 className={`${creepster.className} animate-slide-up leading-[0.9] tracking-wide`}>
                  <DisplayText color={slime} className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                    Kids
                  </DisplayText>
                  <DisplayText color={pumpkin} className="block text-[3.25rem] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
                    Halloween
                  </DisplayText>
                  <DisplayText color={slime} className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    Bash
                  </DisplayText>
                </h1>

                {/* Times, flyer-style */}
                <div
                  className={`${luckiest.className} animate-slide-up animation-delay-100 mt-7 space-y-1 text-xl tracking-wide uppercase sm:text-2xl md:text-3xl`}
                  style={{ color: slime }}
                >
                  <p>{event.dropOff} Drop-Off</p>
                  <p>{event.pickUp} Pick-Up</p>
                </div>

                <p
                  className="animate-slide-up animation-delay-200 mx-auto mt-6 max-w-xl text-lg md:text-xl lg:mx-0"
                  style={{ color: cream }}
                >
                  {event.tagline}
                </p>

                <p
                  className={`${luckiest.className} animate-slide-up animation-delay-200 mt-6 text-sm tracking-wider uppercase sm:text-base md:text-lg`}
                  style={{ color: pumpkin }}
                >
                  Costume Contest · Mummy Wrap Relay · Pumpkin Decorating · Food · Drinks · Kid-Friendly Scary Movie
                </p>

                {/* Hero CTA */}
                <div className="animate-slide-up animation-delay-400 mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <a
                    href="#tickets"
                    className={`${luckiest.className} inline-flex h-14 items-center justify-center gap-3 rounded-full border-4 px-7 text-lg tracking-wide uppercase transition-transform hover:scale-105 sm:h-16 sm:px-10 sm:text-xl`}
                    style={{
                      backgroundColor: pumpkin,
                      borderColor: cream,
                      color: ink,
                      boxShadow: "0 10px 30px rgba(242,107,29,0.45)",
                    }}
                  >
                    <Ticket className="h-6 w-6" />
                    Get Tickets · from ${tiers[0]?.price ?? event.pricing.perChild}
                  </a>
                  <span className="text-sm" style={{ color: creamMuted }}>
                    1 child $50 · 2 kids $60 · 3 kids $70
                  </span>
                </div>
              </div>

              {/* Flyer */}
              <div className="relative mx-auto w-full min-w-0 max-w-sm lg:max-w-md">
                <div
                  className="rotate-2 rounded-2xl p-3 shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-transform hover:rotate-0"
                  style={{ backgroundColor: cream }}
                >
                  {event.flyer && (
                    <Image
                      src={event.flyer.src}
                      alt={event.flyer.alt}
                      width={event.flyer.width}
                      height={event.flyer.height}
                      className="h-auto w-full rounded-lg"
                      priority
                      sizes="(max-width: 1024px) 90vw, 420px"
                    />
                  )}
                </div>
                {event.flyer && (
                  <a
                    href={event.flyer.src}
                    download
                    className={`${luckiest.className} mt-5 inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 text-sm tracking-wide uppercase transition-colors hover:bg-white/5`}
                    style={{ borderColor: creamMuted, color: cream }}
                  >
                    <Download className="h-4 w-4" />
                    Download the flyer
                  </a>
                )}
                <Ghost
                  className="absolute -top-7 -left-6 z-10 h-16 w-16 drop-shadow-lg"
                  style={{ color: cream }}
                  strokeWidth={2.25}
                  aria-hidden
                />
              </div>
            </div>
          </Container>
        </section>

        {/* ---------------- Tickets ---------------- */}
        <Section
          id="tickets"
          className="relative overflow-hidden scroll-mt-24"
          style={{ backgroundColor: inkSoft, borderTop: `4px solid ${pumpkin}` }}
        >
          <Container>
            <div className="mb-10 text-center">
              <p
                className={`${luckiest.className} mb-2 text-sm tracking-[0.2em] uppercase`}
                style={{ color: slime }}
              >
                Tickets
              </p>
              <h2
                className={`${creepster.className} text-5xl tracking-wide md:text-6xl`}
                style={{ color: pumpkin }}
              >
                Pick Your Ticket
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: cream }}>
                Bringing more than one kid? Choose the option that matches how many you&apos;re
                bringing. <strong style={{ color: slime }}>One checkout covers all of them</strong> —
                no add-ons, no extra steps.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {tiers.map((tier) => {
                const accent = tier.popular ? slime : pumpkin;
                return (
                  <div
                    key={tier.calEventSlug}
                    className="relative flex flex-col rounded-3xl border-4 p-6 text-center shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-1 md:p-8"
                    style={{ backgroundColor: ink, borderColor: accent }}
                  >
                    {tier.popular && (
                      <span
                        className={`${luckiest.className} absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs tracking-wider uppercase`}
                        style={{ backgroundColor: slime, color: ink }}
                      >
                        Most popular
                      </span>
                    )}

                    <div className="mb-4 flex items-center justify-center gap-1" style={{ color: accent }}>
                      {Array.from({ length: tier.kids }).map((_, i) => (
                        <Ghost key={i} className="h-7 w-7" strokeWidth={2.25} aria-hidden />
                      ))}
                    </div>

                    <p
                      className={`${luckiest.className} text-2xl tracking-wide uppercase`}
                      style={{ color: cream }}
                    >
                      {tier.label}
                    </p>
                    <p className={`${luckiest.className} my-2 text-6xl`} style={{ color: accent }}>
                      ${tier.price}
                    </p>
                    <p className="text-sm" style={{ color: creamMuted }}>
                      {tier.note ?? "Everything included"}
                    </p>

                    <div className="mt-6">
                      <CalPopupButton
                        eventType={tier.calEventSlug}
                        config={calConfig}
                        className={`${luckiest.className} flex h-14 w-full items-center justify-center gap-2 rounded-full text-lg tracking-wide uppercase transition-transform hover:scale-[1.03]`}
                        style={{
                          backgroundColor: accent,
                          color: ink,
                          boxShadow: `0 8px 24px ${tier.popular ? "rgba(181,211,52,0.35)" : "rgba(242,107,29,0.35)"}`,
                        }}
                      >
                        <Ticket className="h-5 w-5" />
                        Book {tier.kids === 1 ? "1 Child" : `${tier.kids} Kids`} · ${tier.price}
                      </CalPopupButton>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-3 rounded-2xl border p-5 text-center text-sm sm:flex-row sm:text-left"
              style={{ borderColor: "rgba(239,227,195,0.18)", color: creamMuted }}
            >
              <Users className="h-6 w-6 shrink-0" style={{ color: slime }} />
              <p>
                The 2-kid and 3-kid tickets are for siblings from the same family. You&apos;ll enter
                each child&apos;s name and age at checkout, and one confirmation email covers everyone.
                Spots are limited, so grab yours early.
              </p>
            </div>
          </Container>
        </Section>

        {/* ---------------- Details ---------------- */}
        <Section
          className="relative overflow-hidden"
          style={{
            backgroundColor: ink,
            backgroundImage: speckle,
            backgroundSize: "9px 9px, 23px 23px",
          }}
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {/* What to expect */}
              <div>
                <p
                  className={`${luckiest.className} mb-2 text-sm tracking-[0.2em] uppercase`}
                  style={{ color: slime }}
                >
                  The Night
                </p>
                <h2
                  className={`${creepster.className} mb-5 text-5xl tracking-wide`}
                  style={{ color: pumpkin }}
                >
                  What&apos;s Happening
                </h2>
                <p className="mb-8 text-lg leading-relaxed" style={{ color: cream }}>
                  {event.description}
                </p>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {event.activities.map((activity) => {
                    const Icon = activityIcons[activity.icon];
                    return (
                      <li
                        key={activity.label}
                        className="flex items-center gap-3 rounded-2xl border p-4"
                        style={{ borderColor: "rgba(239,227,195,0.18)", backgroundColor: inkSoft }}
                      >
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: pumpkin }}
                        >
                          {Icon && <Icon className="h-5 w-5" style={{ color: ink }} strokeWidth={2.25} />}
                        </span>
                        <span className={`${luckiest.className} text-base tracking-wide uppercase`} style={{ color: cream }}>
                          {activity.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {event.requirements?.length && (
                  <div
                    className="mt-6 rounded-2xl border-2 p-6"
                    style={{ borderColor: slime, backgroundColor: "rgba(181,211,52,0.06)" }}
                  >
                    <p
                      className={`${luckiest.className} mb-3 text-sm tracking-[0.2em] uppercase`}
                      style={{ color: slime }}
                    >
                      Good to know
                    </p>
                    <ul className="space-y-2.5">
                      {event.audience && (
                        <li className="flex items-start gap-3 font-semibold" style={{ color: cream }}>
                          <Users className="mt-0.5 h-5 w-5 shrink-0" style={{ color: slime }} />
                          <span>{event.audience} — activities work for little kids and big kids alike</span>
                        </li>
                      )}
                      {event.requirements.map((item) => (
                        <li key={item} className="flex items-start gap-3" style={{ color: cream }}>
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: slime }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* When / where card */}
              <div className="relative">
                <Skull
                  className="absolute -top-5 -right-3 z-10 h-14 w-14 drop-shadow-lg"
                  style={{ color: slime }}
                  strokeWidth={2.25}
                  aria-hidden
                />
                <div
                  className="rounded-3xl border-4 p-6 md:p-8"
                  style={{ borderColor: pumpkin, backgroundColor: cream, color: ink }}
                >
                  <p
                    className={`${luckiest.className} mb-6 text-sm tracking-[0.2em] uppercase`}
                    style={{ color: pumpkinDeep }}
                  >
                    Event Details
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: pumpkin }}
                      >
                        <CalendarDays className="h-6 w-6" style={{ color: ink }} />
                      </span>
                      <div>
                        <p className={`${luckiest.className} text-lg tracking-wide uppercase`}>When</p>
                        <p className="text-lg">
                          {event.dayOfWeek}, {event.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: pumpkin }}
                      >
                        <Clock className="h-6 w-6" style={{ color: ink }} />
                      </span>
                      <div>
                        <p className={`${luckiest.className} text-lg tracking-wide uppercase`}>Time</p>
                        <div className="flex gap-8">
                          <div>
                            <span className="text-xs font-bold uppercase opacity-60">Drop Off</span>
                            <p className="text-lg font-semibold">{event.dropOff}</p>
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase opacity-60">Pick Up</span>
                            <p className="text-lg font-semibold">{event.pickUp}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: pumpkin }}
                      >
                        <MapPin className="h-6 w-6" style={{ color: ink }} />
                      </span>
                      <div>
                        <p className={`${luckiest.className} text-lg tracking-wide uppercase`}>Where</p>
                        <p className="text-lg">{event.location}</p>
                        <p className="text-sm opacity-70">
                          {event.addressLine1}, {event.addressLine2}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t pt-6" style={{ borderColor: "rgba(27,26,23,0.15)" }}>
                    <a
                      href="#tickets"
                      className={`${luckiest.className} flex h-14 w-full items-center justify-center gap-2 rounded-full text-lg tracking-wide uppercase transition-transform hover:scale-[1.02]`}
                      style={{ backgroundColor: ink, color: slime }}
                    >
                      <Ticket className="h-5 w-5" />
                      Reserve a Spot
                    </a>
                    <p className="mt-4 text-center text-sm opacity-70">
                      Questions? Call{" "}
                      <a href={`tel:${siteConfig.contact.phoneRaw}`} className="font-semibold underline">
                        {siteConfig.contact.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* ---------------- Private Events ---------------- */}
        <Section
          className="relative overflow-hidden"
          style={{ backgroundColor: pumpkin, color: ink }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <Ghost className="absolute top-[20%] left-[10%] h-20 w-20" />
            <Skull className="absolute right-[15%] bottom-[10%] h-16 w-16" />
          </div>

          <Container>
            <div
              className="relative flex flex-col items-center justify-between gap-8 rounded-2xl border-2 p-8 md:flex-row"
              style={{ borderColor: "rgba(27,26,23,0.25)", backgroundColor: "rgba(239,227,195,0.25)" }}
            >
              <div className="flex-1 text-center md:text-left">
                <h2 className={`${luckiest.className} mb-3 text-3xl tracking-wide uppercase`}>
                  Looking for Private Events?
                </h2>
                <p className="max-w-xl opacity-80">
                  We also host private team parties, corporate events, and group sessions. Get in
                  touch to reserve the facility for your group.
                </p>
              </div>
              <Button
                size="lg"
                className={`${luckiest.className} border-2 tracking-wide uppercase hover:opacity-90`}
                style={{ backgroundColor: ink, borderColor: ink, color: cream }}
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
