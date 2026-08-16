import { MessageCircle } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export function WhatsAppFloat() {
  const message = encodeURIComponent(
    "Hi! I'd like to ask about Zamu Stays in Kamakis."
  );

  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-sage text-paper pl-4 pr-5 py-3.5 shadow-lg shadow-ink/20 hover:brightness-110 transition focus-ring"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={20} />
      <span className="text-sm font-medium hidden sm:inline">WhatsApp</span>
    </a>
  );
}
