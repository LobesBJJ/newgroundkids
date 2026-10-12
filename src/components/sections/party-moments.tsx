"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  partyMoments,
  partyMomentCategories,
  type PartyMoment,
  type PartyMomentCategory,
} from "@/data/birthday-packages";

const TAG_COLORS: Record<PartyMomentCategory, string> = {
  "indoor-bounce": "bg-sky-300",
  "outdoor-bounce": "bg-pink-400",
  nerf: "bg-orange-400",
  extras: "bg-violet-300",
};

const CATEGORY = Object.fromEntries(partyMomentCategories.map((c) => [c.id, c])) as Record<
  PartyMomentCategory,
  (typeof partyMomentCategories)[number]
>;

type Filter = PartyMomentCategory | "all";

export function PartyMoments() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? partyMoments : partyMoments.filter((m) => m.category === filter);
  const photos = partyMoments.filter((m) => m.type === "image");
  const videos = partyMoments.filter((m) => m.type === "video");

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: partyMoments.length },
    ...partyMomentCategories.map((c) => ({
      id: c.id,
      label: c.label,
      count: partyMoments.filter((m) => m.category === c.id).length,
    })),
  ];

  return (
    <div className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_#14b8a6] md:p-6">
      {/* Experience filter */}
      <div
        role="group"
        aria-label="Filter party moments by experience"
        className="-mx-4 mb-6 flex snap-x gap-2 overflow-x-auto px-4 pt-1 pb-2 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0"
      >
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className={cn(
                "font-heading shrink-0 snap-start border-2 border-black px-3 py-1.5 text-sm tracking-wide uppercase transition-all",
                active
                  ? cn(
                      f.id === "all"
                        ? "bg-black text-white"
                        : TAG_COLORS[f.id as PartyMomentCategory],
                      "shadow-[3px_3px_0px_0px_#000]"
                    )
                  : "bg-white hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#000]"
              )}
            >
              {f.label}
              <span className="ml-1.5 opacity-60">{f.count}</span>
            </button>
          );
        })}
      </div>

      {filter === "all" ? (
        <div className="space-y-6">
          {/* Photos first */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {photos.map((m, i) => (
              <MomentTile key={m.id} moment={m} priority={i < 3} />
            ))}
          </div>

          {/* Then videos: two landscape clips stacked beside the portrait Nerf clip */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-4 md:col-span-2">
              {videos
                .filter((v) => v.orientation !== "portrait")
                .map((m) => (
                  <MomentTile key={m.id} moment={m} />
                ))}
            </div>
            {videos
              .filter((v) => v.orientation === "portrait")
              .map((m) => (
                <MomentTile key={m.id} moment={m} fill className="aspect-[4/5] md:aspect-auto" />
              ))}
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "mx-auto grid gap-4",
            visible.length === 1 && "max-w-sm",
            visible.length === 2 && "max-w-4xl sm:grid-cols-2",
            visible.length === 3 && "sm:grid-cols-3",
            visible.length >= 4 && "grid-cols-2 md:grid-cols-4"
          )}
        >
          {visible.map((m) => (
            <MomentTile key={m.id} moment={m} priority />
          ))}
        </div>
      )}
    </div>
  );
}

function MomentTile({
  moment,
  priority = false,
  fill = false,
  className,
}: {
  moment: PartyMoment;
  priority?: boolean;
  /** Stretch to the grid row height instead of using the default aspect ratio */
  fill?: boolean;
  className?: string;
}) {
  const aspect =
    moment.type === "image"
      ? "aspect-[4/5]"
      : moment.orientation === "portrait"
        ? "aspect-[9/16]"
        : "aspect-video";

  return (
    <figure
      className={cn(
        "group relative overflow-hidden border-4 border-black bg-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000]",
        !fill && aspect,
        fill && "h-full",
        className
      )}
    >
      {moment.type === "image" ? (
        <Image
          src={moment.src}
          alt={moment.alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <MomentVideo moment={moment} />
      )}

      {/* Experience tag */}
      <span
        className={cn(
          "font-heading pointer-events-none absolute top-2 left-2 border-2 border-black px-2 py-0.5 text-[11px] tracking-wide text-black uppercase md:text-xs",
          TAG_COLORS[moment.category]
        )}
      >
        <span className="md:hidden">{CATEGORY[moment.category].short}</span>
        <span className="hidden md:inline">{CATEGORY[moment.category].label}</span>
      </span>

      {moment.caption && (
        <figcaption
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent pt-8 pb-3 pl-3 text-xs font-semibold text-white md:text-sm",
            moment.type === "video" ? "pr-14" : "hidden pr-3 sm:block"
          )}
        >
          {moment.caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Muted looping clip that only plays while on screen; respects reduced-motion. */
function MomentVideo({ moment }: { moment: PartyMoment }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !userPaused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [userPaused]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      video.play().catch(() => {});
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={ref}
        src={moment.src}
        poster={moment.poster}
        aria-label={moment.alt}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute right-2 bottom-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_#000] transition-transform hover:scale-105"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
      </button>
    </>
  );
}
