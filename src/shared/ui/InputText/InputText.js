import classes from './InputText.module.scss';

/**
 * @typedef {import('./types').InputTextProps} Props
 */

/**
 * @function InputText
 * @param {Props} props
 * @returns {JSX.Element}
 */

// handleSubjectEventName
// handleSubmitClick

export const InputText = (props) => {
  return (
    <input
      className={classes.input}
      type="text"
      data-testid={props.testId}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

