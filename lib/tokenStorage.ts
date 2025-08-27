import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "token";

async function canUseSecureStore() {
  return Platform.OS !== "web" && (await SecureStore.isAvailableAsync());
}

export async function getToken() {
  if (await canUseSecureStore()) {
    return SecureStore.getItemAsync(TOKEN_KEY);
  }
  if (Platform.OS === "web") {
    return Promise.resolve(localStorage.getItem(TOKEN_KEY));
  }
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function setToken(value: string) {
  if (await canUseSecureStore()) {
    return SecureStore.setItemAsync(TOKEN_KEY, value);
  }
  if (Platform.OS === "web") {
    localStorage.setItem(TOKEN_KEY, value);
    return;
  }
  return AsyncStorage.setItem(TOKEN_KEY, value);
}

export async function deleteToken() {
  if (await canUseSecureStore()) {
    return SecureStore.deleteItemAsync(TOKEN_KEY);
  }
  if (Platform.OS === "web") {
    localStorage.removeItem(TOKEN_KEY);
    return;
  }
  return AsyncStorage.removeItem(TOKEN_KEY);
}
