import { css, em, rem } from 'es-in-css';

import { scale_container } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { font } from '../lib/font.js';
import { gridPx } from '../lib/grid.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { ButtonTertiaryStyle } from './styles/buttons.js';
import { prem, px_pct } from './utils/miscUtils.js';

export default css`
  @media screen {
    .MiniMetrics {
      position: relative;
      margin-top: ${scale_container(60, 240)};
      margin-bottom: ${scale_container(60, 290)};
      display: flex;
      flex-flow: column;
      justify-content: center;
      min-height: ${gridPx(3)};
    }

    .MiniMetrics__text {
      font: ${vars.font_heading_xl};
      display: block;
      margin-bottom: ${em(40 / font.sz.heading_xl_size)};
      max-width: ${gridPx(9)};
    }
    .MiniMetrics__more {
      ${ButtonTertiaryStyle}
      font: ${vars.font_heading_s};
      --ButtonTertiary--dashWidth: ${rem(24 / font.sz.heading_s_size)};
      // --ButtonTertiary--hover--dashWidth: ${prem(48)};
      --ButtonTertiary--dashHeight: ${rem(4 / font.sz.heading_s_size)};
    }
    .MiniMetrics__more::before {
      top: calc(0.5 * ${vars.font_heading_s_leading});
    }

    @media ${mq.phablet_up} {
      @supports (mask-image: url('')) {
        .MiniMetrics::before {
          content: '';
          position: absolute;
          z-index: -1;
          bottom: 50%;
          margin-bottom: ${px_pct(125)};
          right: 0;
          width: ${px_pct(127)};
          padding-top: ${px_pct(127)};
          // background-color: ${vars.theme_color_secondary};
          background-color: ${vars.color_rokkur_100};
          mask: url('/assets/bling/circle-small.svg') 50% 50% no-repeat;
        }
        .MiniMetrics::after {
          content: '';
          position: absolute;
          z-index: -1;
          bottom: 50%;
          left: 50%;
          margin-bottom: ${px_pct(-95)};
          width: ${px_pct(3 * 275)};
          padding-top: ${px_pct(232)};
          // background-color: ${vars.theme_color_tertiary};
          background-color: ${vars.color_esja_100};
          mask: url('/assets/bling/waves-medium.svg') 0% 50% / 133.33% auto no-repeat;
        }
      }
    }
    @media ${mq.phablet} {
      .MiniMetrics::before {
        content: none;
      }
      .MiniMetrics::after {
        left: 360px;
        width: 440px;
        padding-top: 125px;
      }
    }
  }
`;
