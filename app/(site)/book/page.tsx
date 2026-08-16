"use client";

import { useState } from "react";
import { MessageCircle, CalendarCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { RouteStrip } from "@/components/RouteStrip";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

type Status = "idle" | "checking" | "conflict" | "success" | "error";

export default function BookPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!name || !phone || !checkIn || !checkOut) {
      setStatus("error");
      setErrorMsg("Please fill in your name, phone, and dates.");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setStatus("error");
      setErrorMsg("Check-out date must be after check-in date.");
      return;
    }

    setStatus("checking");
    const supabase = createClient();

    // Check for overlapping bookings
    const { data: overlappingBookings } = await supabase
      .from("zamu_bookings")
      .select("id")
      .in("status", ["pending", "approved"])
      .lt("check_in", checkOut)
      .gt("check_out", checkIn);

    const { data: overlappingBlocks } = await supabase
      .from("zamu_blocked_dates")
      .select("id")
      .lt("start_date", checkOut)
      .gt("end_date", checkIn);

    if (
      (overlappingBookings && overlappingBookings.length > 0) ||
      (overlappingBlocks && overlappingBlocks.length > 0)
    ) {
      setStatus("conflict");
      return;
    }

    const { error } = await supabase.from("zamu_bookings").insert({
      guest_name: name,
      phone,
      guests_count: guests,
      check_in: checkIn,
      check_out: checkOut,
      message: message || null,
      status: "pending",
    });

    if (error) {
      setStatus("error");
      setErrorMsg("Something went wrong sending your request. Please try WhatsApp instead.");
      return;
    }

    setStatus("success");

    const waText = encodeURIComponent(
      `Hi! I'd like to request a stay at Zamu Stays, Kamakis.\n\n` +
        `Name: ${name}\nPhone: ${phone}\nGuests: ${guests}\n` +
        `Check-in: ${checkIn}\nCheck-out: ${checkOut}\n` +
        (message ? `Message: ${message}\n` : "") +
        `\nI've also submitted this via your website booking form.`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${waText}`, "_blank");
  }

  return (
    <section className="mx-auto max-w-6xl px-5 md:px-8 py-16 md:py-24">
      <p className="font-mono-route text-xs uppercase text-brass-deep mb-3">
        Book your stay
      </p>
      <h1 className="font-display font-semibold text-3xl md:text-4xl">
        Request your stay
      </h1>
      <p className="mt-4 max-w-lg text-ink-soft">
        Fill in your details below — we&apos;ll check availability instantly
        and open WhatsApp with your request ready to send. Dates are
        confirmed personally by the host.
      </p>

      <RouteStrip className="mt-10 max-w-xs" />

      <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.3fr]">
        <div className="rounded-2xl border border-ink/10 p-6 md:p-8 h-fit">
          <h2 className="font-display font-semibold text-lg mb-3">
            Prefer to just message?
          </h2>
          <p className="text-sm text-ink-soft mb-5">
            Skip the form and message the host directly on WhatsApp.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
              "Hi! I'd like to book a stay at Zamu Stays, Kamakis."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-paper font-medium px-5 py-3 hover:bg-ink-soft transition-colors focus-ring"
          >
            <MessageCircle size={16} />
            Message the host directly
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-ink/10 p-6 md:p-8 space-y-6"
        >
          <div>
            <label className="text-sm font-medium" htmlFor="name">
              Guest Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="mt-2 w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 text-sm focus-ring"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07xx xxx xxx"
                className="mt-2 w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 text-sm focus-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="guests">
                Number of Guests
              </label>
              <input
                id="guests"
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="mt-2 w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 text-sm focus-ring"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium" htmlFor="checkin">
                Check-in Date
              </label>
              <input
                id="checkin"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="mt-2 w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 text-sm focus-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="checkout">
                Check-out Date
              </label>
              <input
                id="checkout"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="mt-2 w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 text-sm focus-ring"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Anything you'd like the host to know"
              rows={4}
              className="mt-2 w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 text-sm focus-ring resize-y"
            />
          </div>

          {status === "conflict" && (
            <div className="flex items-start gap-2 rounded-lg bg-clay/10 border border-clay/30 p-4 text-sm text-clay">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>
                Those dates overlap with an existing request. Try different
                dates, or message the host directly to check.
              </span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-start gap-2 rounded-lg bg-clay/10 border border-clay/30 p-4 text-sm text-clay">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {status === "success" && (
            <div className="flex items-start gap-2 rounded-lg bg-sage/10 border border-sage/30 p-4 text-sm text-sage">
              <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
              <span>
                Request sent! We&apos;ve opened WhatsApp so you can send it
                straight to the host.
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "checking"}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brass text-ink font-medium py-4 hover:brightness-95 transition disabled:opacity-60 focus-ring"
          >
            <CalendarCheck size={18} />
            {status === "checking" ? "Checking availability…" : "Send Booking Request"}
          </button>
        </form>
      </div>
    </section>
  );
}
