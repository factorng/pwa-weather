import { useMemo } from 'react';
import { SearchHints } from '../../features/SearchHints';
import { InputText } from '../../shared/ui/InputText';
import { useWeather } from '../../shared/hooks/useWeather';
import data from '../../shared/city-list/city.json';
import classes from './CityInput.module.scss';
import { useEffect, useState } from 'react';

/**
 * @typedef {import ('./types').CityInputProps} Props
 */

/**
 * @typedef {import("shared/types/api-types").CityList} CityList
 */

/**
 * @function CityInput
 * @returns {JSX.Element}
 */

export const CityInput = () => {
  const cityList = useMemo(() => Array.from(JSON.parse(JSON.stringify(data))), []);
  const [input, setInput] = useState('');
  /**@type {[null | CityList, Function]} */
  const [searchHints, setSearchHints] =  useState([]);
  const setCityId = useWeather((state) => state.setCityId);
  const cityName = useWeather((state) => state.cityName);

  useEffect(() => setInput(cityName), [cityName]);

  const onInputChange = (event) => {
    const searchQuery = event.target.value;
    setInput(searchQuery);
    if (searchQuery) {
      const hints = cityList.filter((city) =>
        city.name.toLowerCase().startsWith(searchQuery.toLowerCase()),
      );
      setSearchHints(hints);
    }
  };

  const handleHintClick = (city) => {
    setCityId(city.id);
    setSearchHints([]);
  };

  const onResetClick = () => {
    setInput('');
    setSearchHints([]);
  };

  return (
    <div className={classes.cityInput}>
      <InputText value={input} testId='inputText' onChange={onInputChange}/>
      <SearchHints onHintClick={handleHintClick} hints={searchHints} />
      <button onClick={onResetClick} className={classes.button}>X</button>
    </div>
  );
};

