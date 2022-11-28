import { css } from 'es-in-css';

import { between_cols, between_phone_netbook } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { cols_pct, cols_px } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';
import { WARNING__ } from '../lib/WARNING__';

import { AttentionStyle } from './styles/attention';
import { grid_units, prem } from './utils/miscUtils';

export default css`
  @media screen {
    .InfoBlock {
      background-color: ${vars.color_suld_25};
      padding: ${between_cols(40, 120)} ${cols_pct(1, 1)};
      padding-left: ${vars.grid_margin};
      margin-left: ${vars.grid_margin__neg};
      box-sizing: content-box;
      position: relative;
      max-width: ${cols_px(10)};
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
      font-size: ${between_phone_netbook(49, 89)};
      overflow: hidden;

      @media ${mq.wide} {
        font-size: ${prem(89)};
      }
    }

    .InfoBlock__title {
      font: ${vars.font_hd_s};
      margin-bottom: ${prem(20)};
    }

    .InfoBlock__subtitle {
      font: ${vars.font_bd_l};

      @media ${mq.tablet_up} {
        width: ${cols_pct(5)};
        min-width: 350px;
      }
    }

    .InfoBlock__items {
      margin-top: ${between_cols(35, 64, 10)};

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
