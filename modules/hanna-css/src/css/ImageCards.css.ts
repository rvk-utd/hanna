import range from '@hugsmidjan/qj/range';
import { css, ms, pct, pct_f } from 'es-in-css';

import { between_cols, between_phone_netbook } from '../lib/between';
import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars';

import { CardBlock_css, CardList_css, CardListTitle_css } from './styles/cards';
import {
  avoidCssnanoMerging,
  extendBackgroundWithUnderlay,
  prem,
} from './utils/miscUtils';
import {
  SeenEffect__delay,
  SeenEffect__fadein,
  SeenEffect__fadeup,
  SeenEffect__transition,
} from './utils/seenEffects';

const borderW = prem(12);

export default css`
  /*!@deps
    ButtonTertiary
  */
  @media screen {
    .ImageCards {
      --ImageCards--fallback: url('/assets/illustrations/esjan.png');
      ${CardBlock_css}
      margin-bottom: ${between_cols(60, 110)};

      ${SeenEffect__fadeup('.ImageCards__summary')};
      ${SeenEffect__fadein('.ImageCards__item')};

      ${range(1, 12).map(
        (i) => css`
          ${SeenEffect__transition(`.ImageCards__item:nth-child(${i})`)(
            css`
              ${SeenEffect__delay(ms(i * 50 + 200))}
            `
          )}
        `
      )}
    }

    .ImageCards--background {
      ${extendBackgroundWithUnderlay}
      background-color: ${vars.color_suld_25};

      padding: 100px 0;
      ${avoidCssnanoMerging(
        css`
          padding: min(${between_phone_netbook(40, 136)}, 136px) 0;
        `
      )}
    }

    .ImageCards__title {
      ${CardListTitle_css}
    }
    .ImageCards__summary {
      grid-area: title;
      margin-bottom: ${vars.baseVerticalMargin};
    }
    .ImageCards__summary > .ImageCards__title {
      margin-bottom: ${vars.space_2};
    }

    .ImageCards__list {
      ${CardList_css}

      row-gap: 60px;

      ${avoidCssnanoMerging(
        css`
          row-gap: min(${between_phone_netbook(48, 80)}, 80px);
        `
      )}
    }

    .ImageCards__item {
      // …
    }

    .ImageCards__card {
      ${hannaVarOverride({
        link_color: '_inherit',
        link_underline: `1px solid ${vars.color_suld_200}`,
        link_underline__hover: `1px solid ${vars.color_faxafloi_100}`,
      })}

      display: block;
      height: 100%;
      padding-bottom: ${vars.space_3};
      ${avoidCssnanoMerging(
        css`
          padding-bottom: min(${between_phone_netbook(16, 32)}, ${vars.space_4});
        `
      )}
    }

    .ImageCards__image {
      display: block;
      position: relative;
      padding-top: ${pct_f(168 / 272)};
      margin-bottom: ${vars.space_2};
      ${avoidCssnanoMerging(
        css`
          margin-bottom: min(${between_phone_netbook(12, 24)}, ${vars.space_3});
        `
      )}
    }
    .ImageCards__image--missing {
      border: ${borderW} solid transparent;
      padding-top: calc(${pct(168 / 272)} - ${2 * borderW});
      background: var(--ImageCards--fallback) 50% 50% / contain no-repeat;
    }

    .ImageCards__image > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ImageCards__card__title {
      margin-bottom: ${vars.space_1};
      font: ${vars.font_sh_s};
      display: block;
    }

    .ImageCards__card__meta {
      font: ${vars.font_bd_s};
      color: ${vars.color_suld_150};
      font-weight: ${vars.font_weight__normal};
    }
  }
`;
