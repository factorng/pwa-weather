import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { createWrapperAndAppendToBody } from 'shared/helpers';

/**@typedef {import('./types').ReactPortalProps} Props */

/**
 * @function ReactPortal
 * @param {Props} props
 * @returns {JSX.Element | null}
 */

export function ReactPortal(props) {
  /**@type {[null|HTMLElement, Function]} */
  const [wrapperElement, setWrapperElement] = useState(null);

  useLayoutEffect(() => {
    let element = document.getElementById(props.wrapperId);
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(props.wrapperId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [props.wrapperId]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  return createPortal(props.children, wrapperElement);
}
