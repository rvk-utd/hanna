import type { PctValue, PlainNumber, PxValue } from 'es-in-css';
import { pct_f, px, unitOf, vh_f, vw_f } from 'es-in-css';

import { bp } from './breakpoints.js';
import { grid } from './grid.js';

const { phone, phablet, tablet, netbook, wide } = bp;

// $_between-minWidth: 320 !default;
// $_between-maxWidth: 1440 !default;

const unitConverters = {
  '%': pct_f,
  vw: vw_f,
  vh: vh_f,
};

type Edge = PlainNumber | PxValue | PctValue;

export type ScaleEdge = Edge;

/**
 * Returns a `calc()` value with slope+intercept lengths,
 * scaling from `from` at the `min` container/viewport size,
 * up to `to` at the `max` container/viewport size.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#scale
 */
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
  let intercept = to - slopeFactor * max;

  if (slopeFactor === 0) {
    return `${px(intercept)}`;
  }

  const slope = unitConverters[unit](slopeFactor);

  if (intercept === 0) {
    return `${slope}`;
  }

  let operator = '+';
  if (intercept < 0) {
    operator = '-';
    intercept = -intercept;
  }

  return `calc(${slope} ${operator} ${px(intercept)})`;
};

// ---------------------------------------------------------------------------

/**
 * Generates a `vw`-based `calc()` value that scales linearly within the
 * "phone" media-query.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const scale_phone = (from: Edge, to: Edge) =>
  scale(from, to, phone, phablet, 'vw');

/**
 * Generates a `vw`-based `calc()` value that scales linearly within the
 * "phablet" media-query.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const scale_phablet = (from: Edge, to: Edge) =>
  scale(from, to, phablet, tablet, 'vw');

/**
 * Generates a `vw`-based `calc()` value that scales linearly within the
 * "tablet" media-query.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const scale_tablet = (from: Edge, to: Edge) =>
  scale(from, to, tablet, netbook, 'vw');

/**
 * Generates a `vw`-based `calc()` value that scales linearly within the
 * "netbook" media-query.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const scale_netbook = (from: Edge, to: Edge) =>
  scale(from, to, netbook, wide, 'vw');

// ---------------------------------------------------------------------------

/**
 * Generates a `vw`-based `calc()` value that scales linearly within the
 * media-queries from "phone" up to "netbook" .
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const scale_phone_netbook = (from: Edge, to: Edge) =>
  scale(from, to, phone, wide, 'vw');

/**
 * Generates a `vw`-based `calc()` value that scales linearly within the
 * media-queries from "phablet" up to "netbook" .
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const scale_phablet_netbook = (from: Edge, to: Edge) =>
  scale(from, to, phablet, wide, 'vw');

/**
 * Generates a `vw`-based `calc()` value that scales linearly within the
 * media-queries from "tablet" up to "netbook" .
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const scale_tablet_netbook = (from: Edge, to: Edge) =>
  scale(from, to, tablet, wide, 'vw');

// ---------------------------------------------------------------------------

/**
 * Generates a `vw`-based `calc()` value that scales linearly within the
 * media-queries from "phone" up to "tablet" .
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const scale_phone_tablet = (from: Edge, to: Edge) =>
  scale(from, to, phone, netbook, 'vw');

/**
 * Generates a `vw`-based `calc()` value that scales linearly within the
 * media-queries from "phablet" up to "tablet" .
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const scale_phablet_tablet = (from: Edge, to: Edge) =>
  scale(from, to, phablet, netbook, 'vw');

// ---------------------------------------------------------------------------

/**
 * Generates a `vw`-based `calc()` value that scales linearly within the
 * media-queries from "phone" up to "phablet" .
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const scale_phone_phablet = (from: Edge, to: Edge) =>
  scale(from, to, phone, tablet, 'vw');

// ===========================================================================

const _scaleDown = grid.contentMinWidth / grid.contentMaxWidth;

/**
 * Generates a `%`-based `calc()` value that scales linearly between
 * `from` and `to` inside a container whos width is certain nubmer of
 * grid columns and gutters.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#scale_cols
 */
