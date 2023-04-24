import { px as _px } from 'es-in-css';

import { bp } from './breakpoints.js';

const px = (value: number) => /*#__PURE__*/ _px(value);

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
