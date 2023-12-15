import { SearchHints } from '../../features/SearchHints';
import { InputText } from '../../shared/ui/InputText';
import { useStore } from 'store';
import data from '../../shared/city-list/city.json';
import classes from './CityInput.module.scss';
import { useState } from 'react';

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
  const cityList = Array.from(data);
  const [input, setInput] = useState('');
  /**@type {[null | CityList, Function]} */
  const [searchHints, setSearchHints] =  useState([]);
  const setCityId = useStore((state) => state.setCityId);

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
    setInput(city.name);
    setCityId(city.id);
    setSearchHints([]);
  };

  return (
    <div className={classes.cityInput}>
      <InputText value={input} testId='inputText' onChange={onInputChange}/>
      <SearchHints onHintClick={handleHintClick} hints={searchHints} />
      <button className={classes.button}>X</button>
    </div>
  );
};

