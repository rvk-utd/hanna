import type { PctValue, PlainNumber, PxValue } from 'es-in-css';
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

type Edge = PlainNumber | PxValue | PctValue;

export type ScaleEdge = Edge;

export const scale = (
  from: Edge,
  to: Edge,
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

export const scale_phone = (from: Edge, to: Edge) =>
  scale(from, to, phone, phablet, 'vw');
export const scale_phablet = (from: Edge, to: Edge) =>
  scale(from, to, phablet, tablet, 'vw');
export const scale_tablet = (from: Edge, to: Edge) =>
  scale(from, to, tablet, netbook, 'vw');
export const scale_netbook = (from: Edge, to: Edge) =>
  scale(from, to, netbook, wide, 'vw');

// ---------------------------------------------------------------------------

export const scale_phone_netbook = (from: Edge, to: Edge) =>
  scale(from, to, phone, wide, 'vw');
export const scale_phablet_netbook = (from: Edge, to: Edge) =>
  scale(from, to, phablet, wide, 'vw');
export const scale_tablet_netbook = (from: Edge, to: Edge) =>
  scale(from, to, tablet, wide, 'vw');

// ---------------------------------------------------------------------------

export const scale_phone_tablet = (from: Edge, to: Edge) =>
  scale(from, to, phone, netbook, 'vw');
export const scale_phablet_tablet = (from: Edge, to: Edge) =>
  scale(from, to, phablet, netbook, 'vw');

// ---------------------------------------------------------------------------

export const scale_phone_phablet = (from: Edge, to: Edge) =>
  scale(from, to, phone, tablet, 'vw');

// ---------------------------------------------------------------------------

export const scale_Hamburger = scale_phone_tablet;
export const scale_Topmenu = scale_netbook;

// ===========================================================================

const _scaleDown = grid.contentMinWidth / grid.contentMaxWidth;

export const scale_cols = (
  from: Edge,
  to: Edge,

  cols: PlainNumber,

  gutters: PlainNumber = cols - 1
) => {
  const max = cols * grid.column + gutters * grid.gutter;
  const min = _scaleDown * max;
  return scale(from, to, min, max, '%');
};
export const scale_container = (from: Edge, to: Edge) =>
  scale(from, to, grid.contentMinWidth, grid.contentMaxWidth, '%');

// ===========================================================================

const _clamp = (from: Edge, to: Edge, scaler: (from: Edge, to: Edge) => string) => {
  if (typeof from === 'number') {
    from = px(from as number);
  }
  if (typeof to === 'number') {
    to = px(to as number);
  }
  const fromStr = `${from}`;
  const toStr = `${to}`;
  if (fromStr === toStr) {
    return fromStr;
  }
  return `clamp(${from}, ${scaler(from, to)}, ${to})`;
};

export const clamp_phone = (from: Edge, to: Edge) => _clamp(from, to, scale_phone);
export const clamp_phablet = (from: Edge, to: Edge) => _clamp(from, to, scale_phablet);
export const clamp_tablet = (from: Edge, to: Edge) => _clamp(from, to, scale_tablet);
export const clamp_netbook = (from: Edge, to: Edge) => _clamp(from, to, scale_netbook);
export const clamp_phone_netbook = (from: Edge, to: Edge) =>
  _clamp(from, to, scale_phone_netbook);
export const clamp_phablet_netbook = (from: Edge, to: Edge) =>
  _clamp(from, to, scale_phablet_netbook);
export const clamp_tablet_netbook = (from: Edge, to: Edge) =>
  _clamp(from, to, scale_tablet_netbook);
export const clamp_phone_tablet = (from: Edge, to: Edge) =>
  _clamp(from, to, scale_phone_tablet);
export const clamp_phablet_tablet = (from: Edge, to: Edge) =>
  _clamp(from, to, scale_phablet_tablet);
export const clamp_phone_phablet = (from: Edge, to: Edge) =>
  _clamp(from, to, scale_phone_phablet);
export const clamp_Hamburger = (from: Edge, to: Edge) =>
  _clamp(from, to, scale_Hamburger);
export const clamp_Topmenu = (from: Edge, to: Edge) => _clamp(from, to, scale_Topmenu);
