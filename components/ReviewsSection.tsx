import { Star } from "lucide-react";
import type { ZamuReview } from "@/lib/types";

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-KE", {
    month: "short",
    year: "numeric",
  });
}

export function ReviewsSection({ reviews }: { reviews: ZamuReview[] }) {
  return (
    <section id="reviews" className="bg-paper-dim/50">
      <div className="mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono-route text-xs uppercase text-brass-deep mb-3">
              Reviews
            </p>
            <h2 className="font-display font-semibold text-3xl md:text-4xl">
              What guests say
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-brass">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="text-sm text-ink-soft">4.9 · 83 reviews</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl bg-paper border border-ink/10 p-6 flex flex-col"
            >
              <div className="flex text-brass mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-sm text-ink-soft leading-relaxed grow">
                {r.review_text}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-medium">{r.author_name}</span>
                <span className="font-mono-route text-[11px] text-ink-soft/50">
                  {formatDate(r.review_date)}
                </span>
              </div>
              {r.owner_response && (
                <div className="mt-4 rounded-lg bg-paper-dim/60 p-3 text-xs text-ink-soft italic">
                  Host: {r.owner_response}
                </div>
              )}
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <p className="mt-10 text-sm text-ink-soft/60">
            Reviews are being added — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
