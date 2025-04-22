import { css, em } from 'es-in-css';

import { scale_container, scale_phablet_tablet } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { grid, gridPx } from '../lib/grid.js';
import { hannaVars } from '../lib/hannavars.js';
import { WARNING_soft__ } from '../lib/WARNING__.js';

import { cols_pct, DEPS, prem, resetImageChild } from './utils/miscUtils.js';

export default css`
  ${DEPS('ButtonPrimary', 'ButtonTertiary')}

  @media screen {
    .HeroBlock {
      padding: ${scale_container(0, 1 * grid.unit)} 0;
      margin-bottom: ${scale_container(30, 100)};
      display: flex;
      flex-flow: column nowrap;
    }

    .HeroBlock__title {
      font: ${hannaVars.font_hd_l};
      margin-bottom: ${em(40 / 64)};
    }

    .HeroBlock__image {
      ${resetImageChild};
      display: block;
      margin: ${hannaVars.space_2} calc(0.5 * ${hannaVars.grid_margin__neg});
      order: 1;
    }

    .HeroBlock__summary {
      font: ${hannaVars.font_bd_l};
      margin-bottom: ${em(40 / 20)};
    }

    .HeroBlock__summary li:not([class]), // Captures ul, ol
    .HeroBlock__summary blockquote {
      ${WARNING_soft__('Use simple markup only')};
    }

    .HeroBlock__summary > p {
      margin-bottom: ${hannaVars.baseVerticalMargin};
    }

    .HeroBlock > :last-child {
      margin-bottom: 0;
    }
  }

  // ---------------------------------------------------------------------------

  @media ${mq.phablet_tablet} {
    .HeroBlock {
      padding-right: ${scale_phablet_tablet(0, gridPx(3, 3))};
    }
  }

  // ---------------------------------------------------------------------------

  @media ${mq.netbook_up} {
    .HeroBlock {
      position: relative;
      padding-right: ${cols_pct(6, 6)};
      min-height: ${prem(432)};
      z-index: 0; // scope the *__image underlap
    }

    .HeroBlock__image {
      position: absolute;
      z-index: -1;
      top: 50%;
      right: ${cols_pct(0, -1)};
      width: ${cols_pct(6, 7)};
      padding-top: ${cols_pct(6)};
      margin: 0;
      transform: translateY(-50%);
      pointer-events: none;
    }

    .HeroBlock__image > img {
      pointer-events: initial;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: auto;
      object-fit: contain;
    }
  }
`;
