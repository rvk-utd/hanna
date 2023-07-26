import type { PctValue, PlainNumber, PxValue, RawCssValue } from 'es-in-css';
import { pct_f, px, unitOf, vh_f, vw_f } from 'es-in-css';

import { bp } from './breakpoints.js';
import { grid } from './grid.js';

const { phone, phablet, tablet, netbook, wide } = bp;

// $_between-minWidth: 320 !default;
// $_between-maxWidth: 1440 !default;

/**
  Returns margin/padding value calc() function that delivers approximately
  `from` pixel spacing when the element's container is `min` pixels wide
  `to` pixel spacing when the element's container is `max` pixels wide.
*/

const unitConverters = {
  '%': pct_f,
  vw: vw_f,
  vh: vh_f,
};

export type BetweenEdge = PlainNumber | PxValue | PctValue;

export const between = (
  from: BetweenEdge,
  to: BetweenEdge,
  min: PlainNumber | PxValue,
  max: PlainNumber | PxValue,
  unit: '%' | 'vw' | 'vh'
): string => {
  if (unitOf(from) === '%') {
    from = (min * from) / 100;
  }
  if (unitOf(to) === '%') {
    to = (max * to) / 100;
  }

  const slopeFactor = (to - from) / (max - min);
  const intercept = px(to - slopeFactor * max);

  if (slopeFactor === 0) {
    return `${intercept}`;
  }

  const slope = unitConverters[unit](slopeFactor);

  if (intercept.value === 0) {
    return `${slope}`;
  }

  return `calc(${slope} + ${intercept})`;
};

// ---------------------------------------------------------------------------

export const between_phone = (from: BetweenEdge, to: BetweenEdge) =>
  between(from, to, phone, phablet, 'vw');
export const between_phablet = (from: BetweenEdge, to: BetweenEdge) =>
  between(from, to, phablet, tablet, 'vw');
export const between_tablet = (from: BetweenEdge, to: BetweenEdge) =>
  between(from, to, tablet, netbook, 'vw');
export const between_netbook = (from: BetweenEdge, to: BetweenEdge) =>
  between(from, to, netbook, wide, 'vw');

// ---------------------------------------------------------------------------

export const between_phone_netbook = (from: BetweenEdge, to: BetweenEdge) =>
  between(from, to, phone, wide, 'vw');
export const between_phablet_netbook = (from: BetweenEdge, to: BetweenEdge) =>
  between(from, to, phablet, wide, 'vw');
export const between_tablet_netbook = (from: BetweenEdge, to: BetweenEdge) =>
  between(from, to, tablet, wide, 'vw');

// ---------------------------------------------------------------------------

export const between_phone_tablet = (from: BetweenEdge, to: BetweenEdge) =>
  between(from, to, phone, netbook, 'vw');
export const between_phablet_tablet = (from: BetweenEdge, to: BetweenEdge) =>
  between(from, to, phablet, netbook, 'vw');

// ---------------------------------------------------------------------------

export const between_phone_phablet = (from: BetweenEdge, to: BetweenEdge) =>
  between(from, to, phone, tablet, 'vw');

// ---------------------------------------------------------------------------

export const between_Hamburger = between_phone_tablet;
export const between_Topmenu = between_netbook;

// ===========================================================================

const _scaleDown = grid.contentMinWidth / grid.contentMaxWidth;

export const between_cols = (
  from: BetweenEdge,
  to: BetweenEdge,
  cols: PlainNumber = grid.numCols,
  gutters: PlainNumber = cols - 1
) => {
  const max = cols * grid.column + gutters * grid.gutter;
  const min = _scaleDown * max;
  return between(from, to, min, max, '%');
};

export const between_container = (
  from: BetweenEdge,
  to: BetweenEdge,
  max = grid.contentMaxWidth,
  min = grid.contentMinWidth
) => between(from, to, min, max, '%');
