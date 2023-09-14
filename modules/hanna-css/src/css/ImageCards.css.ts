import range from '@hugsmidjan/qj/range';
import { css, ms, pct, pct_f } from 'es-in-css';

import { scale_container, scale_phone_netbook } from '../lib/between.js';
import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars.js';

import { CardBlock_css, CardList_css, CardListTitle_css } from './styles/cards.js';
import {
  avoidCssnanoMerging,
  DEPS,
  extendBackgroundWithUnderlay,
  prem,
} from './utils/miscUtils.js';
import {
  SeenEffect__fadein,
  SeenEffect__fadeup,
  SeenEffect__resetDefault,
  SeenEffect__transition,
} from './utils/seenEffects.js';

export const ImageCards__seenEffects = (trigger?: null | string) => css`
  ${SeenEffect__fadeup({ child: '.ImageCards__summary', trigger })};
  ${SeenEffect__fadein({ child: '.ImageCards__item', trigger })};
  ${range(1, 12).map((i) =>
    SeenEffect__transition({ child: `.ImageCards__item:nth-child(${i})`, trigger })(css`
      transition-delay: ${ms(i * 50 + 100)};
    `)
  )}
  // Default delay, applied to for items where n > 12
      ${SeenEffect__transition({ child: '.ImageCards__item', trigger })(css`
    transition-delay: ${ms(13 * 50 + 100)};
  `)}
`;

// ---------------------------------------------------------------------------

const borderW = prem(12);

export default css`
  ${DEPS('ButtonTertiary')}

  @media screen {
    .ImageCards {
      --ImageCards--fallback: url('/assets/illustrations/esjan.png');
      ${CardBlock_css}
      margin-bottom: ${scale_container(60, 110)};
    }

    * {
      /* Custom (optional) transition effect */
      ${SeenEffect__resetDefault('.ImageCards')}
      ${ImageCards__seenEffects()}
    }

    .ImageCards--background {
      ${extendBackgroundWithUnderlay}
      background-color: ${vars.color_suld_25};

      padding: 100px 0;
      ${avoidCssnanoMerging(
        css`
          padding: min(${scale_phone_netbook(40, 136)}, 136px) 0;
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
          row-gap: min(${scale_phone_netbook(48, 80)}, 80px);
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
        link_weight: vars.font_weight__normal,
      })}
      font: ${vars.font_bd_s};

      display: flex;
      flex-flow: column;
      height: 100%;
      padding-bottom: ${vars.space_3};
      ${avoidCssnanoMerging(
        css`
          padding-bottom: min(${scale_phone_netbook(16, 32)}, ${vars.space_4});
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
          margin-bottom: min(${scale_phone_netbook(12, 24)}, ${vars.space_3});
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
      font: ${vars.font_sh_s};
    }
    .ImageCards__card__title:last-child {
      margin-bottom: ${vars.space_1};
    }

    .ImageCards__card__meta {
      color: ${vars.color_suld_150};
      margin-top: ${vars.space_1};
    }

    .ImageCards__card__summary {
      margin-top: ${vars.space_1};
      color: ${vars.color_suld_200};
      flex-grow: 1;
    }
  }
`;
