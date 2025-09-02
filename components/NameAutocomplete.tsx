import { useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';

import { SearchItem, searchItems } from '@/services/documents';
import { ThemedText } from './ThemedText';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSelect: (item: SearchItem) => void;
  inputStyle?: any;
}

export function NameAutocomplete({ value, onChangeText, onSelect, inputStyle }: Props) {
  const [inputHeight, setInputHeight] = useState(0);
  const { results: suggestions, clear } = useDebouncedSearch<SearchItem>(
    value,
    500,
    searchItems
  );

  return (
    <View style={{ position: 'relative', overflow: 'visible' }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
        autoCorrect
        autoComplete="name"
        onLayout={({ nativeEvent }) => setInputHeight(nativeEvent.layout.height)}
      />
      {suggestions.length > 0 && (
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={suggestions}
          keyExtractor={item => item.id.toString()}
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
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onSelect(item);
                clear();
              }}
              style={{ padding: 8 }}
            >
              <ThemedText style={{ padding: 8 }}>{item.description}</ThemedText>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

