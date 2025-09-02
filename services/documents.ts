import { apiFetch } from './api';

export interface SearchItem {
  id: number;
  item_code: string;
  full_description: string;
  description: string;
  sale_unit_price: number;
  stock: number;
  image_url: string | null;
}

interface SearchOptions {
  search_by_barcode?: boolean;
  search_item_by_barcode_presentation?: boolean;
  search_factory_code_items?: boolean;
}

export async function searchItems(input: string, opt: SearchOptions = {}): Promise<SearchItem[]> {
  if (input.length < 3) return [];

  const params = new URLSearchParams({
    input,
    search_by_barcode: opt.search_by_barcode ? '1' : '0',
    search_item_by_barcode_presentation: opt.search_item_by_barcode_presentation ? '1' : '0',
    search_factory_code_items: opt.search_factory_code_items ? '1' : '0',
  });

  const resp = await apiFetch(`/api/document/search-items?${params.toString()}`);
    console.log('searchItems response:', resp);

  return resp as SearchItem[];
}
