import { css, em } from 'es-in-css';

import { scale_container, scale_phone_netbook } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { hannaVars, hannaVars as vars } from '../lib/hannavars.js';

import {
  cols_pct,
  cols_px,
  DEPS,
  extendBackgroundWithUnderlay,
  grid_units,
  prem,
} from './utils/miscUtils.js';

export default css`
  ${DEPS(
    'TextInput',
    'SearchInput',
    'Datepicker',
    'Selectbox',
    'ButtonPrimary',
    'ButtonSecondary',
    'ButtonTertiary',
    'Footnote'
  )}

  @media screen {
    .PageFilter {
      background-color: ${vars.color_suld_25};
      padding: ${scale_container(30, 80)} 0 0 0;
      margin-bottom: ${scale_container(64, 128)};
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: flex-start;
      ${extendBackgroundWithUnderlay().trim()}
    }

    .PageFilter::before {
      border-left: ${scale_phone_netbook(8, 24)} solid ${hannaVars.theme_color_primary};
      margin-bottom: ${scale_container(-32, -64)};
      pointer-events: none;

      @media ${mq.wide} {
        border-width: ${prem(24)};
      }
    }

    .PageFilter--underlap {
      @media ${mq.tablet_up} {
        margin-bottom: 0;
      }
    }

    .PageFilter__title {
      font: ${vars.font_hd_s};
      margin-bottom: ${em(20 / 64)};
      width: 100%;
    }

    .PageFilter__summary {
      width: 100%;
    }

    .PageFilter__filters {
      display: flex;
      flex-flow: row wrap;
      align-items: flex-start;
      margin-top: ${prem(20)};
      margin-bottom: ${scale_container(0, 24)};
      width: 100%;
      max-width: ${cols_px(9, 9)};
    }

    .PageFilter__filters > .FormField {
      margin-right: ${hannaVars.grid_gutter};
      margin-bottom: ${grid_units(3)};
      ${
        '' // min-width: ${cols_pct(3, 2, { ofCols: 9, ofGutters: 9 })}; // In FireFox the min-width becomes larger and thus only fits 2 FormFields per line.
      }
      min-width: ${cols_pct(3, 1, { ofCols: 9, ofGutters: 9 })};

      @media ${mq.phone} {
        width: 100%;
      }
    }

    .PageFilter__buttons {
      margin-top: ${prem(20)};
      margin-bottom: ${scale_container(0, 24)};
    }

    .PageFilter__buttons > .ButtonTertiary:last-child,
    .PageFilter__buttons > .ButtonPrimary:last-child {
      margin-right: 0;
      ${
        ''
        // The default max-content value triggers a FireFox flex-item width calculation bug,
        // adding ~38ox of whitespace on right-hand-side when there's only a single buttuon.
        // o_O   –– 2020-08-24
      }
      width: auto;
    }

    .PageFilter > .Footnote {
      margin-top: ${scale_container(30, 60)};
      margin-bottom: 0;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        border-top: 1px solid currentColor;
        margin-top: ${scale_container(-12, -40)};
      }
    }
  }
`;
