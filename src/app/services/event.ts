import { supabase } from "../lib/supabase";

export type EventStatus = "draft" | "published" | "hidden";

export interface EventRecord {
  id: number;
  uid: string;
  business_id: number;
  title: string;
  slug: string;
  description: string | null;
  event_date: string | null;
  event_time: string | null;
  location: string | null;
  image: string | null;
  link: string | null;
  status: EventStatus | string;
  created_at: string;
}

export interface EventInput {
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
  status: EventStatus;
}

export async function getEvents(businessId?: number) {
  let query = supabase.from("events").select("*").order("event_date", { ascending: true });
  if (businessId) query = query.eq("business_id", businessId);
  return await query;
}

export async function getPublishedEvents() {
  return await supabase.from("events").select("*").eq("status", "published").order("event_date", { ascending: true });
}

export async function createEvent(data: EventInput) {
  return await supabase.from("events").insert(data).select("*").single<EventRecord>();
}

export async function updateEvent(id: number, data: Partial<EventInput>) {
  return await supabase.from("events").update(data).eq("id", id);
}

export async function deleteEvent(id: number) {
  return await supabase.from("events").delete().eq("id", id);
}
