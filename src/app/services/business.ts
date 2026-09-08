import { supabase } from "../lib/supabase";

export async function createBusiness(data: any) {
  return await supabase
    .from("businesses")
    .insert([data]);
}

export async function getBusiness(uid: string) {
  return await supabase
    .from("businesses")
    .select("*")
    .eq("uid", uid)
    .single();
}

