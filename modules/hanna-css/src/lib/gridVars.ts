import { css, px } from 'es-in-css';

import { between_phone_netbook } from './between';
import { mq } from './breakpoints';
import { buildVariables } from './cssutils';
import { cols_pct, cols_px, grid } from './grid';

const _flexCol = (cols: number, gutters = cols - 1) => {
  const f = cols_pct(cols, gutters) / 100;
  const from = f * grid.contentMinWidth;
  const to = f * grid.contentMaxWidth;
  return between_phone_netbook(from, to);
};

export const gridVars = buildVariables([
  'grid_margin',
  'grid_margin__neg',
  'grid_margin__right',
  'grid_margin__right__neg',

  'grid_0_1',
  'grid_1',
  'grid_1_1',
  'grid_2',
  'grid_2_2',
  'grid_3',
  'grid_3_3',
  'grid_4',
  'grid_4_4',
  'grid_5',
  'grid_5_5',
  'grid_6',
  'grid_6_6',
  'grid_7',
  'grid_7_7',
  'grid_8',
  'grid_8_8',
  'grid_9',
  'grid_9_9',
  'grid_10',
  'grid_10_10',
  'grid_11',
  'grid_11_11',
  'grid_12',

  'grid_gutter',
  'grid_column',

  'grid_0_1__neg',
  'grid_1__neg',
  'grid_gutter__neg',
  'grid_column__neg',
]);

const _var = gridVars.vars;

export const gridVarDeclarations = css`
  ${gridVars.declare({
    grid_margin: between_phone_netbook(grid.margin__phone, grid.margin__wide),
    grid_margin__neg: between_phone_netbook(
      -1 * grid.margin__phone,
      -1 * grid.margin__wide
    ),
    grid_margin__right: `calc(${_var.grid_margin} - var(--browser-scrollbar-width))`,
    grid_margin__right__neg: `calc(${_var.grid_margin__neg} + var(--browser-scrollbar-width))`,

    grid_0_1: _flexCol(0, 1),
    grid_1: _flexCol(1),
    grid_1_1: _flexCol(1, 1),
    grid_2: _flexCol(2),
    grid_2_2: _flexCol(2, 2),
    grid_3: _flexCol(3),
    grid_3_3: _flexCol(3, 3),
    grid_4: _flexCol(4),
    grid_4_4: _flexCol(4, 4),
    grid_5: _flexCol(5),
    grid_5_5: _flexCol(5, 5),
    grid_6: _flexCol(6),
    grid_6_6: _flexCol(6, 6),
    grid_7: _flexCol(7),
    grid_7_7: _flexCol(7, 7),
    grid_8: _flexCol(8),
    grid_8_8: _flexCol(8, 8),
    grid_9: _flexCol(9),
    grid_9_9: _flexCol(9, 9),
    grid_10: _flexCol(10),
    grid_10_10: _flexCol(10, 10),
    grid_11: _flexCol(11),
    grid_11_11: _flexCol(11, 11),
    grid_12: _flexCol(12),

    grid_gutter: _var.grid_0_1,
    grid_column: _var.grid_1,

    grid_0_1__neg: _flexCol(0, -1),
    grid_1__neg: _flexCol(-1, 0),
    grid_gutter__neg: _var.grid_0_1__neg,
    grid_column__neg: _var.grid_1__neg,
  })}

  // @deprecated (Remove in v0.9)
  --grid-edge: ${_var.grid_margin},
  --grid-edge--neg: ${_var.grid_margin__neg},
  --grid-edge--right: ${_var.grid_margin__right},
  --grid-edge--right--neg: ${_var.grid_margin__right__neg},
  // END: deprecation


  @media ${mq.wide} {
    ${gridVars.override({
      grid_margin: px(grid.margin__wide),
      grid_margin__neg: px(-1 * grid.margin__wide),

      grid_0_1: cols_px(0, 1),
      grid_1: cols_px(1),
      grid_1_1: cols_px(1, 1),
      grid_2: cols_px(2),
      grid_2_2: cols_px(2, 2),
      grid_3: cols_px(3),
      grid_3_3: cols_px(3, 3),
      grid_4: cols_px(4),
      grid_4_4: cols_px(4, 4),
      grid_5: cols_px(5),
      grid_5_5: cols_px(5, 5),
      grid_6: cols_px(6),
      grid_6_6: cols_px(6, 6),
      grid_7: cols_px(7),
      grid_7_7: cols_px(7, 7),
      grid_8: cols_px(8),
      grid_8_8: cols_px(8, 8),
      grid_9: cols_px(9),
      grid_9_9: cols_px(9, 9),
      grid_10: cols_px(10),
      grid_10_10: cols_px(10, 10),
      grid_11: cols_px(11),
      grid_11_11: cols_px(11, 11),
      grid_12: cols_px(12),

      grid_0_1__neg: cols_px(0, -1),
      grid_1__neg: cols_px(-1, 0),
    })}
  }
`;
