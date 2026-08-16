import Link from "next/link";
import { MessageCircle, CalendarCheck } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export function StickyBookBar() {
  const message = encodeURIComponent(
    "Hi! I'd like to know more about staying at Zamu Stays, Kamakis."
  );

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-ink/95 backdrop-blur border-t border-paper/10 px-4 py-3 flex items-center gap-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <a
        href={`https://wa.me/${WHATSAPP}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 inline-flex items-center justify-center rounded-full border border-paper/25 text-paper p-3.5 hover:bg-paper/10 transition-colors focus-ring"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={20} />
      </a>
      <Link
        href="/book"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-brass text-ink font-medium py-3.5 hover:brightness-95 transition-colors focus-ring"
      >
        <CalendarCheck size={18} />
        Book Your Stay
      </Link>
    </div>
  );
}
