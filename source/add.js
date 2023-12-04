/**
 * Adds two values, attempting to convert them to numbers if they are not
 * already.
 *
 * This function can handle a variety of input types:
 * - If a value is a string that represents a number, it will be converted to a
 *   number.
 * - `null` is treated as 0.
 * - `undefined`, objects, and arrays that cannot be converted to a number will
 *   result in `NaN`.
 * - Handles floating point numbers, very large numbers, and special numbers
 *   like `Infinity` and `NaN`.
 *
 * Note: JavaScript's limitations with large numbers and floating point
 * precision apply.
 *
 * @param {number|string|null} a - The first value to add. Can be a number, a
 * string representing a number, or `null`.
 * @param {number|string|null} b - The second value to add. Can be a number, a
 * string representing a number, or `null`.
 * @returns {number} The sum of `a` and `b`, converted to numbers if they aren't
 * already. Returns `NaN` if any input is non-convertible to a number.
 */
export function add(a, b) {
  // TODO #1: Write a function that adds two numbers.
  // BEGIN_SOLUTION
  // Convert non-number inputs to numbers, where possible.
  // `null` is converted to 0, while `undefined`, objects, and arrays
  // that cannot be converted to a number will become NaN.
  const numA =
    a === null || typeof a === 'string' || typeof a === 'number'
      ? Number(a)
      : NaN;
  const numB =
    b === null || typeof b === 'string' || typeof b === 'number'
      ? Number(b)
      : NaN;

  return numA + numB;
  // END_SOLUTION
  /** BEGIN_STUDENT
  return -1;
  END_STUDENT **/
}
