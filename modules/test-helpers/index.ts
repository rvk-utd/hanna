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

export type Equals<A, B> = A extends B ? (B extends A ? true : false) : false;
export type TestEquals<A, B> = Equals<A, B> extends true ? unknown : never;
export type TestExtends<A, B> = A extends B ? unknown : never;
export type TestNotExtends<A, B> = B extends A ? never : unknown;
