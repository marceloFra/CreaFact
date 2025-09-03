import React, { useRef, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

import { SearchItem, searchItems } from '@/services/documents';
import { ThemedText } from './ThemedText';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSelect: (item: SearchItem) => void;
  inputStyle?: any;
}

export function NameAutocomplete({ value, onChangeText, onSelect, inputStyle }: Props) {
  const [inputHeight, setInputHeight] = useState(0);
  const [suggestions, setSuggestions] = useState<SearchItem[]>([]); // ⬅️ aquí defines Suggestions
  const [loading, setLoading] = useState(false);
  const lastQueryRef = useRef('');

  const clear = () => setSuggestions([]);

  const handleChange = async (text: string) => {
    onChangeText(text);

    if (text.length <= 2) {
      clear();
      return;
    }

    try {
      setLoading(true);
      lastQueryRef.current = text;

      const res = await searchItems(text);
      const items: SearchItem[] = res?.data?.items ?? [];

      // evita que respuestas antiguas sobreescriban el estado
      if (lastQueryRef.current === text) {
        setSuggestions(items);
      }
    } catch {
      clear();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ position: 'relative', overflow: 'visible' }}>
      <TextInput
        value={value}
        onChangeText={handleChange}     // ⬅️ usa handleChange
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
          <ScrollView keyboardShouldPersistTaps="handled">
            {suggestions.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  onSelect(item);
                  clear();
                }}
                style={{ padding: 8 }}
              >
                <ThemedText style={{ padding: 8 }}>{item.description}</ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Opcional: indicador de carga */}
      {loading && suggestions.length === 0 && (
        <View style={{ position: 'absolute', top: inputHeight + 4, left: 8 }}>
          <ThemedText>Buscando…</ThemedText>
        </View>
      )}
    </View>
  );
}
