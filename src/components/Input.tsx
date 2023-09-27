import React from "react";
import SearchHints from "./SearchHints";
import InputField from "./InputField";
import { CityList } from "../types/api-types";
import styles from "./Input.module.scss";

type InputProps = {
  value: string;
  onInputChangeHanlder: (input: string) => void;
  hints: CityList;
  onHintClick: (id: number) => void;
  handleLocationClick: () => void;
};

const Input: React.FC<InputProps> = (props) => {
  const {
    value,
    onInputChangeHanlder,
    hints,
    onHintClick,
    handleLocationClick,
  } = props;
  return (
    <div className={styles.wrapper}>
      <InputField value={value} onInputChangeHanlder={onInputChangeHanlder} />
      <SearchHints hints={hints} onHintClick={onHintClick} />
      <button
        className={styles.btnLocation}
        onClick={handleLocationClick}
        name="geoposition"
      />
    </div>
  );
};

export default Input;
