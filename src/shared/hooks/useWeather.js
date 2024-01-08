import { create } from 'zustand';
import { partial } from '../utils/partial';

/**
 * @typedef {import('./types').WeatherState} WeatherState
 * @typedef {import('./types').WeatherStateCreator} Creator
 * @typedef {import('./types').Hint} Hint
 */

/**
 * @function setCityName
 * @param {Function} set
 * @param {string} cityName
 * @return {void}
 */

const setCityName = (set, cityName) => {
  set((/** @type {WeatherState} */ state) => ({
    ...state,
    cityName,
  }));
};

/**
 * @function setCityId
 * @param {Function} set
 * @param {string} cityId
 * @return {void}
 */

const setCityId = (set, cityId) => {
  set((/** @type {WeatherState} */ state) => ({
    ...state,
    cityId,
  }));
};

/**
 * @function setHints
 * @param {Function} set
 * @param {Hint[]} hints
 * @return {void}
 */

const setHints = (set, hints) => {
  set((/** @type {WeatherState} */ store) => ({
    ...store,
    hints,
  }));
};

export const useWeather = create(/** @type {Creator} */ (set) => ({
  cityId: 498817,
  hints: [],
  cityName: '',
  setCityName: partial(setCityName, set),
  setCityId: partial(setCityId, set),
  setHints: partial(setHints, set),
}));
