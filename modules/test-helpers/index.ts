import o from 'ospec';

export const compareKeys = (
  input: Record<string, unknown>,
  expected: Record<string, unknown>,
  alsoAllowed: Record<string, unknown> = {}
) => {
  Object.keys(expected).forEach((token) => {
    o(token in input).equals(true)(`missing: "${token}"`);
  });
  Object.keys(input).forEach((token) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!(token in expected) && !(token in alsoAllowed)) {
      o(true).equals(false)(`unexpected: "${token}"`);
    }
  });
};
