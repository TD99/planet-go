import { useState, useEffect } from "react";

export default function useLocalStorage<Type>(
  key: string,
  initialValue: Type
): [Type, (value: any) => void] {
  const [storedValue, setStoredValue] = useState<Type>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  function setValue(value: Type | ((val?: Type) => Type)) {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }

  return [storedValue, setValue];
}
