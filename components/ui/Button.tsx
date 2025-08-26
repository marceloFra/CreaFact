import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

export default function Button({
  title, onPress, disabled, loading
}: { title: string; onPress: () => void; disabled?: boolean; loading?: boolean }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        backgroundColor: disabled ? "#9CA3AF" : "#0F766E",
        paddingVertical: 14, borderRadius: 12, alignItems: "center"
      }}>
      {loading ? <ActivityIndicator color="#fff" /> :
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "800", letterSpacing: 0.5 }}>
          {title}
        </Text>}
    </TouchableOpacity>
  );
}
