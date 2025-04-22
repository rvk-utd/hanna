import { css } from 'es-in-css';

import { scale_container } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { gridPx } from '../lib/grid.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { DEPS, prem } from './utils/miscUtils.js';

export default css`
  ${DEPS('Bling', 'efnistakn')}

  @media screen {
    .FeatureList {
      --efnistakn: ''; // scope variable to container.
      background-color: ${vars.color_suld_25};
      --left-offset: ${vars.grid_1};
      padding-top: ${scale_container(24, 64)};
      padding-bottom: ${scale_container(32, 80)};
      margin-top: ${scale_container(30, 100)};
      margin-bottom: ${scale_container(30, 100)};

      @media ${mq.phone} {
        --left-offset: ${vars.grid_0_1};
        margin-left: ${vars.grid_0_1__neg};
        margin-right: ${vars.grid_0_1__neg};
      }

      @media ${mq.wide} {
        --left-offset: ${vars.grid_1_1};
      }
    }

    .FeatureList__title {
      font: ${vars.font_hd_s};
      max-width: ${gridPx(4, 4)};
      margin-bottom: ${scale_container(20, 84)};
      margin-left: var(--left-offset);
    }

    .FeatureList__list {
      margin-left: var(--left-offset);
      column-gap: 0;

      @media ${mq.phablet} {
        width: ${vars.grid_10_10};
        columns: 2;
      }
      @media ${mq.tablet_up} {
        width: calc(${vars.grid_9_9} + 3 * ${vars.grid_0_1});
        max-width: ${gridPx(9, 9)};
        columns: 3;
      }
    }
    .FeatureList__feature {
      position: relative;
      break-inside: avoid;
      padding-bottom: ${vars.grid_0_1};
      padding-right: ${vars.grid_0_1};
      padding-left: ${prem(40)};
      box-sizing: content-box;
      // Fix for Firefox css column rendering glitch which
      // causes the .FeatureList__feature::before icon to blink
      // in/out as the viewport is resized.
      min-height: calc(${vars.font_base_leading} + 1px);
    }

    .FeatureList__feature:not([data-efnistakn]) {
      --efnistakn: url('/assets/efnistakn/skipurit_01.svg');
    }

    .FeatureList__feature::before {
      content: '';
      position: absolute;
      top: 0;
      left: ${prem(-2)};
      width: ${prem(24)};
      height: ${prem(24)};
      background: var(--efnistakn) no-repeat;
      background-size: contain;
    }
  }
`;
