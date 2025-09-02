import { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

import { SearchItem, searchItems } from '@/services/documents';
import { ThemedText } from './ThemedText';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSelect: (item: SearchItem) => void;
}

export function NameAutocomplete({ value, onChangeText, onSelect }: Props) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleChange = (text: string) => {
    setQuery(text);
    onChangeText(text);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (text.length > 2) {
        try {
          const items = await searchItems(text);
          setSuggestions(items);
        } catch {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);
  };

  return (
    <Autocomplete
      data={suggestions}
      value={query}
      onChangeText={handleChange}
      flatListProps={{
        keyboardShouldPersistTaps: 'handled',
        keyExtractor: item => item.id,
        renderItem: ({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setQuery(item.description);
              onSelect(item);
              setSuggestions([]);
            }}
            style={{ padding: 8 }}
          >
            <ThemedText>{item.description}</ThemedText>
          </TouchableOpacity>
        ),
      }}
      inputContainerStyle={{
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 12,
      }}
      listStyle={{
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        marginTop: 4,
      }}
    />
  );
}
