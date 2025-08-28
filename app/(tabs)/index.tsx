import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { fetchItems, Item } from '@/services/items';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';

export default function HomeScreen() {
  const { session, loading: authLoading } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

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
    if (!authLoading && session) load();
  }, [authLoading, session]);

  const filtered = items.filter(i =>
    i.description.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading || loading) {
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
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={{ padding: 16 }}>
            <ThemedText type="title" style={{ marginBottom: 12 }}>PRODUCTOS</ThemedText>
            <TextInput
              placeholder="Buscar"
              value={search}
              onChangeText={setSearch}
              style={{
                borderWidth: 1,
                borderColor: '#E2E8F0',
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 8,
                marginBottom: 12,
              }}
            />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button title="BUSCAR" onPress={() => { }} />
              <Button title="ACCION" onPress={() => { }} />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 16 }}>
            <Image source={{ uri: item.image_url }} style={{ width: 64, height: 64, marginRight: 16 }} />
            <View>
              <ThemedText type="subtitle">{item.description}</ThemedText>
              <ThemedText>Precio: S/ {item.price}</ThemedText>
              <ThemedText>Stock: {item.stock}</ThemedText>
            </View>
          </View>
        )}
      />
    </ThemedView>
  );
}
