import { css, em } from 'es-in-css';

import { buildVariables } from '../../lib/cssutils.js';
import { font } from '../../lib/font.js';
import { cols_pct } from '../../lib/grid.js';
import { hannaVars as vars } from '../../lib/hannavars.js';
import { prem } from '../utils/miscUtils.js';

const fontSize = font.sizes.sh_l_size;

export const LabeledTitleVars = buildVariables([
  'dash_indent',
  'dash_width',
  'dash_margin',
]);
const l = LabeledTitleVars;

export const LabeledTitleStyle__basics = (margin = true) => css`
  font: ${vars.font_sh_l};
  display: flex;
  ${margin &&
  css`
    margin-bottom: ${vars.baseVerticalMargin};
  `}

  &::before {
    content: '';
    ${'' /* allows outdenting by switching parent to display: block */}
    float: left;
    margin-top: 0.7em;
    height: ${prem(4)};
    background-color: ${vars.theme_color_primary__safeish};
    transform: translateY(-50%);
    width: ${l.vars.dash_width.or(em(36 / fontSize))};
    margin-right: ${l.vars.dash_margin.or(em(20 / fontSize))};
    margin-left: ${l.vars.dash_indent.or(0)};
  }
`;

export const LabeledTitleStyle__floating = () => css`
  width: ${cols_pct(5, 5)};
  ${l.override({
    dash_width: vars.grid_column,
    dash_margin: vars.grid_gutter,
  })}
`;

export const LabeledTitleStyle__outdented = () => css`
  display: block;
  position: relative;
  width: ${cols_pct(4, 4)};
  ${l.override({
    dash_width: `calc(${36 / 80} * ${vars.grid_margin})`,
    dash_margin: 0,
    dash_indent: vars.grid_margin__neg,
  })}
`;
