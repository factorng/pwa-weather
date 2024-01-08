//export const partial = (fn, ...args) => (..._arg) => fn(...args, ..._arg);

/**
 * @function partial
 * @param {Function} fn
 * @param  {...any} args
 * @returns {*}
 */

export const partial = (fn, ...args) => fn.bind(null, ...args);
