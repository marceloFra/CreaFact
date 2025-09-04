import { apiFetch } from './api';

export interface Item {
  id: number;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

export interface CreateItemPayload {
  internal_id: string;
  description: string;
  unit_type_id: string;
  currency_type_id: string;
  sale_unit_price: number;
  purchase_unit_price: number;
  stock: number;
  stock_min: number;
  sale_affectation_igv_type_id: string;
  purchase_affectation_igv_type_id: string;
  item_code?: string;
  barcode?: string;
  image?: string;
  temp_path?: string;
  image_url?: string;
}

export interface CreatedItem {
  id: number;
  item_id: number;
  name: string;
  full_description: string;
  description: string;
  currency_type_id: string;
  internal_id: string;
  item_code: string | null;
  barcode: string | null;
  currency_type_symbol: string;
  sale_unit_price: string;
  purchase_unit_price: number;
  unit_type_id: string;
  sale_affectation_igv_type_id: string;
  purchase_affectation_igv_type_id: string;
  calculate_quantity: boolean;
  has_igv: boolean;
  is_set: boolean;
  aux_quantity: number;
  image_url?: string | null;
}

export async function fetchItems(): Promise<Item[]> {
  const response = await apiFetch('/api/sellnow/items');
  const arr = response.data ?? [];

  return arr.map((i: any) => ({
    id: i.id,
    description: i.description,
    price: i.price,
    stock: i.stock,
    image_url: i.image_url,
  }));
}

export async function createItem(payload: CreateItemPayload): Promise<CreatedItem> {
  const resp = await apiFetch('/api/item', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return resp.data as CreatedItem;
}
