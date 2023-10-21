import React, { useEffect, useState } from "react";
import styles from "./InputField.module.scss";
import useDebounce from "../hooks/useDebounce";

type InputProps = {
  value: string;
  onInputChangeHanlder: (input: string) => void;
};

export const InputField = (props: InputProps) => {
  const { value, onInputChangeHanlder } = props;
  const [inputValue, setInputValue] = useState(value);
  const inputDebounsed = useDebounce(inputValue, 500);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  useEffect(() => {
    onInputChangeHanlder(inputDebounsed);
  }, [inputDebounsed]);

  return (
    <input
      type="text"
      data-testid="input"
      value={inputValue}
      onChange={onChange}
      className={styles.input}
    />
  );
};

export default InputField;
