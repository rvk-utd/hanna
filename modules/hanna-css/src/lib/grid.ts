import { color, css, pct_f, px, PxValue } from 'es-in-css';

import { bp } from './breakpoints';
import { isDevMode } from './cssutils';

const unit = 8;
const gutter = 40;
const column = 64;
const numCols = 12;

const margin__phone = 20;
const margin__wide = 80;

const contentMaxWidth = column * numCols + gutter * (numCols - 1);
const contentMinWidth = bp.phone - 2 * margin__phone;

const contentMaxWidth__outer = contentMaxWidth + 2 * margin__wide;
const contentMinWidth__outer = bp.phone;

export const grid = {
  unit,
  gutter,
  column,
  numCols,

  margin__phone,
  margin__wide,

  contentMinWidth,
  contentMaxWidth,
  contentMinWidth__outer,
  contentMaxWidth__outer,
};

// ===========================================================================

const oneof = (n: number) => (n < 0 ? -1 : n > 0 ? 1 : 0);

/** Percentage length - by columns */
export const cols_pct = (
  cols: number,
  gutters = cols - oneof(cols),
  opts?: {
    ofCols?: number;
    ofGutters?: number;
    /** Custom container width in pixels. When specified, this overrides the default column-based container width. */
    width?: number | PxValue;
    /** Pixel-based modifier for the column-based container width. (Useful for gridded-containers with non-standard padding/margin) */
    edge?: number | PxValue;
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
  nPx: number | PxValue,
  ofCols = numCols,
  ofGutters = ofCols - oneof(ofCols),
  /** Pixel-based modifier for the column-based container width. (Useful for gridded-containers with non-standard padding/margin) */
  edge: number | PxValue = 0
) => pct_f(nPx / (ofCols * column + ofGutters * gutter + edge));

/** pixel length - by columns */
export const cols_px = (numCols: number, numGutters = numCols - 1) =>
  px(numCols * column + numGutters * gutter);

// ===========================================================================

/**
 * Helper that renders horizontal grid as a semi-transparent background
 */
export const showColumnGridLines = (
  columnColor = color('black').alpha(0.04),
  gutterColor = color('white').alpha(0.06)
) => {
  if (isDevMode) {
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
  }
  return '';
};
