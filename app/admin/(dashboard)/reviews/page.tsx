"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ZamuReview } from "@/lib/types";
import { Plus, Trash2, Eye, EyeOff, Star, X } from "lucide-react";

const emptyForm = {
  author_name: "",
  rating: 5,
  review_text: "",
  review_date: "",
  owner_response: "",
  source: "manual" as "manual" | "google",
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ZamuReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("zamu_reviews")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    setReviews((data ?? []) as ZamuReview[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function addReview(e: React.FormEvent) {
    e.preventDefault();
    if (!form.author_name || !form.review_text) return;
    const supabase = createClient();
    await supabase.from("zamu_reviews").insert({
      author_name: form.author_name,
      rating: form.rating,
      review_text: form.review_text,
      review_date: form.review_date || null,
      owner_response: form.owner_response || null,
      source: form.source,
    });
    setForm(emptyForm);
    setShowForm(false);
    load();
  }

  async function toggleVisible(r: ZamuReview) {
    const supabase = createClient();
    await supabase.from("zamu_reviews").update({ is_visible: !r.is_visible }).eq("id", r.id);
    load();
  }

  async function remove(id: string) {
    const supabase = createClient();
    await supabase.from("zamu_reviews").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-semibold text-2xl md:text-3xl">Reviews</h1>
          <p className="text-ink-soft mt-2">
            Manage what shows on the site — seeded from your Google Maps
            reviews, plus anything you add.
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full bg-brass text-ink text-sm font-medium px-5 py-2.5 hover:brightness-95 transition focus-ring"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Cancel" : "Add review"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addReview} className="mt-6 rounded-2xl border border-ink/10 p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium">Guest name</label>
              <input
                value={form.author_name}
                onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm focus-ring"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium">Rating</label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="mt-1.5 w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm focus-ring"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium">Review text</label>
            <textarea
              value={form.review_text}
              onChange={(e) => setForm({ ...form, review_text: e.target.value })}
              rows={3}
              className="mt-1.5 w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm focus-ring resize-y"
              required
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium">Date (optional)</label>
              <input
                type="date"
                value={form.review_date}
                onChange={(e) => setForm({ ...form, review_date: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm focus-ring"
              />
            </div>
            <div>
              <label className="text-xs font-medium">Source</label>
              <select
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value as "manual" | "google" })}
                className="mt-1.5 w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm focus-ring"
              >
                <option value="manual">Manual</option>
                <option value="google">Google</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium">Owner response (optional)</label>
            <textarea
              value={form.owner_response}
              onChange={(e) => setForm({ ...form, owner_response: e.target.value })}
              rows={2}
              className="mt-1.5 w-full rounded-lg border border-ink/15 px-3 py-2.5 text-sm focus-ring resize-y"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-paper text-sm font-medium px-5 py-2.5 hover:bg-ink-soft transition focus-ring"
          >
            Save review
          </button>
        </form>
      )}

      {loading ? (
        <p className="mt-8 text-sm text-ink-soft/60">Loading…</p>
      ) : (
        <div className="mt-8 rounded-2xl border border-ink/10 divide-y divide-ink/10">
          {reviews.length === 0 && <p className="p-6 text-sm text-ink-soft/60">No reviews yet.</p>}
          {reviews.map((r) => (
            <div key={r.id} className="p-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{r.author_name}</span>
                  <span className="flex text-brass">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                    ))}
                  </span>
                  {!r.is_visible && (
                    <span className="text-[10px] uppercase text-ink-soft/50 bg-paper-dim rounded-full px-2 py-0.5">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink-soft mt-1.5">{r.review_text}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleVisible(r)}
                  className="p-2 rounded-full text-ink-soft hover:bg-paper-dim focus-ring"
                  aria-label={r.is_visible ? "Hide" : "Show"}
                >
                  {r.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button
                  onClick={() => remove(r.id)}
                  className="p-2 rounded-full text-clay hover:bg-clay/10 focus-ring"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
