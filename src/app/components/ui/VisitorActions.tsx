"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { supabase } from "../../lib/supabase";

type Props = { entityType: "business" | "product" | "promotion"; entityId: number };
export default function VisitorActions({ entityType, entityId }: Props) {
  const [saved, setSaved] = useState(false);
  useEffect(() => { async function load() { const { data: { user } } = await supabase.auth.getUser(); if (!user) return; await supabase.from("visitor_clicks").insert({ user_id: user.id, entity_type: entityType, entity_id: entityId }); const { data } = await supabase.from("visitor_favorites").select("id").match({ user_id: user.id, entity_type: entityType, entity_id: entityId }).maybeSingle(); setSaved(Boolean(data)); } void load(); }, [entityId, entityType]);
  async function toggle() { const { data: { user } } = await supabase.auth.getUser(); if (!user) { window.location.href = "/auth/visitante"; return; } if (saved) { await supabase.from("visitor_favorites").delete().match({ user_id: user.id, entity_type: entityType, entity_id: entityId }); setSaved(false); } else { await supabase.from("visitor_favorites").insert({ user_id: user.id, entity_type: entityType, entity_id: entityId }); setSaved(true); } }
  return <button onClick={toggle} className="flex items-center gap-2 rounded-full border border-[#eadbca] px-4 py-3 text-sm font-bold text-[#6f1519] hover:bg-[#f4e7d9]"><Heart size={17} fill={saved ? "currentColor" : "none"}/> {saved ? "Guardado" : "Guardar"}</button>;
}
