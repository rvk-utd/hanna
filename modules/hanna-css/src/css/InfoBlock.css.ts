import { css } from 'es-in-css';

import { scale_cols, scale_container, scale_phone_netbook } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { gridPx } from '../lib/grid.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { AttentionStyle } from './styles/attention.js';
import { cols_pct, grid_units, prem } from './utils/miscUtils.js';

export default css`
  @media screen {
    .InfoBlock {
      background-color: ${vars.color_suld_25};
      padding: ${scale_container(40, 120)} ${cols_pct(1, 1)};
      padding-left: ${vars.grid_margin};
      margin-left: ${vars.grid_margin__neg};
      box-sizing: content-box;
      position: relative;
      max-width: ${gridPx(10)};
      margin-bottom: ${prem(64)};
    }
    .InfoBlock::before {
      ${iconStyle(vars.icon__fatchevron_up)}
      color: ${vars.theme_color_secondary};
      position: absolute;
      right: 0;
      width: 1em;
      height: 1em;
      line-height: 1em;
      margin: -0.2em -0.5em;
      max-width: calc(0.5em + ${vars.grid_margin__right});
      margin-right: max(${vars.grid_margin__right__neg}, -0.5em);
      font-size: ${scale_phone_netbook(49, 89)};
      overflow: hidden;

      @media ${mq.wide} {
        font-size: ${prem(89)};
      }
    }

    .InfoBlock__title {
      font: ${vars.font_heading_m};
      margin-bottom: ${prem(20)};
    }

    .InfoBlock__subtitle {
      font: ${vars.font_body_l};

      @media ${mq.tablet_up} {
        width: ${cols_pct(5)};
        min-width: 350px;
      }
    }

    .InfoBlock__items {
      margin-top: ${scale_cols(35, 64, 10)};

      @media ${mq.tablet_up} {
        column-count: 2;
        column-gap: ${prem(45)};
      }
    }
    .InfoBlock__item {
      padding-left: ${prem(28)};
      margin-bottom: ${prem(16)};
      break-inside: avoid;
    }
    .InfoBlock__item::before {
      content: '';
      display: inline-block;
      background-color: ${vars.theme_color_primary__safeish};
      margin-right: ${grid_units(2)};
      width: ${prem(12)};
      height: ${prem(4)};
      margin-left: ${prem(-28)};
    }

    .InfoBlock__extrainfo,
    .InfoBlock__attention {
      ${AttentionStyle};
    }

    .InfoBlock__extrainfo {
      padding-left: 0;
    }
    .InfoBlock__extrainfo::before {
      content: none;
    }

    .InfoBlock__extrainfo + .InfoBlock__attention,
    .InfoBlock__attention + .InfoBlock__extrainfo {
      ${WARNING__('Choose *EITHER* `__extrainfo` *OR* `__attention`.')};
    }
  }
`;
