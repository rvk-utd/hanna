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