export const scale_cols = (
  from: Edge,
  to: Edge,
  /** Container's width in grid columns */
  cols: PlainNumber,
  /** Container's width in grid gutters (defaults to `cols - 1`) */
  gutters: PlainNumber = cols - 1
) => {
  const max = cols * grid.column + gutters * grid.gutter;
  const min = _scaleDown * max;
  return scale(from, to, min, max, '%');
};

/**
 * This `%`-based scaler works for elements directly within a full-grid wide
 * container. (As defined by `grid_raw.contentMinWidth` and
 * `grid_raw.contentMaxWidth`).
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#scale_container
 */
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
  let min = from;
  let max = to;
  if (from > to) {
    min = to;
    max = from;
  }
  return `clamp(${min}, ${scaler(from, to)}, ${max})`;
};

/**
 * Generates a `vw`-based `clamp()` value that scales linearly within the
 * "phone" media-query.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const clamp_phone = (from: Edge, to: Edge) => _clamp(from, to, scale_phone);

/**
 * Generates a `vw`-based `clamp()` value that scales linearly within the
 * "phablet" media-query.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const clamp_phablet = (from: Edge, to: Edge) => _clamp(from, to, scale_phablet);

/**
 * Generates a `vw`-based `clamp()` value that scales linearly within the
 * "tablet" media-query.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const clamp_tablet = (from: Edge, to: Edge) => _clamp(from, to, scale_tablet);

/**
 * Generates a `vw`-based `clamp()` value that scales linearly within the
 * "netbook" media-query.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const clamp_netbook = (from: Edge, to: Edge) => _clamp(from, to, scale_netbook);

/**
 * Generates a `vw`-based `clamp()` value that scales linearly within the
 * media-queries from "phone" up to "netbook" .
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const clamp_phone_netbook = (from: Edge, to: Edge) =>
  _clamp(from, to, scale_phone_netbook);

/**
 * Generates a `vw`-based `clamp()` value that scales linearly within the
 * media-queries from "phablet" up to "netbook" .
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const clamp_phablet_netbook = (from: Edge, to: Edge) =>
  _clamp(from, to, scale_phablet_netbook);

/**
 * Generates a `vw`-based `clamp()` value that scales linearly within the
 * media-queries from "tablet" up to "netbook" .
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const clamp_tablet_netbook = (from: Edge, to: Edge) =>
  _clamp(from, to, scale_tablet_netbook);

/**
 * Generates a `vw`-based `clamp()` value that scales linearly within the
 * media-queries from "phone" up to "tablet" .
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const clamp_phone_tablet = (from: Edge, to: Edge) =>
  _clamp(from, to, scale_phone_tablet);

/**
 * Generates a `vw`-based `clamp()` value that scales linearly within the
 * media-queries from "phablet" up to "tablet" .
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const clamp_phablet_tablet = (from: Edge, to: Edge) =>
  _clamp(from, to, scale_phablet_tablet);

/**
 * Generates a `vw`-based `clamp()` value that scales linearly within the
 * media-queries from "phone" up to "phablet" .
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const clamp_phone_phablet = (from: Edge, to: Edge) =>
  _clamp(from, to, scale_phone_phablet);

//
// ---------------------------------------------------------------------------
// DEPRECATED
// ---------------------------------------------------------------------------

/**
 * @deprecated Use `scale_phone_tablet` instead.  (will be removed in v0.11)
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const scale_Hamburger = scale_phone_tablet;

/**
 * @deprecated Use `scale_netbook` instead.  (will be removed in v0.11)
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const scale_Topmenu = scale_netbook;

/**
 * @deprecated Use `clamp_phone_tablet` instead.  (will be removed in v0.11)
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const clamp_Hamburger = (from: Edge, to: Edge) =>
  _clamp(from, to, scale_phone_tablet);

/**
 * @deprecated Use `clamp_netbook` instead.  (will be removed in v0.11)
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#media-bracket-scalers
 */
export const clamp_Topmenu = (from: Edge, to: Edge) => _clamp(from, to, scale_netbook);
