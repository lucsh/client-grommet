import { isEmpty } from 'lodash';

export const isFalsy = value => {
  /**
   * Checks if `value` is falsy or an empty object, collection, map, or set.
   *
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is falsy or empty, else `false`.
   **/
  return !value || isEmpty(value);
};
