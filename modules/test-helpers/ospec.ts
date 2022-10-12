import o from 'ospec';

import { compareKeys } from './';

export const reportKeyMismatch: typeof compareKeys = (input, expected, alsoAllowed) => {
  const res = compareKeys(input, expected, alsoAllowed);
  res.missing.forEach((token) => {
    o(false).equals(true)(`missing: "${token}"`);
  });
  res.unexpected.forEach((token) => {
    o(false).equals(true)(`unexpected: "${token}"`);
  });
  return res;
};
