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

/**
 * Simple 'foo bar' --> 'Foo bar' mapper.
 *
 * Default locale: `'is'`
 * (effectively same as either `"en"` or vanilla `toUpperCase()`)
 *
 * ```ts
 * import { capitalize } from '@reykjavik/hanna-utils';
 *
 * capitalize('hello world'); // "Hello world"
 * capitalize('istanbul', 'TR'); // "İstanbul"
 * ```
 */
export const capitalize = <S extends string>(
  str: S,
  locale?: string | Array<string>
): Capitalize<S> =>
  ((str[0] || '').toLocaleUpperCase(locale || 'IS') + str.slice(1)) as Capitalize<S>;
