import Image from "next/image";
import Link from "next/link";
import { Fredoka } from "next/font/google";
import {
  CalendarDays,
  Clock,
  MapPin,
  Info,
  Heart,
  Flower2,
  TreePine,
  Sun,
  Waves,
  IceCream,
  Trophy,
  Medal,
  Zap,
  Star,
  Users,
  Download,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
import { activityIcons, type RecurringEvent } from "@/data/events";

// Playful rounded display font (used by flyer-style events)
const fredoka = Fredoka({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });

// Rainbow lettering with a white outline, like the printed flyer
function RainbowText({
  text,
  colors,
  className,
}: {
  text: string;
  colors: string[];
  className?: string;
}) {
  let i = 0;
  return (
    <span className={className} aria-label={text}>
      {text.replace(/-/g, "\u2011").split("").map((ch, idx) => {
        if (ch === " ") return <span key={idx}> </span>;
        const color = colors[i++ % colors.length];
        return (
          <span
            key={idx}
            aria-hidden
            style={{
              color,
              WebkitTextStroke: "0.09em white",
              paintOrder: "stroke fill",
              textShadow: "0.06em 0.08em 0 rgba(0,0,0,0.18)",
            }}
          >
            {ch}
          </span>
        );
      })}
    </span>
  );
}

// Floating icon component for decorations
function FloatingIcon({
  icon: Icon,
  className,
  size = "md",
  filled = true,
  style,
}: {
  icon: LucideIcon;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  filled?: boolean;
  style?: React.CSSProperties;
}) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
    xl: "h-16 w-16",
  };

  return <Icon className={`${sizes[size]} ${filled ? "fill-current" : ""} ${className}`} style={style} />;
}

// Theme configuration for each event type
interface EventThemeConfig {
  heroIcon: LucideIcon;
  decorationIcons: [LucideIcon, LucideIcon, LucideIcon, LucideIcon];
  heroBgColor: string;
  burstColors: [string, string];
  gradientDark: string;
  patternSvg: string;
  headingColor: string;
  textColor: string;
  ctaBorderColor: string;
  ctaBgColor: string;
  ctaHoverBgColor: string;
  ctaShadowColor: string;
  ctaHoverShadowColor: string;
  footerTextColor: string;
  // Optional flyer-style extras
  playful?: boolean; // rounded display font + rainbow title
  heroBackground?: string; // CSS gradient overriding heroBgColor
  rainbow?: string[];
  bannerBackground?: string;
  darkCardColor?: string;
  accentCardColor?: string;
}

