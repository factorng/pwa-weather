import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

it.only('should update value after specified delay', () => {
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebounce(value, delay),
    { initialProps: { value: 'first value', delay: 500 } },
  );

  expect(result.current).toBe('first value');
  rerender({ value: 'second value', delay: 500 });
  expect(result.current).toBe('first value');
  act(() => jest.advanceTimersByTime(498));
  expect(result.current).toBe('first value');
  act(() => jest.advanceTimersByTime(5));
  expect(result.current).toBe('second value');
});
