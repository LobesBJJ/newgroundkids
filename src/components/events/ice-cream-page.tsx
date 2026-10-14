import Image from "next/image";
import { League_Gothic, Sacramento, Montserrat } from "next/font/google";
import { CalendarDays, Clock, MapPin, Download, IceCream, Shield, Users, Gift, FileSignature, DoorOpen } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import type { RecurringEvent } from "@/data/events";
import { IceCreamSignupForm } from "./ice-cream-signup-form";

// Fonts matched to the printed flyer
const gothic = League_Gothic({ subsets: ["latin"], weight: "400", display: "swap" });
const script = Sacramento({ subsets: ["latin"], weight: "400", display: "swap" });
const sans = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

// New Ground palette
const navy = "#1D3557";
const red = "#E63946";
const redText = "#B8202E";
const cyan = "#A8DADC";
const cyanDeep = "#86C3C6";
const honeydew = "#F1FAEE";
const steel = "#457B9D";

// Tiny repeating cone pattern, like the flyer background
const conePattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='104' viewBox='0 0 96 104'%3E%3Cg transform='translate(10 8) rotate(-14 20 32)'%3E%3Cpolygon points='8,26 32,26 20,62' fill='%2386C3C6'/%3E%3Cpath d='M5 25 C3 10 12 3 20 3 C28 3 37 10 35 25 C33 29 30 25 28 28 C26 32 22 29 20 28 C17 31 13 31 12 28 C10 30 6 29 5 25 Z' fill='%23C9E8E9'/%3E%3C/g%3E%3Cg transform='translate(58 58) rotate(16 20 32)'%3E%3Cpolygon points='8,26 32,26 20,62' fill='%2386C3C6'/%3E%3Cpath d='M5 25 C3 10 12 3 20 3 C28 3 37 10 35 25 C33 29 30 25 28 28 C26 32 22 29 20 28 C17 31 13 31 12 28 C10 30 6 29 5 25 Z' fill='%23C9E8E9'/%3E%3C/g%3E%3C/svg%3E")`;

const plan = [
  { icon: Shield, title: "Learn jiu jitsu", text: "A kid-friendly class with our coaches. No experience needed." },
  { icon: Users, title: "Meet new friends", text: "Partner games and team challenges on the mats." },
  { icon: IceCream, title: "Ice cream to finish", text: "Everyone celebrates with ice cream at the end." },
];

const steps = [
  {
    icon: Users,
    title: "Invite a friend",
    text: "Pick a friend who doesn't train jiu jitsu. That's the one rule.",
  },
  {
    icon: FileSignature,
    title: "Sign them up below",
    text: "We email the waiver link to your friend's parent. They sign it on their phone in about 2 minutes.",
  },
  {
    icon: DoorOpen,
    title: "Come on January 23",
    text: "Arrive at 2 PM and check in at the front desk.",
  },
];

