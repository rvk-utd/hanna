import o from 'ospec';

export const compareKeys = (
  input: Record<string, unknown>,
  expected: Record<string, unknown>,
  alsoAllowed: Record<string, unknown> = {}
) => {
  Object.keys(expected).forEach((token) => {
    o(input[token]).notEquals(undefined)(`missing: "${token}"`);
  });
  Object.keys(input).forEach((token) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (expected[token] === undefined && alsoAllowed[token] === undefined) {
      o(true).equals(false)(`unexpected: "${token}"`);
    }
  });
};
