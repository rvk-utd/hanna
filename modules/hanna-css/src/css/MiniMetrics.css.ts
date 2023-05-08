import { css, em, rem } from 'es-in-css';

import { between_cols } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { font } from '../lib/font.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { ButtonTertiaryStyle } from './styles/buttons.js';
import { cols_px, prem, px_pct } from './utils/miscUtils.js';

export default css`
  @media screen {
    .MiniMetrics {
      position: relative;
      margin-top: ${between_cols(60, 240)};
      margin-bottom: ${between_cols(60, 290)};
      display: flex;
      flex-flow: column;
      justify-content: center;
      min-height: ${cols_px(3)};
    }

    .MiniMetrics__text {
      font: ${vars.font_hd_xl};
      display: block;
      margin-bottom: ${em(40 / font.sizes.hd_xl_size)};
      max-width: ${cols_px(9)};
    }
    .MiniMetrics__more {
      ${ButtonTertiaryStyle}
      font: ${vars.font_sh_s};
      --ButtonTertiary--dashWidth: ${rem(24 / font.sizes.sh_s_size)};
      // --ButtonTertiary--hover--dashWidth: ${prem(48)};
      --ButtonTertiary--dashHeight: ${rem(4 / font.sizes.sh_s_size)};
    }
    .MiniMetrics__more::before {
      top: calc(0.5 * ${vars.font_sh_s_leading});
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
          mask-image: url('/assets/bling/circle-small.svg');
          mask-position: 50% 50%;
          mask-repeat: no-repeat;
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
          mask-image: url('/assets/bling/waves-medium.svg');
          mask-size: 133.33% auto;
          mask-position: 0% 50%;
          mask-repeat: no-repeat;
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
