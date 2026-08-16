export type MediaCategory =
  | "bedroom"
  | "living_room"
  | "kitchen"
  | "bathroom"
  | "exterior";

export type ZamuMedia = {
  id: string;
  url: string;
  storage_path: string;
  media_type: "image" | "video";
  category: MediaCategory;
  caption: string | null;
  sort_order: number;
  created_at: string;
};

export type ZamuReview = {
  id: string;
  author_name: string;
  rating: number;
  review_text: string;
  review_date: string | null;
  source: "google" | "manual";
  owner_response: string | null;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
};

export type BookingStatus = "pending" | "approved" | "declined" | "cancelled";

export type ZamuBooking = {
  id: string;
  guest_name: string;
  phone: string;
  guests_count: number;
  check_in: string;
  check_out: string;
  message: string | null;
  status: BookingStatus;
  created_at: string;
};

export type ZamuBlockedDate = {
  id: string;
  start_date: string;
  end_date: string;
  reason: string | null;
  created_at: string;
};

export const CATEGORY_LABELS: Record<MediaCategory, string> = {
  bedroom: "Bedroom",
  living_room: "Living Room",
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  exterior: "Exterior",
};
