import { supabase } from "../lib/supabase";

export async function createBusiness(data: unknown) {
  return await supabase.from("businesses").insert([data]);
}

export async function getBusiness(uid: string) {
  return await supabase
    .from("businesses")
    .select("*")
    .eq("uid", uid)
    .single();
}

export async function getPublicBusinesses() {
  return await supabase
    .from("businesses")
    .select("*")
    .eq("verified", true)
    .order("premium", { ascending: false })
    .order("name", { ascending: true });
}

export async function getBusinessBySlug(slug: string) {
  return await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .eq("verified", true)
    .single();
}
