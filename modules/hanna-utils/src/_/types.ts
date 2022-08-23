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

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

/**
 * Type hack to resolve a cleaner result from ´Pick´ and ´Omit´ operations
 *
 * For more info, see:
 * https://effectivetypescript.com/2022/02/25/gentips-4-display/
 */
export type Resolve<T> = T extends Function ? T : { [K in keyof T]: T[K] };

// ---------------------------------------------------------------------------

/**
 * Return A with the unique keys of B as optionally undefined
 *
 * Example:
 *
 * ```ts
 * type MyProps = AllowKeys<
 *   { type: 'profit', gain: number },
 *   { type: 'loss', loss: number, panic: boolean }
 * >;
 * ```
 *
 * is the same as:
 *
 * ```ts
 * type MyProps =
 *   { type: 'profit', gain: number, loss?: never, panic?: never };
 * ```
 */
export type AllowKeys<A, B> = Resolve<A & { [Key in Exclude<keyof B, keyof A>]?: never }>;

// ---------------------------------------------------------------------------

/**
 * Allow either type, but define the keys from the other type as optionally undefined.
 *
 * Example:
 *
 * ```ts
 * type MyProps = EitherObj<
 *   { type: 'profit', gain: number },
 *   { type: 'loss', loss: number }
 *   { type: 'even', panic: boolean }
 * >;
 * ```
 *
 * is the same as:
 *
 * ```ts
 * type MyProps =
 *   | { type: 'profit', gain: number, loss?: never, panic?: never },
 *   | { type: 'loss', loss: number, gain?: never, panic?: never };
 *   | { type: 'even', panic: boolean, loss?: never, gain?: never };
 * ```
 */
export type EitherObj<A, B, C = boolean, D = boolean> = C extends boolean
  ? AllowKeys<A, B> | AllowKeys<B, A>
  : D extends boolean
  ? AllowKeys<A, B & C> | AllowKeys<B, A & C> | AllowKeys<C, A & B>
  :
      | AllowKeys<A, B & C & D>
      | AllowKeys<B, A & C & D>
      | AllowKeys<C, A & B & D>
      | AllowKeys<D, A & B & C>;
