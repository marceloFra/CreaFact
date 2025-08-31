import { apiFetch } from './api';

export interface Category {
  id: number;
  name: string;
  image_url: string;
}

export async function fetchCategories(): Promise<Category[]> {
  const resp = await apiFetch('/api/categories-records');
  const arr = resp.data ?? [];
  return arr.map((c: any) => ({
    id: c.id,
    name: c.name,
    image_url: c.image_url,
  }));
}
