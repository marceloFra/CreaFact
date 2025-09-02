import { useState } from 'react';
import { AutocompleteDropdown as NativeDropdown } from 'react-native-autocomplete-dropdown';

import { SearchItem, searchItems } from '@/services/documents';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSelect: (item: SearchItem) => void;
  inputStyle?: any;
}

interface DropdownItem {
  id: string;
  title: string;
  item: SearchItem;
}

export function AutocompleteDropdown({ value, onChangeText, onSelect, inputStyle }: Props) {
  const [items, setItems] = useState<DropdownItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (text: string) => {
    onChangeText(text);
    if (text.length < 3) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const results = await searchItems(text);
      setItems(results.map(it => ({ id: String(it.id), title: it.description, item: it })));
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NativeDropdown
      dataSet={items}
      loading={loading}
      onSelectItem={(item) => {
        if (item && (item as DropdownItem).item) {
          onSelect((item as DropdownItem).item);
        }
      }}
      textInputProps={{
        value,
        onChangeText: handleChange,
        style: inputStyle,
        autoCorrect: true,
        autoComplete: 'name',
      }}
    />
  );
}

