import { apiFetch } from './api';

export interface Item {
  id: number;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

export async function fetchItems(): Promise<Item[]> {
  return apiFetch('/api/items');
}
