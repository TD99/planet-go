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
      console.error(error);
      return initialValue;
    }
  });

  function setValue(value: Type | ((val?: Type) => Type)) {
    try {
      setStoredValue((prevValue) => {
        const valueToStore =
          value instanceof Function ? value(prevValue) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch (error) {
      console.error(error);
    }
  }

  return [storedValue, setValue];
}
