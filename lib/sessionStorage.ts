import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "session";

export async function getSession<T = any>() {
  const json = await AsyncStorage.getItem(SESSION_KEY);
  return json ? (JSON.parse(json) as T) : null;
}

export async function setSession(value: any) {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(value));
}

export async function deleteSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}
