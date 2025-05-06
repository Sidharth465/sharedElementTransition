import {storage} from './storageMMKV';

interface key {
  key: string;
}
interface StorageItem<T> {
  key: string;
  value?: T | null;
}

export const saveToStorage = ({key, value}: StorageItem<any>) => {
  if (value !== null && value !== undefined) {
    const jsonValue = JSON.stringify(value);
    storage.set(key, jsonValue);
  } else {
    console.error(`⚠️ Attempted to store null/undefined value for key: ${key}`);
  }
};

export const getFromStorage = ({key}: key) => {
  try {
    if (!storage.contains(key)) {
      console.log(`⚠️ Key does not exist in storage: ${key}`);
      return null;
    }

    const rawValue = storage.getString(key);

    if (rawValue === undefined || rawValue === null) {
      console.log(`⚠️ Value for key "${key}" is undefined/null.`);
      return null;
    }

    try {
      return JSON.parse(rawValue);
    } catch (error) {
      console.log(
        `⚠️ Failed to parse JSON for key: ${key}, returning raw value.`,
      );
      return rawValue; // Return as string if JSON parsing fails
    }
  } catch (error) {
    console.error(`❌ Error accessing storage for key: ${key}`, error);
    return null;
  }
};

export const removeFromStorage = (key: string) => {
  storage.delete(key);
};
