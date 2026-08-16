import { Phone, MessageCircle, MapPin } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const PHONE = process.env.NEXT_PUBLIC_PHONE_DISPLAY;

export function ContactSection() {
  const message = encodeURIComponent(
    "Hi! I'd like to know more about staying at Zamu Stays, Kamakis."
  );

  return (
    <section id="contact" className="bg-paper-dim/50">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
        <p className="font-mono-route text-xs uppercase text-brass-deep mb-3">
          Contact
        </p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl">
          Have questions or want to book?
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl bg-paper border border-ink/10 p-6">
            <Phone size={20} className="text-brass-deep mb-4" />
            <p className="font-mono-route text-[11px] uppercase text-ink-soft/60">
              Phone
            </p>
            <p className="mt-1 font-medium">{PHONE}</p>
          </div>
          <div className="rounded-2xl bg-paper border border-ink/10 p-6">
            <MessageCircle size={20} className="text-brass-deep mb-4" />
            <p className="font-mono-route text-[11px] uppercase text-ink-soft/60">
              WhatsApp
            </p>
            <p className="mt-1 font-medium">+{WHATSAPP}</p>
          </div>
          <div className="rounded-2xl bg-paper border border-ink/10 p-6">
            <MapPin size={20} className="text-brass-deep mb-4" />
            <p className="font-mono-route text-[11px] uppercase text-ink-soft/60">
              Location
            </p>
            <p className="mt-1 font-medium">Eastern Bypass, Kamakis, Ruiru</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`tel:${WHATSAPP}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink text-paper font-medium px-6 py-3.5 hover:bg-ink-soft transition-colors focus-ring"
          >
            <Phone size={16} />
            Call Now
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brass text-ink font-medium px-6 py-3.5 hover:brightness-95 transition-colors focus-ring"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
