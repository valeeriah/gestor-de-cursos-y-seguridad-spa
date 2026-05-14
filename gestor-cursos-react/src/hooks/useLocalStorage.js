import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  // Estado inicial: intenta leer de localStorage o usa el valor por defecto
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error leyendo localStorage:", error);
      return initialValue;
    }
  });

  // Cada vez que 'value' cambie, lo guardamos en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error guardando en localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
};