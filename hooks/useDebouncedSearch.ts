import { useEffect, useState } from 'react';

export function useDebouncedSearch<T>(
  text: string,
  delay: number,
  searchFn: (query: string) => Promise<T[]>
) {
  const [results, setResults] = useState<T[]>([]);

  useEffect(() => {
    if (text.length <= 2) {
      setResults([]);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        const res = await searchFn(text);
        setResults(res);
      } catch {
        setResults([]);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [text, delay, searchFn]);

  const clear = () => setResults([]);

  return { results: results, clear };
}
