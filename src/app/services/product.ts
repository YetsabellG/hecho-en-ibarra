import { supabase } from "../lib/supabase";

export type ProductStatus = "available" | "out_of_stock" | "hidden";

export interface ProductRecord {
  id: number;
  uid: string;
  business_id: number;
  name: string;
  slug: string | null;
  description: string | null;
  price: number | null;
  stock: number | null;
  category: string | null;
  image: string | null;
  featured: boolean | null;
  active: boolean | null;
  created_at: string;
  status: ProductStatus | string | null;
  item_type: "product" | "service" | string | null;
}

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
  status: ProductStatus;
  item_type?: "product" | "service";
  featured?: boolean;
  active?: boolean;
}

export async function createProduct(data: CreateProductData) {
  return await supabase.from("products").insert(data);
}

export async function getProducts(business_id: number) {
  return await supabase
    .from("products")
    .select("*")
    .eq("business_id", business_id)
    .order("id", { ascending: false });
}

export const getBusinessProducts = getProducts;
export const getProductsByBusiness = getProducts;

export async function getProduct(id: number) {
  return await supabase.from("products").select("*").eq("id", id).single<ProductRecord>();
}

export async function updateProduct(
  id: number,
  data: Partial<CreateProductData>,
) {
  return await supabase.from("products").update(data).eq("id", id);
}

export async function deleteProduct(id: number) {
  return await supabase.from("products").delete().eq("id", id);
}

export async function uploadProductImage(file: File) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const fileName = `${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from("products").upload(fileName, file);

  if (error) return { error, url: null };
  const { data } = supabase.storage.from("products").getPublicUrl(fileName);
  return { error: null, url: data.publicUrl };
}
