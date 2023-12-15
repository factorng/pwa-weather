import React, { useEffect, useState } from 'react';

/**
 * @function useDebounce
 * @param {string|number} value
 * @param {number} delay?
 * @returns {string | number}
 */

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const interval = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(interval);
  }, [value, delay]);

  return debouncedValue;
};

