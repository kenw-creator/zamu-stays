"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#amenities", label: "Amenities" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#location", label: "Location" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-5 md:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none focus-ring">
          <span className="text-xl md:text-2xl font-display font-semibold text-ink">
            Zamu Stays
          </span>
          <span className="font-mono-route text-[10px] uppercase text-brass-deep mt-1">
            Kamakis · Eastern Bypass
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-ink-soft hover:text-brass-deep transition-colors focus-ring"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="hidden sm:inline-flex items-center rounded-full bg-ink text-paper text-sm font-medium px-5 py-2.5 hover:bg-brass-deep transition-colors focus-ring"
          >
            Book Now
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 text-ink focus-ring"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-ink/10 bg-paper px-5 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base text-ink-soft focus-ring"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-full bg-ink text-paper text-sm font-medium px-5 py-3 focus-ring"
          >
            Book Now
          </Link>
        </nav>
      )}
    </header>
  );
}
