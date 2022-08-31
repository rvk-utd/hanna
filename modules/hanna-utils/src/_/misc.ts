/**
 * Simple type-guarding filter function that helps filter out `null`y (i.e.
 * `null` and `undefined`) values from an array in a type-aware way.
 *
 * ```ts
 * import { notNully } from '@reykjavik/hanna-utils';
 *
 * const mixed = ['hi', null, undefined, ''];
 * const strings: Array<string> = mixed.filter(notNully);
 * ```
 */
export const notNully = <T>(val: T): val is NonNullable<T> => val != null;
