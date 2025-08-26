import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import Button from "../../components/ui/Button";
import Field from "../../components/ui/Field";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const urlOk = useMemo(
    () => /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/.*)?$/i.test(url.trim()),
    [url]
  );
  const emailOk = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);
  const canSubmit = urlOk && emailOk && password.length >= 6 && !loading;

  const onSubmit = async () => {
    setError(null);
    try {
      setLoading(true);
      await login(url, email, password);
    } catch (e: any) {
      setError(e.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#E6F2F0" }}
                          behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: "center" }}>
        {/* Encabezado */}
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <View style={{
            width: 56, height: 56, borderRadius: 12, borderWidth: 2, borderColor: "#0A5C63",
            justifyContent: "center", alignItems: "center", marginBottom: 12, backgroundColor: "#fff"
          }}>
            <Text style={{ fontSize: 28, fontWeight: "900" }}>F</Text>
          </View>
          <Text style={{ fontSize: 24, fontWeight: "800", color: "#0A5C63", letterSpacing: 0.5 }}>
            BIENVENIDO
          </Text>
        </View>

        {/* Tarjeta */}
        <View style={{
          backgroundColor: "#fff", borderRadius: 16, padding: 16,
          shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 }, elevation: 4
        }}>
          <Field label="URL" icon="link-2" value={url}
            onChangeText={setUrl} keyboardType="url"
            placeholder="demo.pos.createcsolutions.com" autoCapitalize="none" />
          <Field label="Correo electrónico" icon="user" value={email}
            onChangeText={setEmail} keyboardType="email-address"
            placeholder="demo@createc.com" autoCapitalize="none" />
          <Field label="Contraseña" icon="lock" value={password}
            onChangeText={setPassword} placeholder="••••••••••" secureTextEntry={secure} />
          <TouchableOpacity onPress={() => setSecure(s => !s)} style={{ alignSelf: "flex-end", marginTop: -8, marginBottom: 8 }}>
            <Feather name={secure ? "eye-off" : "eye"} size={18} color="#6b7280" />
          </TouchableOpacity>

          {error && <Text style={{ color: "#b91c1c", marginBottom: 8 }}>{error}</Text>}
          <Button title="INICIAR SESIÓN" onPress={onSubmit} disabled={!canSubmit} loading={loading} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
