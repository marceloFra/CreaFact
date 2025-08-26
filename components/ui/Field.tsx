import { View, Text, TextInput, TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Field({
  label, icon, ...props
}: { label: string; icon?: keyof typeof Feather.glyphMap } & TextInputProps) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ marginBottom: 6, color: "#3A4B4B", fontWeight: "600" }}>{label}</Text>
      <View style={{
        flexDirection: "row", alignItems: "center",
        borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12,
        paddingHorizontal: 12, backgroundColor: "#F9FAFB"
      }}>
        {icon && <Feather name={icon} size={18} color="#6b7280" />}
        <TextInput style={{ flex: 1, paddingVertical: 12, marginLeft: icon ? 8 : 0 }} {...props}/>
      </View>
    </View>
  );
}
