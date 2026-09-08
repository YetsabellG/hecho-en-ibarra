import { supabase } from "../lib/supabase";

export interface CreateProductData {
  uid: string;
  business_id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  status: string;
}

export async function createProduct(data: CreateProductData) {
  return await supabase
    .from("products")
    .insert(data);
}

export async function getProducts(business_id: number) {
  return await supabase
    .from("products")
    .select("*")
    .eq("business_id", business_id)
    .order("id", { ascending: false });
}

export async function getBusinessProducts(businessId: number) {
  return await supabase
    .from("products")
    .select("*")
    .eq("business_id", businessId)
    .order("id", { ascending: false });
}

export async function getProductsByBusiness(businessId: number) {
  return await supabase
    .from("products")
    .select("*")
    .eq("business_id", businessId)
    .order("id", { ascending: false });
}

export async function getProduct(id: number) {
  return await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
}

export async function updateProduct(
  id: number,
  data: Partial<CreateProductData>
) {
  return await supabase
    .from("products")
    .update(data)
    .eq("id", id);
}

export async function deleteProduct(id: number) {
  return await supabase
    .from("products")
    .delete()
    .eq("id", id);
}

export async function uploadProductImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, file);

  if (error) {
    return {
      error,
      url: null,
    };
  }

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  return {
    error: null,
    url: data.publicUrl,
  };
}