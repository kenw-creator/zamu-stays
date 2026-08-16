"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ZamuBooking, ZamuBlockedDate, BookingStatus } from "@/lib/types";
import { Check, X, Trash2, Phone, Ban } from "lucide-react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<ZamuBooking[]>([]);
  const [blocks, setBlocks] = useState<ZamuBlockedDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [blockReason, setBlockReason] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const [{ data: b }, { data: bl }] = await Promise.all([
      supabase.from("zamu_bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("zamu_blocked_dates").select("*").order("start_date", { ascending: true }),
    ]);
    setBookings((b ?? []) as ZamuBooking[]);
    setBlocks((bl ?? []) as ZamuBlockedDate[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function updateStatus(id: string, status: BookingStatus) {
    const supabase = createClient();
    await supabase.from("zamu_bookings").update({ status }).eq("id", id);
    load();
  }

  async function addBlock(e: React.FormEvent) {
    e.preventDefault();
    if (!blockStart || !blockEnd) return;
    const supabase = createClient();
    await supabase.from("zamu_blocked_dates").insert({
      start_date: blockStart,
      end_date: blockEnd,
      reason: blockReason || null,
    });
    setBlockStart("");
    setBlockEnd("");
    setBlockReason("");
    load();
  }

  async function removeBlock(id: string) {
    const supabase = createClient();
    await supabase.from("zamu_blocked_dates").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl md:text-3xl">Bookings</h1>
      <p className="text-ink-soft mt-2">
        Approve or decline requests, and block off dates that are booked
        elsewhere.
      </p>

      <div className="mt-8 rounded-2xl border border-ink/10 overflow-hidden">
        {loading && <p className="p-6 text-sm text-ink-soft/60">Loading…</p>}
        {!loading && bookings.length === 0 && (
          <p className="p-6 text-sm text-ink-soft/60">No booking requests yet.</p>
        )}
        <div className="divide-y divide-ink/10">
          {bookings.map((b) => (
            <div key={b.id} className="p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div>
                <p className="font-medium text-sm">{b.guest_name}</p>
                <p className="text-xs text-ink-soft mt-1 flex items-center gap-1">
                  <Phone size={12} /> {b.phone}
                </p>
                <p className="text-xs text-ink-soft mt-1">
                  {b.check_in} → {b.check_out} · {b.guests_count} guest{b.guests_count > 1 ? "s" : ""}
                </p>
                {b.message && <p className="text-xs text-ink-soft/70 mt-1 italic">&ldquo;{b.message}&rdquo;</p>}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full capitalize ${
                    b.status === "approved"
                      ? "bg-sage/15 text-sage"
                      : b.status === "declined" || b.status === "cancelled"
                      ? "bg-clay/15 text-clay"
                      : "bg-brass/15 text-brass-deep"
                  }`}
                >
                  {b.status}
                </span>
                {b.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(b.id, "approved")}
                      className="p-2 rounded-full bg-sage/15 text-sage hover:bg-sage/25 focus-ring"
                      aria-label="Approve"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => updateStatus(b.id, "declined")}
                      className="p-2 rounded-full bg-clay/15 text-clay hover:bg-clay/25 focus-ring"
                      aria-label="Decline"
                    >
                      <X size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display font-semibold text-lg mb-4">
            Block off dates
          </h2>
          <p className="text-sm text-ink-soft mb-4">
            Use this for stays booked outside the website (phone, walk-in,
            other platforms) so the calendar stays accurate.
          </p>
          <form onSubmit={addBlock} className="rounded-2xl border border-ink/10 p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium">Start date</label>
                <input
                  type="date"
                  value={blockStart}
                  onChange={(e) => setBlockStart(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm focus-ring"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium">End date</label>
                <input
                  type="date"
                  value={blockEnd}
                  onChange={(e) => setBlockEnd(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm focus-ring"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium">Reason (optional)</label>
              <input
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                placeholder="e.g. Booked via phone call"
                className="mt-1.5 w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm focus-ring"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-paper text-sm font-medium px-5 py-2.5 hover:bg-ink-soft transition focus-ring"
            >
              <Ban size={15} />
              Block these dates
            </button>
          </form>
        </div>

        <div>
          <h2 className="font-display font-semibold text-lg mb-4">Blocked dates</h2>
          <div className="rounded-2xl border border-ink/10 divide-y divide-ink/10">
            {blocks.length === 0 && (
              <p className="p-6 text-sm text-ink-soft/60">No blocked dates.</p>
            )}
            {blocks.map((bl) => (
              <div key={bl.id} className="p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">
                    {bl.start_date} → {bl.end_date}
                  </p>
                  {bl.reason && <p className="text-xs text-ink-soft mt-0.5">{bl.reason}</p>}
                </div>
                <button
                  onClick={() => removeBlock(bl.id)}
                  className="p-2 rounded-full text-clay hover:bg-clay/10 focus-ring"
                  aria-label="Remove block"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
