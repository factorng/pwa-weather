import classnames from './Popup.module.scss';

/**@typedef {import('./types').PopupProps} Props */

/**
 * @function
 * @param {Props} props
 * @returns {JSX.Element | null}
 */

export function Popup(props) {
  if (!props.isOpen) return null;
  return (
    <div className={classnames.popup}>
      {props.children}
      <button className={classnames.buttonClose} onClick={props.handleClose}>X</button>
    </div>
  );
}


