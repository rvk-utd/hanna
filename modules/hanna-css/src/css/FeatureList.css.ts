import { css } from 'es-in-css';

import { between_cols, between_container } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { cols_px } from '../lib/grid';
import { hannaVars } from '../lib/hannavars';

import { prem } from './utils/miscUtils';
import { SeenEffect__fadeup } from './utils/seenEffects';

export default css`
  /*!@deps
    Bling
    efnistakn
  */
  @media screen {
    .FeatureList {
      ${SeenEffect__fadeup}
      --efnistakn: ''; // scope variable to container.
      background-color: ${hannaVars.color_suld_25};
      --left-offset: ${hannaVars.grid_1};
      padding-top: ${between_container(24, 64)};
      padding-bottom: ${between_container(32, 80)};
      margin-top: ${between_cols(30, 100)};
      margin-bottom: ${between_cols(30, 100)};

      @media ${mq.phone} {
        --left-offset: ${hannaVars.grid_0_1};
        margin-left: ${hannaVars.grid_0_1__neg};
        margin-right: ${hannaVars.grid_0_1__neg};
      }

      @media ${mq.wide} {
        --left-offset: ${hannaVars.grid_1_1};
      }
    }

    .FeatureList__title {
      @include HeadingStyle--small();
      font: ${hannaVars.font_hd_s};
      max-width: ${cols_px(4, 4)};
      margin-bottom: ${between_container(20, 84)};
      margin-left: var(--left-offset);
    }

    .FeatureList__list {
      margin-left: var(--left-offset);
      column-gap: 0;

      @media ${mq.phablet} {
        width: ${hannaVars.grid_10_10};
        columns: 2;
      }
      @media ${mq.tablet_netbook} {
        width: calc(${hannaVars.grid_9_9} + 3 * ${hannaVars.grid_0_1});
        columns: 3;
      }
      @media ${mq.wide} {
        width: ${hannaVars.grid_9_9};
        columns: 3;
      }
    }
    .FeatureList__feature {
      position: relative;
      break-inside: avoid;
      padding-bottom: ${hannaVars.grid_0_1};
      padding-right: ${hannaVars.grid_0_1};
      padding-left: ${prem(40)};
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
