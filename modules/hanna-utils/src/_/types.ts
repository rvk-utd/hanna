/**
 * A variant of `Record<string, T>` that warns if any `Keys` are missing when
 * it's declared.
 *
 * It is useful for building enum objects to quickly validate JavaScript run-time
 * user inputs and applying default values and "alias" outdated keys.
 *
 * ```ts
 * import type { OpenRecord } from '@reykjavik/hanna-utils';
 *
 * type SizeVariant = 'small' | 'large';
 * const sizes: OpenRecord<SizeVariant, number> = {
 *   // Required keys
 *   small: 12,
 *   large: 20,
 *   // Extra key
 *   normal: 16,
 * };
 *
 * // ...
 *
 * const sizeValue = sizes[props.size || 'normal'] || sizes.normal;
 * ```
 *
 */
export type OpenRecord<T extends string, V> = Record<T, V> & Record<string, V>;

/**
 * A variant of `OpenRecord` for cases where you're mapping `Keys` to themselves.
 * It allows for shorter/simpler type signature.
 * The second `Value` parameter is unioned to `Keys`
 *
 * ```ts
 * import type { OpenStringMap } from '@reykjavik/hanna-utils';
 *
 * type AlignVariant = 'left' | 'right';
 *
 * const aligns: OpenStringMap<AlignVariant> = {
 *   // Required keys
 *   left: 'left',
 *   right: 'right',
 *   // Extra key
 *   default: 'left', // value must be of type AlignVariant
 * };
 *
 * const aligns2: OpenStringMap<AlignVariant, ''> = {
 *   // Required keys
 *   left: 'left',
 *   right: 'right',
 *   // Extra key
 *   default: '', // '' is explicitly allowed by the type signature
 * };
 *
 *
 * // ...
 *
 * const alignValue = aligns[props.align || 'default'] || aligns.default;
 * ```
 *
 */
export type OpenStringMap<T extends string, V = T> = Record<T, T | V> &
  Record<string, T | V>;

/**
 * Type hack to resolve a cleaner result from ´Pick´ and ´Omit´ operations
 *
 * For more info, see:
 * https://effectivetypescript.com/2022/02/25/gentips-4-display/
 */
export type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] };
