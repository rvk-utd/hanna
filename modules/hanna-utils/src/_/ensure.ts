declare const PositiveInteger__brand: unique symbol;
/** Positive integer (1<=) */
export type PositiveInteger = number & { [PositiveInteger__brand]: true };

/**
 * Checks if `cand` evaluates to a positive integer and, if so, returns a branded
 * `PositiveInteger` of equal value.
 *
 * Returns `undefined` otherwise.
 *
 * Examples:
 *  * `1` → `1`
 *  * `"1"` → `1`
 *  * `10000` → `10000`
 *  * `0` → `undefined`
 *  * `-1` → `undefined`
 *  * `1.1` → `undefined`
 *  * `"Infinity"` → `undefined`
 *  * `"foobar"` → `undefined`
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#ensureposint
 */
/*#__NO_SIDE_EFFECTS__*/
export const ensurePosInt = (candidate: unknown): PositiveInteger | undefined => {
  const num = Number(candidate);
  return num && num > 0 && num < Infinity && num === Math.floor(num)
    ? (num as PositiveInteger)
    : undefined;
};
