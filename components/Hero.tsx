import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Star, ImageOff } from "lucide-react";
import { RouteStrip } from "./RouteStrip";
import type { ZamuMedia } from "@/lib/types";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export function Hero({ photos }: { photos: ZamuMedia[] }) {
  const message = encodeURIComponent(
    "Hi! I'd like to know more about staying at Zamu Stays, Kamakis."
  );

  const images = photos.filter((p) => p.media_type === "image").slice(0, 3);
  const [main, side1, side2] = images;

  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 md:px-8 pt-12 pb-14 md:pt-16 md:pb-20">
        <div className="flex items-center gap-2 font-mono-route text-xs uppercase text-brass mb-6">
          <span>Eastern Bypass</span>
          <span className="opacity-50">·</span>
          <span>Kamakis, Ruiru</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.05]">
              Your stop along
              <br />
              the Eastern Bypass.
            </h1>

            <p className="mt-6 max-w-lg text-paper/75 text-base md:text-lg">
              A cosy 1-bedroom Airbnb in Kamakis, Ruiru — steps from
              Greenspot, minutes from everywhere you need to be.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-paper/80">
              <div className="flex text-brass">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span>4.9 · 83 reviews</span>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center rounded-full bg-brass text-ink font-medium px-6 py-3.5 hover:bg-paper transition-colors focus-ring"
              >
                Book Your Stay
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3.5 hover:bg-paper/10 transition-colors focus-ring"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Photo mosaic — real property photos visible in the first fold */}
          <div className="grid grid-cols-2 gap-3 h-[320px] sm:h-[380px] lg:h-[420px]">
            <div className="relative rounded-2xl overflow-hidden bg-paper/5">
              {main ? (
                <Image
                  src={main.url}
                  alt={main.caption ?? "Zamu Stays, Kamakis"}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <EmptySlot />
              )}
            </div>
            <div className="grid grid-rows-2 gap-3">
              <div className="relative rounded-2xl overflow-hidden bg-paper/5">
                {side1 ? (
                  <Image
                    src={side1.url}
                    alt={side1.caption ?? "Zamu Stays, Kamakis"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <EmptySlot small />
                )}
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-paper/5">
                {side2 ? (
                  <Image
                    src={side2.url}
                    alt={side2.caption ?? "Zamu Stays, Kamakis"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <EmptySlot small />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <RouteStrip />
    </section>
  );
}

function EmptySlot({ small = false }: { small?: boolean }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-2 text-paper/30">
      <ImageOff size={small ? 18 : 26} />
      {!small && <span className="text-xs">Photos coming soon</span>}
    </div>
  );
}
