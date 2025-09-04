import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Switch, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NameAutocomplete } from '@/components/NameAutocomplete';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { apiFetch } from '@/services/api';
import { Category, fetchCategories } from '@/services/categories';

export default function NewProduct() {
  const router = useRouter();
  const [internalCode, setInternalCode] = useState('');
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [includesIgv, setIncludesIgv] = useState(true);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [affectation, setAffectation] = useState<string>('10');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [stock, setStock] = useState('');
  const [minStock, setMinStock] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const affectations = [
    { code: '10', label: 'Gravado – Operación Onerosa' },
    { code: '11', label: 'Gravado – Retiro por premio' },
    { code: '12', label: 'Gravado – Retiro por donación' },
    { code: '13', label: 'Gravado – Retiro' },
    { code: '14', label: 'Gravado – Retiro por publicidad' },
    { code: '15', label: 'Gravado – Bonificaciones' },
    { code: '16', label: 'Gravado – Retiro por entrega a trabajadores' },
    { code: '17', label: 'Gravado – IVAP' },
    { code: '20', label: 'Exonerado – Operación Onerosa' },
    { code: '21', label: 'Exonerado – Transferencia Gratuita' },
    { code: '30', label: 'Inafecto – Operación Onerosa' },
    { code: '31', label: 'Inafecto – Retiro por Bonificación' },
    { code: '32', label: 'Inafecto – Retiro' },
    { code: '33', label: 'Inafecto – Retiro por Muestras Médicas' },
    { code: '34', label: 'Inafecto – Retiro por Convenio Colectivo' },
    { code: '35', label: 'Inafecto – Retiro por premio' },
    { code: '36', label: 'Inafecto – Retiro por publicidad' },
    { code: '37', label: 'Inafecto – Transferencia gratuita' },
    { code: '40', label: 'Exportación de bienes o servicios' },
  ];

  useEffect(() => {
    fetchCategories().then(setCategories).catch(e => Alert.alert('Error', e.message));
  }, []);

  const inputStyle = {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  };

  const handleSave = async () => {
    const newErrors: Record<string, string> = {};
    if (!internalCode) newErrors.internalCode = 'Requerido';
    if (!name) newErrors.name = 'Requerido';
    if (!price) newErrors.price = 'Requerido';
    if (!category) newErrors.category = 'Requerido';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        await apiFetch('/api/sellnow/items', {
          method: 'POST',
          body: JSON.stringify({
            internalCode,
            barcode,
            name,
            description,
            price,
            includesIgv,
            category: Number(category),
            affectation,
            purchasePrice,
            stock,
            minStock,
            image,
          }),
        });
        router.back();
      } catch (e: any) {
        Alert.alert('Error', e.message);
      }
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
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            nestedScrollEnabled
            contentContainerStyle={{ padding: 16, gap: 12 }}
            keyboardShouldPersistTaps="handled"
          >
          <View>
            <ThemedText>Código interno</ThemedText>
            <View style={[inputStyle, { flexDirection: 'row', alignItems: 'center' }]}>
              <TextInput value={internalCode} onChangeText={setInternalCode} style={{ flex: 1 }} />
              {internalCode !== '' && (
                <TouchableOpacity onPress={() => setInternalCode('')} style={{ paddingHorizontal: 8 }}>
                  <MaterialIcons name="close" size={20} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>
            {errors.internalCode && <ThemedText style={{ color: 'red' }}>{errors.internalCode}</ThemedText>}
          </View>
          <View>
            <ThemedText>Código de barras</ThemedText>
            <View
              style={[
                inputStyle,
                { flexDirection: 'row', alignItems: 'center' },
              ]}
            >
              <TextInput value={barcode} onChangeText={setBarcode} style={{ flex: 1 }} />
              {barcode !== '' && (
                <TouchableOpacity onPress={() => setBarcode('')} style={{ paddingHorizontal: 8 }}>
                  <MaterialIcons name="close" size={20} color="#94A3B8" />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => { }}>
                <IconSymbol name="camera.fill" size={24} color="#0F766E" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <ThemedText>Nombre</ThemedText>
            <NameAutocomplete
              value={name}
              onChangeText={setName}
              onSelect={(item) => {
                setName(item.description);
                setPrice(String(item.sale_unit_price));
              }}
              inputStyle={inputStyle}
            />
            {errors.name && <ThemedText style={{ color: 'red' }}>{errors.name}</ThemedText>}
          </View>
            <View>
              <ThemedText>Descripción</ThemedText>
              <View style={[inputStyle, { flexDirection: 'row', alignItems: 'center', height: 80 }]}>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  style={{ flex: 1, textAlignVertical: 'top', height: '100%' }}
                />
                {description !== '' && (
                  <TouchableOpacity onPress={() => setDescription('')} style={{ paddingHorizontal: 8 }}>
                    <MaterialIcons name="close" size={20} color="#94A3B8" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View>
              <ThemedText>Precio unitario</ThemedText>
              <View style={[inputStyle, { flexDirection: 'row', alignItems: 'center' }]}>
                <TextInput
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                  style={{ flex: 1 }}
                />
                {price !== '' && (
                  <TouchableOpacity onPress={() => setPrice('')} style={{ paddingHorizontal: 8 }}>
                    <MaterialIcons name="close" size={20} color="#94A3B8" />
                  </TouchableOpacity>
                )}
              </View>
              {errors.price && <ThemedText style={{ color: 'red' }}>{errors.price}</ThemedText>}
            </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <ThemedText>Incluye IGV</ThemedText>
            <Switch value={includesIgv} onValueChange={setIncludesIgv} />
          </View>
          <View>
            <ThemedText>Categoría</ThemedText>
            <View style={inputStyle}>
              <Picker
                selectedValue={category}
                onValueChange={setCategory}
              >
                <Picker.Item label="Seleccione" value="" />
                {categories.map((cat) => (
                  <Picker.Item key={cat.id} label={cat.name} value={String(cat.id)} />
                ))}
              </Picker>
            </View>
            {errors.category && <ThemedText style={{ color: 'red' }}>{errors.category}</ThemedText>}
          </View>
          <View>
            <ThemedText>Afectación</ThemedText>
            <View style={inputStyle}>
              <Picker
                selectedValue={affectation}
                onValueChange={setAffectation}
              >
                <Picker.Item label="Seleccione" value="" />
                {affectations.map((af) => (
                  <Picker.Item key={af.code} label={af.label} value={af.code} />
                ))}
              </Picker>
            </View>
          </View>
        <View>
          <ThemedText>Precio unitario de compra</ThemedText>
          <View style={[inputStyle, { flexDirection: 'row', alignItems: 'center' }]}>
            <TextInput
              value={purchasePrice}
              onChangeText={setPurchasePrice}
              keyboardType="numeric"
              style={{ flex: 1 }}
            />
            {purchasePrice !== '' && (
              <TouchableOpacity onPress={() => setPurchasePrice('')} style={{ paddingHorizontal: 8 }}>
                <MaterialIcons name="close" size={20} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <ThemedText>Stock</ThemedText>
          <View style={[inputStyle, { flexDirection: 'row', alignItems: 'center' }]}>
            <TextInput
              value={stock}
              onChangeText={setStock}
              keyboardType="numeric"
              style={{ flex: 1 }}
            />
            {stock !== '' && (
              <TouchableOpacity onPress={() => setStock('')} style={{ paddingHorizontal: 8 }}>
                <MaterialIcons name="close" size={20} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <ThemedText>Stock mínimo</ThemedText>
          <View style={[inputStyle, { flexDirection: 'row', alignItems: 'center' }]}>
            <TextInput
              value={minStock}
              onChangeText={setMinStock}
              keyboardType="numeric"
              style={{ flex: 1 }}
            />
            {minStock !== '' && (
              <TouchableOpacity onPress={() => setMinStock('')} style={{ paddingHorizontal: 8 }}>
                <MaterialIcons name="close" size={20} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>
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
    </KeyboardAvoidingView>
    </ThemedView>
    </SafeAreaView>
  );
}

