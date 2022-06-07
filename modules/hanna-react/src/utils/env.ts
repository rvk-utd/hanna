import React from 'react';

export const isPreact =
  // imported from 'preact'
  'h' in React ||
  // imported from 'preact/compat' (has all of `react-dom` bundled)
  ('hydrate' in React && 'render' in React) ||
  // `undefined` instead of `false` for nicer prop usage
  undefined;
