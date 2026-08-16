import {
  Wifi,
  Tv,
  Refrigerator,
  ShowerHead,
  ParkingCircle,
  Wind,
  UtensilsCrossed,
  ShieldCheck,
} from "lucide-react";

const AMENITIES = [
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Tv, label: "Smart TV" },
  { icon: Refrigerator, label: "Fridge & kitchenette" },
  { icon: ShowerHead, label: "Hot shower" },
  { icon: ParkingCircle, label: "Parking on site" },
  { icon: Wind, label: "Fan / ventilation" },
  { icon: UtensilsCrossed, label: "Cooking essentials" },
  { icon: ShieldCheck, label: "Secure compound" },
];

export function AmenitiesSection() {
  return (
    <section id="amenities" className="bg-paper-dim/50">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
        <p className="font-mono-route text-xs uppercase text-brass-deep mb-3">
          What&apos;s included
        </p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl">
          Everything you need, nothing you don&apos;t
        </h2>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-5">
          {AMENITIES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="rounded-xl bg-paper border border-ink/10 p-5 flex flex-col gap-3"
            >
              <Icon size={20} className="text-sage" />
              <span className="text-sm font-medium leading-snug">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
