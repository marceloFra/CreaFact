import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { fetchItems, Item } from '@/services/items';

export default function HomeScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (e: any) {
        setError(e.message || 'Error loading items');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <FlatList<Item>
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 16 }}>
            <Image source={{ uri: item.image_url }} style={{ width: 64, height: 64, marginRight: 16 }} />
            <View>
              <ThemedText type="subtitle">{item.description}</ThemedText>
              <ThemedText>Precio: {item.price}</ThemedText>
              <ThemedText>Stock: {item.stock}</ThemedText>
            </View>
          </View>
        )}
      />
    </ThemedView>
  );
}
