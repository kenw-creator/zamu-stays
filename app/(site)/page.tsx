import { createClient } from "@/lib/supabase/server";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { GallerySection } from "@/components/GallerySection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { LocationSection } from "@/components/LocationSection";
import { ContactSection } from "@/components/ContactSection";
import type { ZamuMedia, ZamuReview } from "@/lib/types";

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: media }, { data: reviews }] = await Promise.all([
    supabase
      .from("zamu_media")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
    supabase
      .from("zamu_reviews")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
  ]);

  const allMedia = (media ?? []) as ZamuMedia[];

  // Prefer exterior shots first for the hero mosaic, then fill with anything else
  const exteriorFirst = [
    ...allMedia.filter((m) => m.category === "exterior"),
    ...allMedia.filter((m) => m.category !== "exterior"),
  ];

  return (
    <>
      <Hero photos={exteriorFirst} />
      <GallerySection media={allMedia} />
      <AboutSection />
      <AmenitiesSection />
      <ReviewsSection reviews={(reviews ?? []) as ZamuReview[]} />
      <LocationSection />
      <ContactSection />
    </>
  );
}