export function getThemeConfig(eventId: string): EventThemeConfig {
  if (eventId.startsWith("all-sports")) {
    return {
      heroIcon: Trophy,
      decorationIcons: [Trophy, Medal, Zap, Star],
      heroBgColor: "#EFF6FF",
      burstColors: ["#2563EB", "#93C5FD"],
      gradientDark: "#1E3A8A",
      patternSvg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='%232563EB'%3E%3Ccircle cx='12' cy='12' r='9' fill='none' stroke='%232563EB' stroke-width='2'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E")`,
      headingColor: "#1E3A8A",
      textColor: "#1D4ED8",
      ctaBorderColor: "#2563EB",
      ctaBgColor: "#2563EB",
      ctaHoverBgColor: "#1D4ED8",
      ctaShadowColor: "rgba(37,99,235,0.4)",
      ctaHoverShadowColor: "rgba(37,99,235,0.5)",
      footerTextColor: "#1D4ED8",
      playful: true,
      heroBackground: "linear-gradient(180deg, #FFD54A 0%, #F8B933 42%, #7CC242 68%, #5DB146 100%)",
      rainbow: ["#F7811E", "#FFC61B", "#6CBF3F", "#EE3D8B", "#2FA8E1"],
      bannerBackground: "linear-gradient(180deg, #38B6EA 0%, #1E8FD1 100%)",
      darkCardColor: "#4A4A4C",
      accentCardColor: "#EE3D8B",
    };
  }

  if (eventId.startsWith("spring")) {
    return {
      heroIcon: Flower2,
      decorationIcons: [Flower2, TreePine, Sun, Flower2],
      heroBgColor: "#F0FDF4",
      burstColors: ["#16A34A", "#86EFAC"],
      gradientDark: "#14532D",
      patternSvg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='%2316A34A'%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3Ccircle cx='12' cy='5' r='2'/%3E%3Ccircle cx='12' cy='19' r='2'/%3E%3Ccircle cx='5' cy='12' r='2'/%3E%3Ccircle cx='19' cy='12' r='2'/%3E%3C/svg%3E")`,
      headingColor: "#14532D",
      textColor: "#166534",
      ctaBorderColor: "#16A34A",
      ctaBgColor: "#16A34A",
      ctaHoverBgColor: "#15803D",
      ctaShadowColor: "rgba(22,163,74,0.4)",
      ctaHoverShadowColor: "rgba(22,163,74,0.5)",
      footerTextColor: "#15803D",
    };
  }

  if (eventId.startsWith("summer")) {
    return {
      heroIcon: Sun,
      decorationIcons: [Sun, Waves, IceCream, Sun],
      heroBgColor: "#FFF7ED",
      burstColors: ["#EA580C", "#FDBA74"],
      gradientDark: "#7C2D12",
      patternSvg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='%23EA580C'%3E%3Ccircle cx='12' cy='12' r='5'/%3E%3Cline x1='12' y1='1' x2='12' y2='4' stroke='%23EA580C' stroke-width='2'/%3E%3Cline x1='12' y1='20' x2='12' y2='23' stroke='%23EA580C' stroke-width='2'/%3E%3C/svg%3E")`,
      headingColor: "#7C2D12",
      textColor: "#9A3412",
      ctaBorderColor: "#EA580C",
      ctaBgColor: "#EA580C",
      ctaHoverBgColor: "#C2410C",
      ctaShadowColor: "rgba(234,88,12,0.4)",
      ctaHoverShadowColor: "rgba(234,88,12,0.5)",
      footerTextColor: "#C2410C",
    };
  }

  // Valentine's (default)
  return {
    heroIcon: Heart,
    decorationIcons: [Heart, Heart, Heart, Heart],
    heroBgColor: "#FDF2F4",
    burstColors: ["#E11D48", "#FDA4AF"],
    gradientDark: "#881337",
    patternSvg: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='%23E11D48'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`,
    headingColor: "#881337",
    textColor: "#BE123C",
    ctaBorderColor: "#E11D48",
    ctaBgColor: "#E11D48",
    ctaHoverBgColor: "#BE123C",
    ctaShadowColor: "rgba(225,29,72,0.4)",
    ctaHoverShadowColor: "rgba(225,29,72,0.5)",
    footerTextColor: "#BE123C",
  };
}

// Color classes for floating decorations per theme
function getDecorationColors(eventId: string): string[] {
  if (eventId.startsWith("all-sports")) {
    return [
      "text-blue-400 opacity-60",
      "text-sky-500 opacity-50",
      "text-blue-300 opacity-40",
      "text-sky-600 opacity-50",
      "text-blue-400 opacity-30",
      "text-sky-500 opacity-40",
      "text-blue-400 opacity-50",
      "text-sky-500 opacity-60",
    ];
  }
  if (eventId.startsWith("spring")) {
    return [
      "text-green-400 opacity-60",
      "text-emerald-500 opacity-50",
      "text-green-300 opacity-40",
      "text-emerald-600 opacity-50",
      "text-green-400 opacity-30",
      "text-emerald-500 opacity-40",
      "text-green-400 opacity-50",
      "text-emerald-500 opacity-60",
    ];
  }
  if (eventId.startsWith("summer")) {
    return [
      "text-orange-400 opacity-60",
      "text-amber-500 opacity-50",
      "text-orange-300 opacity-40",
      "text-amber-600 opacity-50",
      "text-orange-400 opacity-30",
      "text-amber-500 opacity-40",
      "text-orange-400 opacity-50",
      "text-amber-500 opacity-60",
    ];
  }
  // Valentine's
  return [
    "text-rose-400 opacity-60",
    "text-rose-500 opacity-50",
    "text-rose-300 opacity-40",
    "text-rose-600 opacity-50",
    "text-rose-400 opacity-30",
    "text-rose-500 opacity-40",
    "text-rose-400 opacity-50",
    "text-rose-500 opacity-60",
  ];
}

export function EventPage({ event }: { event: RecurringEvent }) {
  const theme = getThemeConfig(event.id);
  const colors = getDecorationColors(event.id);
  const HeroIcon = theme.heroIcon;
  const DecIcons = theme.decorationIcons;

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden py-16 md:py-24"
          style={{
            backgroundColor: theme.heroBgColor,
            backgroundImage: theme.heroBackground,
          }}
        >
          {/* Sunburst Background Pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                repeating-conic-gradient(
                  from 0deg at 50% 0%,
                  ${theme.burstColors[0]} 0deg 10deg,
                  ${theme.burstColors[1]} 10deg 20deg
                )
              `,
              maskImage: "radial-gradient(ellipse at top, black 0%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at top, black 0%, transparent 70%)",
            }}
          />

          {/* Floating Decorations */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <FloatingIcon
              icon={DecIcons[0]}
              className={`absolute top-[15%] left-[5%] animate-pulse ${colors[0]}`}
              size="lg"
            />
            <FloatingIcon
              icon={DecIcons[1]}
              className={`absolute top-[10%] right-[8%] ${colors[1]}`}
              size="xl"
            />
            <FloatingIcon
              icon={DecIcons[2]}
              className={`absolute bottom-[20%] left-[15%] ${colors[2]}`}
              size="md"
            />
            <FloatingIcon
              icon={DecIcons[3]}
              className={`absolute right-[12%] bottom-[25%] ${colors[3]}`}
              size="lg"
            />
            <FloatingIcon
              icon={DecIcons[0]}
              className={`absolute top-[5%] left-[40%] ${colors[4]}`}
              size="sm"
            />
            <FloatingIcon
              icon={DecIcons[1]}
              className={`absolute top-[20%] right-[30%] ${colors[5]}`}
              size="md"
            />
            <FloatingIcon
              icon={DecIcons[2]}
              className={`absolute top-[50%] left-[8%] ${colors[6]}`}
              size="md"
              filled={false}
            />
            <FloatingIcon
              icon={DecIcons[3]}
              className={`absolute top-[45%] right-[5%] ${colors[7]}`}
              size="lg"
            />
          </div>

          {/* Decorative Dots */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-[30%] left-[20%] h-3 w-3 rounded-full bg-white opacity-80" />
            <div className="absolute top-[15%] right-[25%] h-4 w-4 rounded-full bg-white opacity-70" />
            <div className="absolute bottom-[35%] left-[30%] h-2 w-2 rounded-full bg-white opacity-90" />
            <div className="absolute right-[15%] bottom-[40%] h-3 w-3 rounded-full bg-white opacity-60" />
          </div>

          <Container className="relative z-10">
            <div
              className={
                event.flyer
                  ? "grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
                  : ""
              }
            >
              <div className={event.flyer ? "text-center lg:text-left" : "text-center"}>
                <div
                  className={`mb-6 flex flex-wrap items-center gap-2 ${
                    event.flyer ? "justify-center lg:justify-start" : "justify-center"
                  }`}
                >
                  <Badge
                    className="animate-slide-down border-2 bg-white/90 hover:bg-white"
                    style={{ borderColor: theme.burstColors[1], color: event.theme?.primary }}
                  >
                    <HeroIcon
                      className="mr-2 h-4 w-4 fill-current"
                      style={{ color: event.theme?.primary }}
                    />
                    {event.dayOfWeek}, {event.date}
                    <span className="hidden sm:inline">
                      {" "}· {event.dropOff}–{event.pickUp}
                    </span>
                  </Badge>
                  {event.audience && (
                    <Badge
                      className="animate-slide-down border-2 border-white text-white"
                      style={{ backgroundColor: theme.accentCardColor || theme.gradientDark }}
                    >
                      <ShieldCheck className="mr-1.5 h-4 w-4" />
                      {event.audience}
                    </Badge>
                  )}
                </div>

                <h1
                  className={`animate-slide-up mb-4 text-5xl leading-[1.05] md:text-6xl lg:text-7xl ${
                    theme.playful ? fredoka.className + " font-bold tracking-tight" : "font-heading"
                  }`}
                  style={theme.playful ? undefined : { color: theme.headingColor }}
                >
                  {theme.playful && theme.rainbow ? (
                    <RainbowText text={event.name} colors={theme.rainbow} />
                  ) : (
                    event.name
                  )}
                </h1>

                <p
                  className={`animate-slide-up animation-delay-100 mb-6 text-2xl md:text-3xl ${
                    theme.playful ? fredoka.className + " font-semibold text-white drop-shadow-md" : "font-heading"
                  }`}
                  style={theme.playful ? undefined : { color: event.theme?.primary }}
                >
                  {event.subtitle}
                </p>

                <p
                  className={`animation-delay-200 animate-slide-up max-w-2xl text-lg md:text-xl ${
                    event.flyer ? "mx-auto lg:mx-0" : "mx-auto"
                  }`}
                  style={{ color: theme.playful ? "#1F2937" : `${theme.textColor}CC` }}
                >
                  {event.tagline}
                </p>

                {/* Price cloud (flyer style) */}
                {theme.playful && (
                  <div
                    className={`animate-slide-up animation-delay-200 mt-8 inline-flex -rotate-2 items-center gap-4 rounded-[2.5rem] bg-white px-7 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)] ${fredoka.className}`}
                  >
                    <div className="text-center leading-none">
                      <div className="text-4xl font-bold" style={{ color: "#1F2937" }}>
                        ${event.pricing.perChild}
                      </div>
                      <div className="mt-1 text-xs font-semibold tracking-wide uppercase text-gray-600">
                        {event.pricing.description}
                      </div>
                    </div>
                    {event.addOn && (
                      <>
                        <div className="h-10 w-px bg-gray-200" />
                        <div className="text-center leading-none">
                          <div className="text-3xl font-bold" style={{ color: event.theme?.primary }}>
                            +${event.addOn.price}
                          </div>
                          <div className="mt-1 text-xs font-semibold tracking-wide uppercase text-gray-600">
                            each additional
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* CTA Button */}
                <div className="animate-slide-up animation-delay-400 mt-8">
                  <CalPopupButton
                    eventType={event.calEventSlug}
                    className={`inline-flex h-16 items-center justify-center gap-3 rounded-full border-4 border-white px-12 text-xl text-white transition-all hover:scale-105 ${
                      theme.playful ? fredoka.className + " font-bold" : "font-heading"
                    }`}
                    style={{
                      backgroundColor: theme.ctaBgColor,
                      boxShadow: `0 8px 30px ${theme.ctaShadowColor}`,
                    }}
                  >
                    <HeroIcon className="h-6 w-6 fill-current" />
                    {theme.playful ? "Sign Up" : `Book Now - $${event.pricing.perChild}`}
                    {!theme.playful && (event.addOn ? " first child" : "/child")}
                  </CalPopupButton>
                  {event.addOn && !theme.playful && (
                    <p
                      className="animate-slide-up animation-delay-400 mt-4 text-base font-semibold md:text-lg"
                      style={{ color: theme.textColor }}
                    >
                      + ${event.addOn.price} {event.addOn.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Hero visual: flyer (polaroid style) or photo */}
              {event.flyer ? (
                <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
                  <div className="rotate-2 rounded-2xl bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-transform hover:rotate-0">
                    <Image
                      src={event.flyer.src}
                      alt={event.flyer.alt}
                      width={event.flyer.width}
                      height={event.flyer.height}
                      className="h-auto w-full rounded-lg"
                      priority
                      sizes="(max-width: 1024px) 90vw, 420px"
                    />
                  </div>
                  <a
                    href={event.flyer.src}
                    download
                    className={`mt-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-sm font-semibold shadow hover:bg-white ${fredoka.className}`}
                    style={{ color: theme.headingColor }}
                  >
                    <Download className="h-4 w-4" />
                    Download the flyer
                  </a>
                  <FloatingIcon
                    icon={HeroIcon}
                    className="absolute -top-6 -left-6 z-10 drop-shadow-lg"
                    size="xl"
                    style={{ color: event.theme?.primary }}
                  />
                </div>
              ) : (
                <div className="relative mx-auto mt-12 max-w-2xl">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
                    <Image
                      src={images.birthday.DSC00995}
                      alt="Kids having fun at New Ground"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, ${theme.headingColor}33, transparent)`,
                      }}
                    />
                  </div>
                  {/* Decorative icons around image */}
                  <FloatingIcon
                    icon={HeroIcon}
                    className="absolute -top-4 -left-6 z-10 drop-shadow-lg"
                    size="xl"
                    style={{ color: event.theme?.primary }}
                  />
                  <FloatingIcon
                    icon={HeroIcon}
                    className="absolute -right-4 -bottom-3 z-10 drop-shadow-lg"
                    size="lg"
                    style={{ color: `${event.theme?.primary}CC` }}
                  />
                </div>
              )}
            </div>
          </Container>

          {/* Bottom Cloud Effect */}
          <div
            className="absolute right-0 bottom-0 left-0 h-24"
            style={{
              background: "linear-gradient(to top, white 0%, transparent 100%)",
            }}
          />
        </section>

        {/* Featured Event Details */}
        <Section className="relative overflow-hidden bg-white">
          {/* Subtle pattern background */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: theme.patternSvg,
                backgroundSize: "60px 60px",
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
                    style={{
                      borderColor: event.theme?.primary,
                      color: event.theme?.primary,
                      backgroundColor: event.theme?.secondary,
                    }}
                  >
                    <HeroIcon className="mr-1 h-3 w-3 fill-current" />
                    NEXT EVENT
                  </Badge>
                </div>

                <h2 className="font-heading mb-2 text-3xl md:text-4xl">Event Details</h2>

                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  {event.description}
                </p>

                {/* Event Logistics Card */}
                <Card
                  className="flex flex-1 flex-col border-2 shadow-[6px_6px_0px_0px]"
                  style={{
                    backgroundColor: event.theme?.secondary || "#FFE4E6",
                    borderColor: event.theme?.primary,
                    boxShadow: `6px 6px 0px 0px ${event.theme?.primary}`,
                  }}
                >
                  <CardContent className="flex flex-1 flex-col p-6">
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: event.theme?.primary }}
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
                          style={{ backgroundColor: event.theme?.primary }}
                        >
                          <Clock className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-heading text-lg font-bold">TIME</h4>
                          <div className="flex gap-6">
                            <div>
                              <span className="text-xs font-bold uppercase opacity-70">
                                Drop Off
                              </span>
                              <p className="text-lg font-semibold">{event.dropOff}</p>
                            </div>
                            <div>
                              <span className="text-xs font-bold uppercase opacity-70">
                                Pick Up
                              </span>
                              <p className="text-lg font-semibold">{event.pickUp}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: event.theme?.primary }}
                        >
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-heading text-lg font-bold">WHERE</h4>
                          <p className="text-lg">{event.location}</p>
                          <p className="text-sm opacity-70">{event.addressLine1}</p>
                        </div>
                      </div>
                    </div>

                    {/* Footer text */}
                    <div className="mt-auto pt-4">
                      <p
                        className="text-center text-sm font-medium"
                        style={{ color: theme.footerTextColor }}
                      >
                        Spots are limited! Reserve yours today.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {(event.requirements?.length || event.audience) && (
                  <Card
                    className="mt-6 border-0 text-white shadow-lg"
                    style={{ backgroundColor: theme.darkCardColor || theme.gradientDark }}
                  >
                    <CardContent className="p-6">
                      <p
                        className={`mb-3 text-xs font-bold tracking-wider uppercase ${
                          theme.playful ? fredoka.className : ""
                        }`}
                        style={{ color: theme.rainbow?.[1] || event.theme?.secondary }}
                      >
                        Good to know
                      </p>
                      <ul className="space-y-2.5">
                        {event.audience && (
                          <li className="flex items-start gap-3 font-semibold">
                            <ShieldCheck
                              className="mt-0.5 h-5 w-5 shrink-0"
                              style={{ color: theme.accentCardColor || theme.rainbow?.[3] }}
                            />
                            <span>{event.audience.charAt(0).toUpperCase() + event.audience.slice(1)}</span>
                          </li>
                        )}
                        {event.requirements?.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle2
                              className="mt-0.5 h-5 w-5 shrink-0"
                              style={{ color: theme.rainbow?.[2] || event.theme?.secondary }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right: Booking Card */}
              <div className="relative flex flex-col">
                {/* Decorative icons around booking card */}
                <FloatingIcon
                  icon={HeroIcon}
                  className="absolute -top-4 -left-4 z-20 opacity-70 drop-shadow-lg"
                  size="lg"
                  style={{ color: `${event.theme?.primary}B3` }}
                />
                <FloatingIcon
                  icon={HeroIcon}
                  className="absolute -right-2 -bottom-2 z-20 opacity-60 drop-shadow-lg"
                  size="xl"
                  style={{ color: event.theme?.primary }}
                />

                <Card
                  className="relative flex flex-1 flex-col overflow-hidden border-4 shadow-2xl"
                  style={{ borderColor: event.theme?.primary }}
                >
                  {/* Card Header with gradient */}
                  <div
                    className="relative p-8 text-center text-white"
                    style={{
                      background: `linear-gradient(135deg, ${event.theme?.primary} 0%, ${theme.gradientDark} 100%)`,
                    }}
                  >
                    <HeroIcon className="absolute top-4 left-4 h-6 w-6 fill-white/20 text-white/20" />
                    <HeroIcon className="absolute right-4 bottom-4 h-8 w-8 fill-white/10 text-white/10" />

                    <p className="mb-2 text-sm font-bold tracking-widest text-white/80 uppercase">
                      Reserve Your Spot
                    </p>
                    <p className={theme.playful ? `${fredoka.className} text-6xl font-bold` : "font-heading text-6xl"}>
                      ${event.pricing.perChild}
                    </p>
                    <p className="mt-1 text-sm font-medium tracking-wide text-white/90 uppercase">
                      {event.pricing.description}
                    </p>
                    {event.addOn && (
                      <p className="mt-3 inline-block rounded-full border border-white/40 bg-white/15 px-4 py-1 text-sm font-semibold">
                        + ${event.addOn.price} {event.addOn.description}
                      </p>
                    )}
                  </div>

                  <CardContent className="flex flex-1 flex-col p-6">
                    {/* What's Included */}
                    <p
                      className="mb-4 text-xs font-bold tracking-wider uppercase"
                      style={{ color: event.theme?.primary }}
                    >
                      What&apos;s Included
                    </p>
                    <ul className="mb-6 space-y-3">
                      {event.activities.map((activity, i) => {
                        const IconComponent = activityIcons[activity.icon];
                        return (
                          <li key={i} className="flex items-center gap-3">
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-full"
                              style={{ backgroundColor: event.theme?.secondary }}
                            >
                              {IconComponent && (
                                <IconComponent
                                  className="h-4 w-4"
                                  style={{ color: event.theme?.primary }}
                                />
                              )}
                            </div>
                            <span className="font-medium">{activity.label}</span>
                          </li>
                        );
                      })}
                    </ul>

                    {/* Primary CTA */}
                    <div className="mt-auto">
                      <CalPopupButton
                        eventType={event.calEventSlug}
                        className="font-heading flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 bg-white text-base shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                        style={{ borderColor: event.theme?.primary, color: event.theme?.primary }}
                      >
                        <HeroIcon className="h-4 w-4 fill-current" />
                        {event.addOn
                          ? `Book First Child - $${event.pricing.perChild}`
                          : `Book Now - $${event.pricing.perChild}/child`}
                      </CalPopupButton>

                      {event.addOn && (
                        <>
                          <CalPopupButton
                            eventType={event.addOn.calEventSlug}
                            className="font-heading mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full border-2 border-dashed bg-white text-base transition-all hover:scale-[1.02] hover:shadow-md"
                            style={{
                              borderColor: event.theme?.primary,
                              color: event.theme?.primary,
                              backgroundColor: event.theme?.secondary,
                            }}
                          >
                            <Users className="h-4 w-4" />
                            Add a Sibling - ${event.addOn.price}
                          </CalPopupButton>
                          {event.addOn.note && (
                            <p className="text-muted-foreground mt-2 text-center text-xs">
                              {event.addOn.note}
                            </p>
                          )}
                        </>
                      )}

                      <p className="text-muted-foreground mt-4 text-center text-sm">
                        Questions? Call{" "}
                        <a
                          href={`tel:${siteConfig.contact.phoneRaw}`}
                          className="font-medium hover:underline"
                          style={{ color: event.theme?.primary }}
                        >
                          {siteConfig.contact.phone}
                        </a>
                      </p>

                      <p className="text-muted-foreground mt-3 text-center text-xs">
                        <Info className="mr-1 inline h-3 w-3" />
                        {event.addOn
                          ? "One booking per child. Spots limited!"
                          : "Select number of children at checkout. Spots limited!"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* How to book multiple kids */}
        {event.addOn?.steps && (
          <Section className="bg-white pt-0">
            <Container>
              <div
                className="rounded-3xl border-2 p-6 md:p-10"
                style={{
                  borderColor: event.theme?.primary,
                  backgroundColor: event.theme?.secondary,
                }}
              >
                <div className="mb-8 text-center">
                  <p
                    className={`mb-2 text-xs font-bold tracking-wider uppercase ${
                      theme.playful ? fredoka.className : ""
                    }`}
                    style={{ color: event.theme?.primary }}
                  >
                    Booking 2 or more kids?
                  </p>
                  <h2
                    className={`text-3xl md:text-4xl ${
                      theme.playful ? fredoka.className + " font-bold" : "font-heading"
                    }`}
                    style={{ color: theme.headingColor }}
                  >
                    Here&apos;s how it works
                  </h2>
                  <p className="text-muted-foreground mx-auto mt-2 max-w-2xl">
                    Each child is booked separately so we get every kid&apos;s name and can count
                    spots. It only takes a minute per child.
                  </p>
                </div>

                <ol className="grid gap-5 md:grid-cols-3">
                  {event.addOn.steps.map((step, i) => {
                    const tileColor =
                      theme.rainbow?.[[0, 3, 2][i] ?? i] || event.theme?.primary || "#2563EB";
                    return (
                      <li
                        key={step.title}
                        className="flex flex-col rounded-2xl bg-white p-6 shadow-md"
                      >
                        <div
                          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full text-2xl font-bold text-white ${
                            theme.playful ? fredoka.className : "font-heading"
                          }`}
                          style={{ backgroundColor: tileColor }}
                        >
                          {i + 1}
                        </div>
                        <h3
                          className={`mb-2 text-xl ${
                            theme.playful ? fredoka.className + " font-semibold" : "font-heading"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {step.detail}
                        </p>
                      </li>
                    );
                  })}
                </ol>

                {event.addOn.example && (
                  <p
                    className="mt-6 rounded-full bg-white/80 px-5 py-3 text-center text-sm font-semibold"
                    style={{ color: theme.headingColor }}
                  >
                    {event.addOn.example}
                  </p>
                )}

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <CalPopupButton
                    eventType={event.calEventSlug}
                    className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-base text-white shadow-lg transition-all hover:scale-[1.02] ${
                      theme.playful ? fredoka.className + " font-bold" : "font-heading"
                    }`}
                    style={{ backgroundColor: theme.ctaBgColor }}
                  >
                    <HeroIcon className="h-4 w-4 fill-current" />
                    Book First Child - ${event.pricing.perChild}
                  </CalPopupButton>
                  <CalPopupButton
                    eventType={event.addOn.calEventSlug}
                    className={`inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-dashed bg-white px-8 text-base transition-all hover:scale-[1.02] ${
                      theme.playful ? fredoka.className + " font-bold" : "font-heading"
                    }`}
                    style={{ borderColor: event.theme?.primary, color: event.theme?.primary }}
                  >
                    <Users className="h-4 w-4" />
                    Add a Sibling - ${event.addOn.price}
                  </CalPopupButton>
                </div>
              </div>
            </Container>
          </Section>
        )}

        {/* Private Events Banner */}
        <Section
          className="relative overflow-hidden text-white"
          style={{ backgroundColor: event.theme?.primary, backgroundImage: theme.bannerBackground }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <HeroIcon className="absolute top-[20%] left-[10%] h-20 w-20 fill-current" />
            <HeroIcon className="absolute right-[15%] bottom-[10%] h-16 w-16 fill-current" />
          </div>

          <Container>
            <div className="relative flex flex-col items-center justify-between gap-8 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm md:flex-row">
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-heading mb-3 text-3xl">Looking for Private Events?</h2>
                <p className="max-w-xl text-white/80">
                  We also host private team parties, corporate events, and group sessions. Get in
                  touch to reserve the facility for your group.
                </p>
              </div>
              <Button
                size="lg"
                className="font-heading border-2 border-white bg-white hover:bg-white/90"
                style={{ color: event.theme?.primary }}
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
