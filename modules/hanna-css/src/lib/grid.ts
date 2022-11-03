import { color, css, pct_f, PlainNumber, px, PxValue } from 'es-in-css';

import { bp } from './breakpoints';
import { isDevMode } from './cssutils';

const unit = px(8);
const gutter = px(40);
const column = px(64);
const numCols = 12;

const margin__phone = px(20);
const margin__wide = px(80);

const contentMaxWidth = px(column * numCols + gutter * (numCols - 1));
const contentMinWidth = px(bp.phone - 2 * margin__phone);

const contentMaxWidth__outer = px(contentMaxWidth + 2 * margin__wide);
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
} as const;

// ===========================================================================

const oneof = (n: number) => (n < 0 ? -1 : n > 0 ? 1 : 0);

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
