import React, { useEffect, useState } from "react";
import { CityList } from "../types/api-types";
import styles from "./SearchHints.module.scss";

type SearchHintsProps = {
  hints: CityList;
  onHintClick: (id: number) => void;
};

const SearchHints = (props: SearchHintsProps) => {
  const { hints, onHintClick } = props;
  const [hintsToDisplay, setHintsToDisplay] = useState<CityList>([]);
  useEffect(() => {
    setHintsToDisplay(hints.slice(0, 6));
  }, [hints]);

  return (
    <>
      {hintsToDisplay.length > 0 && (
        <div className={styles.SearchHints} data-testid="hints">
          {hintsToDisplay.map((hint) => (
            <p
              key={hint.id}
              onClick={() => onHintClick(hint.id)}
              className={styles.SearchHint}
              data-testid="hint">
              {hint.name}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchHints;
