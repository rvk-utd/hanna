import { css, pct_f, PlainNumber, px, PxValue, RawCssString, rem } from 'es-in-css';

import { CssModuleToken, isDevMode } from '../../lib/cssutils.js';
import { grid } from '../../lib/grid.js';
import { hannaVars as vars } from '../../lib/hannavars.js';

/** Writes out a module's `/*!@deps ...` list. */
export const DEPS = (...deps: [CssModuleToken, ...Array<CssModuleToken>]) =>
  `/*!@deps ${deps.join(', ')} */`;

/**
 * Converts a pixel size to a rem value.
 */
export const prem = (px: PlainNumber | PxValue) => {
  return rem(px / 16);
};

export const grid_units = (units: PlainNumber = 1) => {
  return prem(units * grid.unit);
};

// ===========================================================================

const oneof = (n: number) => (n < 0 ? -1 : n > 0 ? 1 : 0);

const { numCols, column, gutter } = grid;

/** Percentage length - by columns */
export const cols_pct = (
  cols: PlainNumber,
  gutters = cols - oneof(cols),
  opts?: {
    ofCols?: PlainNumber;
    ofGutters?: PlainNumber;
    /** Custom container width in pixels. When specified, this overrides the default column-based container width. */
    width?: PlainNumber | PxValue;
    /** Pixel-based modifier for the column-based container width. (Useful for gridded-containers with non-standard padding/margin) */
    edge?: PlainNumber | PxValue;
  }
) => {
  opts = opts || {};
  const {
    ofCols = numCols,
    ofGutters = ofCols - oneof(ofCols),
    edge = 0,
    width = ofCols * column + ofGutters * gutter + edge,
  } = opts;

  return pct_f((cols * column + gutters * gutter) / width);
};

// ---------------------------------------------------------------------------

/** Percentage length - pixels to page-width */
export const px_pct = (
  nPx: PlainNumber | PxValue,
  ofCols: PlainNumber = numCols,
  ofGutters: PlainNumber = ofCols - oneof(ofCols),
  /** Pixel-based modifier for the column-based container width. (Useful for gridded-containers with non-standard padding/margin) */
  edge: PlainNumber | PxValue = 0
) => pct_f(nPx / (ofCols * column + ofGutters * gutter + edge));

/** pixel length - by columns */
export const cols_px = (numCols: PlainNumber, numGutters: PlainNumber = numCols - 1) =>
  px(numCols * column + numGutters * gutter);

// ===========================================================================

/**
 * Helper that renders horizontal grid as a semi-transparent background
 */
export const showColumnGridLines = (
  columnColor = 'rgba(0, 0, 0, 0.04)',
  gutterColor = 'rgba(255, 255, 255, 0.06)'
) => {
  if (!isDevMode) {
    return '';
  }
  const colPct = pct_f(column / (column + gutter));

  return css`
    background-image: linear-gradient(
      90deg,
      ${columnColor} 0,
      ${columnColor} ${colPct},
      ${gutterColor} ${colPct},
      ${gutterColor} 100%
    );
    background-size: ${cols_pct(1, 1)} 100%;
  `;
};

// ---------------------------------------------------------------------------

// TODO: Fix ugly syntax
export const extendBackgroundWithUnderlay = (
  dir: 'left' | 'right' | 'both' = 'both',
  pseudo: 'before' | 'after' = 'before'
) => {
  const leftProp =
    dir !== 'right' &&
    css`
      left: ${vars.grid_margin__neg};
    `;
  const rightProp =
    dir !== 'left' &&
    css`
      right: ${vars.grid_margin__neg};
    `;

  return css`
    position: relative;

    &::${pseudo} {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      ${leftProp}
      ${rightProp}
      z-index: -1;
      background: inherit;
    }
  `;
};

/**
 * Hack to generate an extra selector block to stop cssnano
 * from destructively merging adjacent properties – e.g. when
 * providing a fallback value for older browsers.
 *
 * Remove as soon as this issue has been resolved:
 * https://github.com/cssnano/cssnano/issues/897
 */
export const avoidCssnanoMerging = (cssContent: RawCssString) => css`
  & {
    ${cssContent};
  }
`;

export const overflowEllipsis = () => css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const resetImageProps = () => css`
  width: 100%;
  height: auto;
  display: block;
`;

export const resetImageDecendant = () => css`
  img {
    ${resetImageProps}
  }
`;
export const resetImageChild = () => css`
  > img {
    ${resetImageProps}
  }
`;

// ---------------------------------------------------------------------------
