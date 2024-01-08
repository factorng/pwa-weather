import { useEffect, useState } from 'react';
import classes from './SearchHints.module.scss';

/**
 * @typedef {import('./types').SearchHintsProps} Props
 */

/**
 * @typedef {import("shared/types/api-types").CityList} CityList
 */

/**
 * @function SearchHints
 * @param {Props} props
 * @returns {JSX.Element | null}
 */
export const SearchHints = (props) => {
  /** @type {[null | CityList, Function]}*/
  const [hintsToDisplay, setHintsToDisplay] = useState([]);
  useEffect(() => {
    props.hints && setHintsToDisplay(props.hints.slice(0, 6));
  }, [props.hints]);

  if (!hintsToDisplay) return null;

  return (
    <>
      {hintsToDisplay.length > 0 && (
        <div className={classes.SearchHints} data-testid="hints">
          {hintsToDisplay.map((hint) => (
            <p
              key={hint.id}
              onClick={() => props.onHintClick(hint)}
              className={classes.SearchHint}
              data-testid="hint">
              {hint.name}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

