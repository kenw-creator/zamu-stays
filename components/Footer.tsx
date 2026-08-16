import Link from "next/link";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const PHONE = process.env.NEXT_PUBLIC_PHONE_DISPLAY;

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-14 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <span className="text-2xl font-display font-semibold">Zamu Stays</span>
          <p className="mt-3 text-sm text-paper/60 max-w-xs">
            A comfortable 1-bedroom stay in Kamakis, Ruiru — right on the
            Eastern Bypass, near Greenspot.
          </p>
        </div>

        <div className="text-sm">
          <p className="font-mono-route text-[11px] uppercase text-brass mb-3">
            Explore
          </p>
          <ul className="space-y-2 text-paper/75">
            <li><Link href="/#about" className="hover:text-brass">About</Link></li>
            <li><Link href="/#gallery" className="hover:text-brass">Gallery</Link></li>
            <li><Link href="/#reviews" className="hover:text-brass">Reviews</Link></li>
            <li><Link href="/#location" className="hover:text-brass">Location</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-mono-route text-[11px] uppercase text-brass mb-3">
            Reach us
          </p>
          <ul className="space-y-2 text-paper/75">
            <li>Call: {PHONE}</li>
            <li>WhatsApp: +{WHATSAPP}</li>
            <li>Eastern Bypass, Kamakis, Ruiru</li>
          </ul>
        </div>
      </div>

      <div className="route-strip opacity-30 mx-5 md:mx-8" />

      <div className="mx-auto max-w-6xl px-5 md:px-8 py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-paper/50">
        <span>© {new Date().getFullYear()} Zamu Stays, Kamakis.</span>
        <span className="font-mono-route">RXHC+XG · Ruiru, Kenya</span>
      </div>
    </footer>
  );
}