export function IceCreamEventPage({ event }: { event: RecurringEvent }) {
  return (
    <>
      <Header />

      <main className={`${sans.className} flex-1`} style={{ color: navy }}>
        {/* ---------------- Hero ---------------- */}
        <section
          className="relative overflow-hidden py-14 md:py-20"
          style={{ backgroundColor: cyan, backgroundImage: conePattern, backgroundSize: "96px 104px" }}
        >
          <Container className="relative z-10">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div className="min-w-0 text-center lg:text-left">
                <div className="mb-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold tracking-wider text-white uppercase"
                    style={{ backgroundColor: navy }}
                  >
                    <CalendarDays className="h-4 w-4" aria-hidden />
                    {event.dayOfWeek}, Jan 23 · 2–4 PM
                  </span>
                  <span
                    className="inline-flex items-center gap-2 rounded-full border-2 bg-white px-4 py-1.5 text-sm font-semibold tracking-wider uppercase"
                    style={{ borderColor: navy, color: navy }}
                  >
                    Free · Students + 1 friend
                  </span>
                </div>

                <p className="text-sm font-extrabold tracking-[0.3em] uppercase sm:text-base" style={{ color: navy }}>
                  Sherman Oaks
                </p>
                <h1 className="mt-1 -rotate-3 normal-case">
                  <span
                    className={`${script.className} block text-7xl leading-[0.95] sm:text-8xl md:text-9xl`}
                    style={{ color: red, WebkitTextStroke: `1.5px ${red}` }}
                  >
                    Ice Cream
                  </span>
                  <span
                    className={`${gothic.className} -mt-2 block -skew-x-6 text-[7.5rem] leading-[0.82] tracking-wide sm:text-[10rem] md:text-[12rem]`}
                    style={{ color: navy }}
                  >
                    SOCIAL
                  </span>
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-lg font-medium md:text-xl lg:mx-0">{event.tagline}</p>

                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <a
                    href="#signup"
                    className="inline-flex h-14 items-center justify-center rounded-full px-8 text-lg font-bold tracking-wide text-white uppercase transition-transform hover:scale-105 sm:h-16 sm:px-10"
                    style={{ backgroundColor: red, boxShadow: "0 10px 30px rgba(230,57,70,0.4)" }}
                  >
                    Sign up your friend
                  </a>
                  <span className="text-sm font-semibold">Free for New Ground students</span>
                </div>
              </div>

              <div className="relative mx-auto w-full min-w-0 max-w-sm lg:max-w-md">
                <div className="rotate-2 rounded-2xl bg-white p-3 shadow-[0_25px_60px_rgba(29,53,87,0.35)] transition-transform hover:rotate-0">
                  {event.flyer && (
                    <Image
                      src={event.flyer.src}
                      alt={event.flyer.alt}
                      width={event.flyer.width}
                      height={event.flyer.height}
                      className="h-auto w-full rounded-lg"
                      priority
                      sizes="(max-width: 1024px) 90vw, 440px"
                    />
                  )}
                </div>
                {event.flyer && (
                  <a
                    href={event.flyer.src}
                    download
                    className="mt-5 inline-flex items-center gap-2 rounded-full border-2 bg-white/70 px-5 py-2 text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-white"
                    style={{ borderColor: navy, color: navy }}
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    Download the flyer
                  </a>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* ---------------- The one rule ---------------- */}
        <section className="py-12 md:py-16" style={{ backgroundColor: navy }}>
          <Container>
            <div className="mx-auto max-w-4xl text-center text-white">
              <p className={`${gothic.className} text-3xl tracking-wide md:text-4xl`} style={{ color: cyan }}>
                THE ONE RULE:
              </p>
              <h2 className={`${gothic.className} mt-1 text-5xl leading-[0.95] tracking-wide sm:text-6xl md:text-7xl`} style={{ color: "#FFFFFF" }}>
                BRING A FRIEND WHO DOESN&apos;T TRAIN JIU JITSU
              </h2>
              <p
                className="mx-auto mt-6 inline-flex items-center gap-3 px-5 py-3 text-base font-bold tracking-wide uppercase md:text-lg"
                style={{ backgroundColor: red }}
              >
                <Gift className="h-5 w-5 shrink-0" aria-hidden />
                Your friend gets 1 free week of kids classes
              </p>
            </div>
          </Container>
        </section>

        {/* ---------------- What happens ---------------- */}
        <section className="py-14 md:py-20" style={{ backgroundColor: honeydew }}>
          <Container>
            <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
              {plan.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border-2 bg-white p-6 text-center" style={{ borderColor: "#CFE0E1" }}>
                  <div
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ backgroundColor: cyan }}
                  >
                    <Icon className="h-7 w-7" style={{ color: navy }} aria-hidden />
                  </div>
                  <h3 className={`${gothic.className} text-3xl tracking-wide`} style={{ color: navy }}>{title.toUpperCase()}</h3>
                  <p className="mt-2" style={{ color: steel }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="mx-auto mt-10 grid max-w-5xl overflow-hidden rounded-2xl border-2 bg-white sm:grid-cols-3" style={{ borderColor: "#CFE0E1" }}>
              <div className="flex items-start gap-3 p-5">
                <CalendarDays className="mt-1 h-6 w-6 shrink-0" style={{ color: red }} aria-hidden />
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: steel }}>
                    When
                  </p>
                  <p className="font-bold">Saturday, January 23, 2027</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t-2 p-5 sm:border-t-0 sm:border-l-2" style={{ borderColor: "#CFE0E1" }}>
                <Clock className="mt-1 h-6 w-6 shrink-0" style={{ color: red }} aria-hidden />
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: steel }}>
                    Time
                  </p>
                  <p className="font-bold">2–4 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t-2 p-5 sm:border-t-0 sm:border-l-2" style={{ borderColor: "#CFE0E1" }}>
                <MapPin className="mt-1 h-6 w-6 shrink-0" style={{ color: red }} aria-hidden />
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: steel }}>
                    Where
                  </p>
                  <a
                    href={siteConfig.contact.addressLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline decoration-2 underline-offset-4"
                    style={{ color: navy, textDecorationColor: cyanDeep }}
                  >
                    4617 Van Nuys Blvd, Suite B, Sherman Oaks
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ---------------- Sign up ---------------- */}
        <section id="signup" className="scroll-mt-24 py-14 md:py-20" style={{ backgroundColor: cyan, backgroundImage: conePattern, backgroundSize: "96px 104px" }}>
          <Container>
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 text-center">
                <h2 className={`${gothic.className} text-6xl tracking-wide md:text-7xl`} style={{ color: navy }}>SIGN UP YOUR FRIEND</h2>
                <p className="mx-auto mt-3 max-w-xl text-lg font-medium">
                  Each student signs up the friend they&apos;re bringing. We email the waiver to the friend&apos;s parent right away. Limited to 25 friends.
                </p>
              </div>

              <ol className="mb-8 grid gap-3 sm:grid-cols-3">
                {steps.map(({ icon: Icon, title, text }, i) => (
                  <li key={title} className="flex gap-3 rounded-2xl bg-white/85 p-4">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: i === 1 ? red : navy }}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <div>
                      <p className="font-bold">{title}</p>
                      <p className="text-sm" style={{ color: steel }}>
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <IceCreamSignupForm full={event.full} />

              <p className="mt-6 text-center text-sm font-medium">
                Questions? Text us at{" "}
                <a href={`sms:${siteConfig.contact.phoneRaw}`} className="font-bold underline" style={{ color: redText }}>
                  {siteConfig.contact.phone}
                </a>
                .
              </p>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
