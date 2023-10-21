import React, { useEffect, useState } from "react";

const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const interval = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(interval);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
