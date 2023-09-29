import React, { useEffect, useState, useRef } from "react";
import styles from "./InputField.module.scss";
import useDebounce from "../hooks/useDebounce";

type InputProps = {
  value: string;
  onInputChangeHanlder: (input: string) => void;
};

export const InputField = (props: InputProps) => {
  const { value, onInputChangeHanlder } = props;
  const [inputValue, setInputValue] = useState(value);
  const inputDebounced = useDebounce(inputValue, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };
  const handleClearInput = () => {
    setInputValue("");
    onInputChangeHanlder("");
    inputRef?.current?.focus();
  };
  useEffect(() => {
    onInputChangeHanlder(inputDebounced);
  }, [inputDebounced]);

  useEffect(() => setInputValue(value), [value]);

  return (
    <>
      <input
        type="text"
        data-testid="input"
        value={inputValue}
        onChange={onChange}
        className={styles.input}
        ref={inputRef}
      />
      <button onClick={handleClearInput} className={styles.button}>
        x
      </button>
    </>
  );
};

export default InputField;
