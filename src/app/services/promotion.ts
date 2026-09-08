import { supabase } from "../lib/supabase";

export async function uploadPromotionImage(
  file: File
) {

  const fileExt =
    file.name.split(".").pop();

  const fileName =
    `${Date.now()}.${fileExt}`;

  const result =
  await supabase.storage
    .from("promotions")
    .upload(fileName, file);

console.log(result);

const { error } = result;

  if (error) {

    return {
      url: null,
      error,
    };

  }

  const { data } =
    supabase.storage
      .from("promotions")
      .getPublicUrl(fileName);

  return {

    url: data.publicUrl,

    error: null,

  };

}
export async function createPromotion(
  promotion: any
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      error: new Error("Debes iniciar sesión."),
    };
  }

  const slug = `${promotion.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}-${Date.now()}`;

  return await supabase
    .from("promotions")
    .insert({
      ...promotion,
      uid: user.id,
      slug,
    })
    .select()
    .single();
}

export async function getPromotions(
  businessId: number
) {

  return await supabase
    .from("promotions")
    .select("*")
    .eq("business_id", businessId)
    .order("id", {
      ascending: false,
    });

}

export async function getPromotion(
  id: number
) {

  return await supabase
    .from("promotions")
    .select("*")
    .eq("id", id)
    .single();

}
export async function updatePromotion(
  id: number,
  promotion: any
) {

  return await supabase
    .from("promotions")
    .update(promotion)
    .eq("id", id);

}

export async function deletePromotion(
  id: number
) {

  return await supabase
    .from("promotions")
    .delete()
    .eq("id", id);

}