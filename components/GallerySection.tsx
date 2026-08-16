"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle, ImageOff } from "lucide-react";
import { RouteStrip } from "./RouteStrip";
import { CATEGORY_LABELS, type MediaCategory, type ZamuMedia } from "@/lib/types";

const FILTERS: { key: MediaCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "bedroom", label: "Bedroom" },
  { key: "living_room", label: "Living Room" },
  { key: "kitchen", label: "Kitchen" },
  { key: "bathroom", label: "Bathroom" },
  { key: "exterior", label: "Exterior" },
];

export function GallerySection({ media }: { media: ZamuMedia[] }) {
  const [filter, setFilter] = useState<MediaCategory | "all">("all");

  const shown = media.filter((m) => filter === "all" || m.category === filter);

  return (
    <section id="gallery" className="mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
      <p className="font-mono-route text-xs uppercase text-brass-deep mb-3">
        Gallery
      </p>
      <h2 className="font-display font-semibold text-3xl md:text-4xl">
        A look around
      </h2>

      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-ring ${
              filter === f.key
                ? "bg-ink text-paper"
                : "bg-paper-dim text-ink-soft hover:bg-paper-dim/70"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-ink/20 py-16 flex flex-col items-center gap-3 text-ink-soft/60">
          <ImageOff size={28} />
          <p className="text-sm">
            {media.length === 0
              ? "Photos are on the way — check back soon."
              : "No photos in this category yet."}
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((item) => (
            <div
              key={item.id}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-paper-dim group"
            >
              {item.media_type === "video" ? (
                <video
                  src={item.url}
                  className="h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
              ) : (
                <Image
                  src={item.url}
                  alt={item.caption ?? CATEGORY_LABELS[item.category]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
              {item.media_type === "video" && (
                <PlayCircle
                  size={40}
                  className="absolute inset-0 m-auto text-paper drop-shadow"
                />
              )}
              <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 text-paper text-xs px-3 py-1">
                {CATEGORY_LABELS[item.category]}
              </span>
            </div>
          ))}
        </div>
      )}

      <RouteStrip className="mt-20" />
    </section>
  );
}
