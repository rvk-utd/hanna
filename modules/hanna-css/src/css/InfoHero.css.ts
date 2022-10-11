import { css } from 'es-in-css';

import { between_cols } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { colors } from '../lib/colors';
import { cols_pct, px_pct } from '../lib/grid';
import { hannaVars } from '../lib/hannavars';

import { prem } from './utils/miscUtils';

export default css`
  /*!@deps
	ButtonTertiary
	Sharpie
	Bling
*/
  @media screen {
    .InfoHero {
      position: relative;
      margin-bottom: ${between_cols(30, 100)};
      display: flex;
      flex-flow: column-reverse;
      justify-content: space-between;
    }
    @media ${mq.tablet_up} {
      .InfoHero {
        flex-flow: row-reverse;
      }
      .InfoHero--align--left {
        flex-flow: row;
      }
    }

    .InfoHero__image {
      position: relative;
      margin: 0 ${hannaVars.grid_margin__neg};
      padding-top: 75%;

      @media ${mq.phablet_up} {
        padding-left: ${hannaVars.grid_margin};
        box-sizing: content-box;
        width: ${cols_pct(6)};
        padding-top: ${px_pct(690)};
      }
    }

    .InfoHero__image--missing {
      background-color: ${colors.suld_50};
    }
    .InfoHero__image > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: 50% 31%;
    }
    .InfoHero__wrapper {
      display: flex;
      flex-direction: column;
    }
    .InfoHero__content {
      margin-top: ${between_cols(20, 40)};

      @media ${mq.phablet_up} {
        width: ${cols_pct(6)};
        margin-bottom: ${px_pct(170)};
      }

      @media ${mq.netbook_up} {
        width: ${cols_pct(5)};
      }
    }

    .InfoHero__title {
      font: ${hannaVars.font_hd_l};
      margin-bottom: 0;
      word-break: break-word;
      overflow-wrap: break-word;
    }
    .InfoHero--align--left > * > .InfoHero__title {
      @media ${mq.netbook_up} {
        margin-right: ${hannaVars.grid_1__neg};
      }
    }

    .InfoHero__titleblurb {
      margin-bottom: ${px_pct(24, 5)};
    }
    .InfoHero__subtitle {
      font: ${hannaVars.font_hd_l};
      margin-bottom: ${prem(8)};
    }
    .InfoHero__blurb {
      font: ${hannaVars.font_bd_s};
      color: ${colors.suld_150};
      margin-bottom: ${prem(8)};
    }

    .InfoHero__buttons {
      margin-top: ${prem(32)};
    }
    .InfoHero__buttons > .ButtonTertiary {
      display: block;
    }
  }
`;
