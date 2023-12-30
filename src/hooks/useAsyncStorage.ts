import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

type LocalStorageKeyType = "location" | "showOnboarding";

const LOCAL_STORAGE_KEYS = ["location", "showOnboarding" ]

export const storeData = async (key: LocalStorageKeyType, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    Alert.alert("Async storage error", e);
  }
};

export const storeObject = async (key: LocalStorageKeyType, value: unknown) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    Alert.alert("Async storage error", e);
  }
};

export const getData = async (key: LocalStorageKeyType) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {
    Alert.alert("Async storage error", e);
  }
};

export const getObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    Alert.alert("Async storage error", e);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    Alert.alert("Async storage error", e);
  }
};

export const removeAllData = async () => {
  try {
    await AsyncStorage.multiRemove(LOCAL_STORAGE_KEYS);
  } catch (e) {
    Alert.alert("Async storage error", e);
  }
};

export const useAsyncStorage = () => {
  return { getObject, getData, storeObject, storeData, removeData };
};
