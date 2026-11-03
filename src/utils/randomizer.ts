/**
 * Gets a random number within a range. Does not support decimals.
 *
 * @param min Lowest possible number.
 * @param max Highest possible number.
 * @returns Random number between `min` and `max`.
 */
export const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;
