import { apiFetch } from "./api";

export interface Item {
  id: number;
  unit_type_id: number;
  description: string;
  internal_id: string;
  barcode: string;
  stock: number;
  sale_unit_price: number;
  image_url: string;
  favorite: boolean;
}

export async function fetchItems(): Promise<Item[]> {
  const { data } = await apiFetch("/api/sellnow/items");
  return data as Item[];
}

