import { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

import { ThemedText } from './ThemedText';
import { searchItems, SearchItem } from '@/services/documents';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSelect: (item: SearchItem) => void;
  inputStyle?: any;
}

export function NameAutocomplete({ value, onChangeText, onSelect, inputStyle }: Props) {
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]);
  const [inputHeight, setInputHeight] = useState(0);

  const handleChange = async (text: string) => {
    onChangeText(text);
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
  };

  return (
    <View style={{ position: 'relative', overflow: 'visible' }}>
      <TextInput
        value={value}
        onChangeText={handleChange}
        style={inputStyle}
        autoCorrect
        autoComplete="name"
        onLayout={({ nativeEvent }) => setInputHeight(nativeEvent.layout.height)}
      />
      {suggestions.length > 0 && (
        <View
          style={{
            position: 'absolute',
            top: inputHeight,
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#E2E8F0',
            borderRadius: 12,
            marginTop: 4,
          }}
        >
          {suggestions.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                onSelect(item);
                setSuggestions([]);
              }}
            >
              <ThemedText style={{ padding: 8 }}>{item.description}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

