import { apiFetch } from './api';

export interface Item {
  id: number;
  description: string;
  price: number;
  stock: number;
  image_url: string;
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
