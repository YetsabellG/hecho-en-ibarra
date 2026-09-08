import { supabase } from "../lib/supabase";

export type BusinessInput = {
  name: string;
  slug: string;
  description?: string;
  category?: string;
  city?: string;
  address?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  website?: string;
  image?: string;
};

export async function createBusiness(data: BusinessInput & { uid: string }) {
  return await supabase.from("businesses").insert([data]);
}

export async function getBusiness(uid: string) {
  return await supabase.from("businesses").select("*").eq("uid", uid).single();
}

export async function updateBusiness(id: number, data: Partial<BusinessInput>) {
  return await supabase.from("businesses").update(data).eq("id", id);
}

export async function getPublicBusinesses() {
  return await supabase.from("businesses").select("*").eq("verified", true).order("premium", { ascending: false }).order("name", { ascending: true });
}

export async function getBusinessBySlug(slug: string) {
  return await supabase.from("businesses").select("*").eq("slug", slug).eq("verified", true).single();
}
