import { Navigation2 } from "lucide-react";

export function LocationSection() {
  return (
    <section id="location" className="mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
      <p className="font-mono-route text-xs uppercase text-brass-deep mb-3">
        Location
      </p>
      <h2 className="font-display font-semibold text-3xl md:text-4xl">
        Find us in Kamakis
      </h2>

      <div className="mt-12 grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <div className="rounded-2xl border border-ink/10 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-lg">Zamu Stays, Kamakis</h3>
            <p className="mt-3 text-sm text-ink-soft">
              Eastern Bypass, Kamakis, Ruiru, Kenya
            </p>
            <p className="mt-1 text-sm text-ink-soft">Near Greenspot</p>
            <p className="mt-6 font-mono-route text-[11px] uppercase text-ink-soft/60">
              Plus code
            </p>
            <p className="font-mono-route text-sm">RXHC+XG Ruiru</p>
          </div>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=RXHC%2BXG+Ruiru"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brass text-ink font-medium px-5 py-3 hover:brightness-95 transition focus-ring"
          >
            <Navigation2 size={16} />
            Get Directions
          </a>
          <p className="mt-3 text-xs text-ink-soft/60">
            The map is centred on the published Plus Code area, not a
            verified door location.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-ink/10 min-h-[320px]">
          <iframe
            title="Zamu Stays location map"
            src="https://www.google.com/maps?q=RXHC%2BXG+Ruiru&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 320 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
