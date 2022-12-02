import React from 'react';

export const breakOnNL = (text: string | undefined) =>
  text &&
  text
    .trim()
    .replace(/(?:\n\s*)+/g, '\n\n')
    .split(/\n/)
    .map((bit) => bit || <br />);
