/**
 * @function createWrapperAndAppendToBody
 * @param {string} wrapperId
 * @returns {HTMLElement}
 */

export function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}
