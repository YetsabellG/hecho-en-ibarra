import { supabase } from "../lib/supabase";

export interface BusinessRecord {
  id: number;
  uid: string | null;
  name: string;
  slug: string;
  description: string | null;
  category: string | null;
  city: string | null;
  address: string | null;
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  website: string | null;
  image: string | null;
  home_image: string | null;
  home_image_position: "left" | "center" | "right" | string | null;
  verified: boolean | null;
  premium: boolean | null;
  products: number | null;
  rating: number | null;
  visits: number | null;
  favorites: number | null;
  created_at: string | null;
}

export type BusinessInput = Partial<Omit<BusinessRecord, "id" | "created_at">> & {
  uid?: string;
};

export async function createBusiness(data: BusinessInput) {
  return await supabase.from("businesses").insert(data);
}

export async function getBusiness(uid: string) {
  return await supabase.from("businesses").select("*").eq("uid", uid).single<BusinessRecord>();
}

export async function getBusinessBySlug(slug: string) {
  return await supabase.from("businesses").select("*").eq("slug", slug).single<BusinessRecord>();
}

export async function getPublicBusinesses() {
  return await supabase.from("businesses").select("*").eq("verified", true).order("created_at", { ascending: false });
}

export async function updateBusiness(id: number, data: BusinessInput) {
  return await supabase.from("businesses").update(data).eq("id", id);
}
