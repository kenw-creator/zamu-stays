"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { CATEGORY_LABELS, type MediaCategory, type ZamuMedia } from "@/lib/types";
import { Upload, Trash2, PlayCircle } from "lucide-react";

const CATEGORIES: MediaCategory[] = [
  "bedroom",
  "living_room",
  "kitchen",
  "bathroom",
  "exterior",
];

export default function AdminMediaPage() {
  const [media, setMedia] = useState<ZamuMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState<MediaCategory>("bedroom");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("zamu_media")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    setMedia((data ?? []) as ZamuMedia[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    const supabase = createClient();

    for (const file of Array.from(files)) {
      const isVideo = file.type.startsWith("video/");
      const ext = file.name.split(".").pop();
      const path = `${category}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("zamu-media")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError(`Failed to upload ${file.name}: ${uploadError.message}`);
        continue;
      }

      const { data: pub } = supabase.storage.from("zamu-media").getPublicUrl(path);

      await supabase.from("zamu_media").insert({
        url: pub.publicUrl,
        storage_path: path,
        media_type: isVideo ? "video" : "image",
        category,
      });
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    load();
  }

  async function remove(item: ZamuMedia) {
    const supabase = createClient();
    await supabase.storage.from("zamu-media").remove([item.storage_path]);
    await supabase.from("zamu_media").delete().eq("id", item.id);
    load();
  }

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl md:text-3xl">
        Photos & Videos
      </h1>
      <p className="text-ink-soft mt-2">
        Upload real photos and videos of the property. They&apos;ll appear in
        the gallery and hero section automatically.
      </p>

      <div className="mt-8 rounded-2xl border border-dashed border-ink/25 p-8 flex flex-col items-center text-center">
        <Upload size={24} className="text-brass-deep mb-3" />
        <p className="text-sm font-medium mb-1">Upload photos or videos</p>
        <p className="text-xs text-ink-soft mb-5">JPG, PNG, or MP4 — choose a category first</p>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as MediaCategory)}
          className="mb-4 rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus-ring"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>

        <label className="inline-flex items-center gap-2 rounded-full bg-ink text-paper text-sm font-medium px-5 py-2.5 hover:bg-ink-soft transition cursor-pointer focus-ring">
          {uploading ? "Uploading…" : "Choose files"}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
        {error && <p className="mt-4 text-xs text-clay">{error}</p>}
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-ink-soft/60">Loading…</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <div key={item.id} className="relative aspect-square rounded-xl overflow-hidden bg-paper-dim group">
              {item.media_type === "video" ? (
                <>
                  <video src={item.url} className="h-full w-full object-cover" muted />
                  <PlayCircle size={28} className="absolute inset-0 m-auto text-paper" />
                </>
              ) : (
                <Image src={item.url} alt={item.caption ?? ""} fill className="object-cover" sizes="200px" />
              )}
              <span className="absolute top-2 left-2 rounded-full bg-ink/80 text-paper text-[10px] px-2 py-0.5">
                {CATEGORY_LABELS[item.category]}
              </span>
              <button
                onClick={() => remove(item)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-clay text-paper opacity-0 group-hover:opacity-100 transition focus-ring"
                aria-label="Delete"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          {media.length === 0 && (
            <p className="col-span-full text-sm text-ink-soft/60">No media uploaded yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
