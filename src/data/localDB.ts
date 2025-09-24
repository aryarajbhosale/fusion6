// src/data/localDB.ts
export const saveToLocalDB = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Error saving to localStorage", err);
  }
};

export const getFromLocalDB = (key: string, defaultValue: any = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (err) {
    console.error("Error reading from localStorage", err);
    return defaultValue;
  }
};

export const clearFromLocalDB = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Error clearing from localStorage", err);
  }
};
