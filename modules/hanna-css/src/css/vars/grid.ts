import { bp } from '../../lib/breakpoints';

export const grid_unit = 8;
export const grid_gutter = 40;
export const grid_column = 64;
export const grid_numCols = 12;
export const grid_margin__phone = 20;
export const grid_margin__wide = 80;

export const grid_contentMaxWidth =
  grid_column * grid_numCols + grid_gutter * (grid_numCols - 1);

export const grid_contentMinWidth = bp.phone - 2 * grid_margin__phone;

export const grid_contentMaxWidth__outer = grid_contentMaxWidth + 2 * grid_margin__wide;
export const grid_contentMinWidth__outer = bp.phone;
