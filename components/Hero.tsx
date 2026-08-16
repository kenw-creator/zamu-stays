import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Star } from "lucide-react";
import { RouteStrip } from "./RouteStrip";
import type { ZamuMedia } from "@/lib/types";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export function Hero({ heroImage }: { heroImage: ZamuMedia | null }) {
  const message = encodeURIComponent(
    "Hi! I'd like to know more about staying at Zamu Stays, Kamakis."
  );

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {heroImage && (
        <div className="absolute inset-0">
          <Image
            src={heroImage.url}
            alt={heroImage.caption ?? "Zamu Stays, Kamakis"}
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        </div>
      )}

      {/* fallback ambient backdrop when no photo is uploaded yet */}
      {!heroImage && (
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, var(--brass) 0%, transparent 35%), radial-gradient(circle at 80% 60%, var(--sage) 0%, transparent 40%)",
          }}
        />
      )}

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="flex items-center gap-2 font-mono-route text-xs uppercase text-brass mb-6">
          <span>Eastern Bypass</span>
          <span className="opacity-50">·</span>
          <span>Kamakis, Ruiru</span>
        </div>

        <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-2xl">
          Your stop along
          <br />
          the Eastern Bypass.
        </h1>

        <p className="mt-6 max-w-lg text-paper/75 text-base md:text-lg">
          A cosy 1-bedroom Airbnb in Kamakis, Ruiru — steps from Greenspot,
          minutes from everywhere you need to be.
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

      <RouteStrip className="relative" />
    </section>
  );
}
