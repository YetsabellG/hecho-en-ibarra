import { supabase } from "../lib/supabase";
import { hasPaidPromotionAccess } from "../lib/planAccess";

async function requirePaidPromotionAccess() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, error: new Error("Debes iniciar sesión.") };

  const { data: business, error } = await supabase
    .from("businesses")
    .select("id, plan, premium_until")
    .eq("uid", user.id)
    .maybeSingle();
  if (error) return { user: null, error };
  if (!business) return { user: null, error: new Error("No encontramos tu emprendimiento asociado.") };
  if (!hasPaidPromotionAccess(business.plan, business.premium_until)) {
    return { user: null, error: new Error("Las promociones están disponibles en nuestros planes de pago. Revisa los planes para desbloquear esta opción.") };
  }
  return { user, error: null };
}

export type PromotionStatus = "active" | "inactive" | "hidden";
export type PromotionType = "percentage" | "2x1" | "3x2" | "special_price" | "free_shipping" | "coupon" | "custom";

export interface PromotionRecord {
  id: number;
  uid: string;
  business_id: number;
  title: string;
  slug: string;
  description: string | null;
  discount: number | null;
  image: string | null;
  start_date: string | null;
  end_date: string | null;
  status: PromotionStatus | string | null;
  created_at: string;
  promotion_type: PromotionType | string | null;
  special_price: number | null;
  coupon_code: string | null;
  custom_text: string | null;
  promotion_link: string | null;
  promo_value: string | null;
  promo_code: string | null;
  promo_link: string | null;
}

export type PromotionInput = Partial<Omit<PromotionRecord, "id" | "uid" | "slug" | "created_at">> & { title: string };

export async function uploadPromotionImage(file: File) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const fileName = `${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from("promotions").upload(fileName, file);
  if (error) return { url: null, error };
  const { data } = supabase.storage.from("promotions").getPublicUrl(fileName);
  return { url: data.publicUrl, error: null };
}

export async function createPromotion(promotion: PromotionInput) {
  const { user, error } = await requirePaidPromotionAccess();
  if (error || !user) return { data: null, error: error ?? new Error("Debes iniciar sesión.") };
  const slug = `${promotion.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}-${Date.now()}`;
  return await supabase.from("promotions").insert({ ...promotion, uid: user.id, slug }).select().single<PromotionRecord>();
}

export async function getPromotions(businessId: number, uid?: string) {
  const query = supabase.from("promotions").select("*").eq("business_id", businessId).order("id", { ascending: false });
  const result = await query;
  if ((!result.data || result.data.length === 0) && uid) {
    return await supabase.from("promotions").select("*").eq("uid", uid).order("id", { ascending: false });
  }
  return result;
}

export async function getPromotion(id: number) {
  return await supabase.from("promotions").select("*").eq("id", id).single<PromotionRecord>();
}

export async function updatePromotion(id: number, promotion: Partial<PromotionInput>) {
  const { user, error } = await requirePaidPromotionAccess();
  if (error || !user) return { data: null, error: error ?? new Error("Debes iniciar sesión.") };
  return await supabase.from("promotions").update(promotion).eq("id", id).eq("uid", user.id);
}

export async function deletePromotion(id: number) {
  const { user, error } = await requirePaidPromotionAccess();
  if (error || !user) return { data: null, error: error ?? new Error("Debes iniciar sesión.") };
  return await supabase.from("promotions").delete().eq("id", id).eq("uid", user.id);
}
