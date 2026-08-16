import { BedDouble, MapPin, Navigation, Star, Users, Phone } from "lucide-react";
import { RouteStrip } from "./RouteStrip";

const PHONE = process.env.NEXT_PUBLIC_PHONE_DISPLAY;

const INFO = [
  { icon: BedDouble, label: "Bedrooms", value: "1 Bedroom" },
  { icon: MapPin, label: "Location", value: "Eastern Bypass, Kamakis, Ruiru" },
  { icon: Navigation, label: "Nearby", value: "Greenspot" },
  { icon: Star, label: "Rating", value: "4.9 ★" },
  { icon: Users, label: "Reviews", value: "83" },
  { icon: Phone, label: "Contact", value: PHONE ?? "" },
];

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
      <p className="font-mono-route text-xs uppercase text-brass-deep mb-3">
        About the stay
      </p>
      <h2 className="font-display font-semibold text-3xl md:text-4xl max-w-xl">
        Welcome to Zamu Stays, Kamakis
      </h2>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-5 text-ink-soft leading-relaxed">
          <p>
            Zamu Stays is a 1-bedroom vacation rental along the Eastern
            Bypass in Kamakis, Ruiru, just near Greenspot. It&apos;s an easy
            place to find and an easy place to settle into — whether
            you&apos;re in town for a night, a weekend, or longer.
          </p>
          <p>
            Guests consistently describe the space as clean, organised and
            comfortable, with a location that makes getting around simple.
            It&apos;s well suited to travellers looking for straightforward,
            welcoming accommodation in the Kamakis and Ruiru area.
          </p>
          <p>Have a question before you book? The host is a WhatsApp message away.</p>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-paper-dim/60 p-6 md:p-8">
          <h3 className="font-display font-semibold text-lg mb-6">
            Property information
          </h3>
          <div className="grid grid-cols-2 gap-5">
            {INFO.map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <Icon size={18} className="text-brass-deep mb-2" />
                <p className="font-mono-route text-[10px] uppercase text-ink-soft/60">
                  {label}
                </p>
                <p className="text-sm font-medium mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RouteStrip className="mt-20" />
    </section>
  );
}
