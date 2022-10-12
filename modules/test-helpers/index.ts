export const compareKeys = (
  input: Record<string, unknown>,
  expected: Record<string, unknown>,
  alsoAllowed: Record<string, unknown> = {}
) => {
  const missing = Object.keys(expected).filter((token) => !(token in input));
  const unexpected = Object.keys(input).filter(
    (token) => !(token in expected) && !(token in alsoAllowed)
  );
  return {
    errors: missing.length > 0 || unexpected.length > 0,
    missing,
    unexpected,
  };
};

// ---------------------------------------------------------------------------°
// Utilities for unit testing type signatures.

export type Expect<T extends true> = T;
export type Equals<A, B> = UnlessAny<
  A,
  B,
  [A] extends [B]
    ? [B] extends [A]
      ? Any extends ExactEqual<A, B>
        ? true
        : "❌ Unexpected or missing 'readonly' property"
      : '❌ Type B is not assignable to type A'
    : '❌ Type A is not assignable to type B'
>;
export type Extends<A, B> = UnlessAny<
  A,
  B,
  [A] extends [B] ? true : '❌ Type A is not assignable to B'
>;
export type NotExtends<A, B> = UnlessAny<
  A,
  B,
  [A] extends [B]
    ? [B] extends [A]
      ? '❌ Type A is equal to B'
      : '❌ Type A is assignable to B'
    : true
>;

// --------

// Conditional returns can enforce identical types.
// See here: https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
/* prettier-ignore */
type ExactEqual<A, B> =
  (<U>() => U extends A ? 1 : 0) extends (<U>() => U extends B ? 1 : 0) ? Any : never;

declare const _Any__Brand: unique symbol;
type Any = { [_Any__Brand]: true };

type IsAny<T> = Any extends T ? ([T] extends [Any] ? true : false) : false;
type UnlessAny<A, B, C> = IsAny<A> extends true
  ? IsAny<B> extends true
    ? "❌ Types A and B are both 'any'"
    : "❌ Type A is 'any' but type B is not"
  : IsAny<B> extends true
  ? "❌ Type B is 'any' but type A is not"
  : C;
