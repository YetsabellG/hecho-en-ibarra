import { supabase } from "../lib/supabase";

export type EventInput = {
  uid: string;
  business_id: number;
  title: string;
  slug: string;
  description?: string;
  event_date?: string;
  event_time?: string;
  location?: string;
  image?: string;
  link?: string;
  status?: "draft" | "published" | "hidden";
};

export async function getPublishedEvents() {
  return supabase.from("events").select("*").eq("status", "published").order("event_date", { ascending: true });
}

export async function getBusinessEvents(businessId: number) {
  return supabase.from("events").select("*").eq("business_id", businessId).order("event_date", { ascending: true });
}

export async function createEvent(data: EventInput) {
  return supabase.from("events").insert(data).select().single();
}

export async function updateEvent(id: number, data: Partial<EventInput>) {
  return supabase.from("events").update(data).eq("id", id);
}

export async function deleteEvent(id: number) {
  return supabase.from("events").delete().eq("id", id);
}
