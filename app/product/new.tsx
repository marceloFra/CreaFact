import { useState } from 'react';
import { ScrollView, View, TextInput, Switch, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function NewProduct() {
  const router = useRouter();
  const [internalCode, setInternalCode] = useState('');
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [includesIgv, setIncludesIgv] = useState(false);
  const [category, setCategory] = useState('');
  const [affectation, setAffectation] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [stock, setStock] = useState('');
  const [minStock, setMinStock] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCategories, setShowCategories] = useState(false);
  const [showAffectations, setShowAffectations] = useState(false);
  const categories = ['General', 'Electrónica', 'Alimentos'];
  const affectations = [
    'Gravado - Operación Onerosa',
    'Exonerado - Operación Onerosa',
    'Inafecto - Operación Onerosa',
  ];

  const inputStyle = {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    if (!internalCode) newErrors.internalCode = 'Requerido';
    if (!name) newErrors.name = 'Requerido';
    if (!price) newErrors.price = 'Requerido';
    if (!category) newErrors.category = 'Requerido';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      router.back();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 16 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="close" size={24} color="#0F766E" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
          <View>
            <ThemedText>Código interno</ThemedText>
            <TextInput value={internalCode} onChangeText={setInternalCode} style={inputStyle} />
            {errors.internalCode && <ThemedText style={{ color: 'red' }}>{errors.internalCode}</ThemedText>}
          </View>
          <View>
            <ThemedText>Código de barras</ThemedText>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 12 }}>
              <TextInput value={barcode} onChangeText={setBarcode} style={{ flex: 1, paddingVertical: 8 }} />
              <TouchableOpacity onPress={() => { }}>
                <IconSymbol name="camera.fill" size={24} color="#0F766E" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <ThemedText>Nombre</ThemedText>
            <TextInput value={name} onChangeText={setName} style={inputStyle} />
            {errors.name && <ThemedText style={{ color: 'red' }}>{errors.name}</ThemedText>}
          </View>
          <View>
            <ThemedText>Descripción</ThemedText>
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={[inputStyle, { height: 80 }]}
              multiline
            />
          </View>
          <View>
            <ThemedText>Precio unitario</ThemedText>
            <TextInput value={price} onChangeText={setPrice} keyboardType="numeric" style={inputStyle} />
            {errors.price && <ThemedText style={{ color: 'red' }}>{errors.price}</ThemedText>}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <ThemedText>Incluye IGV</ThemedText>
            <Switch value={includesIgv} onValueChange={setIncludesIgv} />
          </View>
          <View>
            <ThemedText>Categoría</ThemedText>
            <TouchableOpacity
              onPress={() => setShowCategories(!showCategories)}
              style={[inputStyle, { justifyContent: 'center' }]}
            >
              <ThemedText>{category || 'Seleccione'}</ThemedText>
            </TouchableOpacity>
            {showCategories && (
              <View style={{ borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, marginTop: 4 }}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => {
                      setCategory(cat);
                      setShowCategories(false);
                    }}
                    style={{ padding: 8 }}
                  >
                    <ThemedText>{cat}</ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          {errors.category && <ThemedText style={{ color: 'red' }}>{errors.category}</ThemedText>}
        </View>
        <View>
          <ThemedText>Afectación</ThemedText>
          <TouchableOpacity
            onPress={() => setShowAffectations(!showAffectations)}
            style={[inputStyle, { justifyContent: 'center' }]}
          >
            <ThemedText>{affectation || 'Seleccione'}</ThemedText>
          </TouchableOpacity>
          {showAffectations && (
            <View style={{ borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, marginTop: 4 }}>
              {affectations.map((af) => (
                <TouchableOpacity
                  key={af}
                  onPress={() => {
                    setAffectation(af);
                    setShowAffectations(false);
                  }}
                  style={{ padding: 8 }}
                >
                  <ThemedText>{af}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View>
          <ThemedText>Precio unitario de compra</ThemedText>
          <TextInput
            value={purchasePrice}
            onChangeText={setPurchasePrice}
            keyboardType="numeric"
            style={inputStyle}
          />
        </View>
        <View>
          <ThemedText>Stock</ThemedText>
          <TextInput value={stock} onChangeText={setStock} keyboardType="numeric" style={inputStyle} />
        </View>
        <View>
          <ThemedText>Stock mínimo</ThemedText>
          <TextInput value={minStock} onChangeText={setMinStock} keyboardType="numeric" style={inputStyle} />
        </View>
        <View>
          <ThemedText>Cargar imagen</ThemedText>
          <TouchableOpacity
            onPress={() => {
              setImage('imagen.png');
              Alert.alert('Seleccionar imagen no implementado');
            }}
            style={[
              inputStyle,
              { justifyContent: 'center', alignItems: 'center', paddingVertical: 12, borderStyle: 'dashed' },
            ]}
          >
            <ThemedText style={{ color: '#0F766E' }}>
              {image ? image : 'Seleccionar archivo'}
            </ThemedText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleSave}
          style={{ backgroundColor: '#0F766E', padding: 12, borderRadius: 12, alignItems: 'center', marginTop: 8 }}
        >
          <ThemedText style={{ color: '#fff' }}>Guardar</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

