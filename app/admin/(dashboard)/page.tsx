import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { CalendarDays, Image as ImageIcon, Star, Clock } from "lucide-react";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [{ count: pendingCount }, { count: mediaCount }, { count: reviewCount }, { data: recentBookings }] =
    await Promise.all([
      supabase
        .from("zamu_bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase.from("zamu_media").select("*", { count: "exact", head: true }),
      supabase.from("zamu_reviews").select("*", { count: "exact", head: true }),
      supabase
        .from("zamu_bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const cards = [
    { label: "Pending requests", value: pendingCount ?? 0, icon: Clock, href: "/admin/bookings" },
    { label: "Photos & videos", value: mediaCount ?? 0, icon: ImageIcon, href: "/admin/media" },
    { label: "Reviews", value: reviewCount ?? 0, icon: Star, href: "/admin/reviews" },
  ];

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl md:text-3xl">Overview</h1>
      <p className="text-ink-soft mt-2">A quick look at what&apos;s happening at Zamu Stays.</p>

      <div className="mt-8 grid sm:grid-cols-3 gap-5">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl border border-ink/10 p-6 hover:border-brass/50 transition-colors"
          >
            <Icon size={20} className="text-brass-deep mb-4" />
            <p className="text-3xl font-display font-semibold">{value}</p>
            <p className="text-sm text-ink-soft mt-1">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-lg">Recent requests</h2>
          <Link href="/admin/bookings" className="text-sm text-brass-deep hover:underline">
            View all
          </Link>
        </div>

        <div className="mt-4 rounded-2xl border border-ink/10 divide-y divide-ink/10">
          {(recentBookings ?? []).length === 0 && (
            <p className="p-6 text-sm text-ink-soft/60">
              <CalendarDays size={16} className="inline mr-2 -mt-0.5" />
              No booking requests yet.
            </p>
          )}
          {(recentBookings ?? []).map((b) => (
            <div key={b.id} className="p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-sm">{b.guest_name}</p>
                <p className="text-xs text-ink-soft mt-0.5">
                  {b.check_in} → {b.check_out} · {b.guests_count} guest{b.guests_count > 1 ? "s" : ""}
                </p>
              </div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
