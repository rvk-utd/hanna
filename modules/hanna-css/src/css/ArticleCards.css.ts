import { css, pct_f } from 'es-in-css';

import { scale_phone_netbook } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars.js';

import { CardList_css, CardListVariables } from './styles/cards.js';
import { avoidCssnanoMerging, prem, resetImageChild } from './utils/miscUtils.js';

const borderW = prem(12);

export default css`
  .ArticleCards {
    --ArticleCards--fallback: url('/assets/illustrations/esjan.png');
    ${CardList_css}

    margin-bottom: 60px;
    ${avoidCssnanoMerging(
      css`
        margin-bottom: min(${scale_phone_netbook(48, 80)}, 80px);
      `
    )}
    row-gap: 60px;
    ${avoidCssnanoMerging(
      css`
        row-gap: min(${scale_phone_netbook(48, 80)}, 80px);
      `
    )}
  }
  .ArticleCards--large {
    @media ${mq.tablet} {
      ${CardListVariables.override({
        card_width: vars.grid_6,
      })}
    }
    @media ${mq.netbook_up} {
      ${CardListVariables.override({
        card_width: vars.grid_4,
      })}
    }
  }

  .ArticleCards__item {
    // …
  }

  .ArticleCards__card {
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
    padding-bottom: ${vars.space_2};

    ${avoidCssnanoMerging(
      css`
        padding-bottom: min(${scale_phone_netbook(16, 24)}, ${vars.space_3});
      `
    )}
  }

  .ArticleCards__image {
    display: block;
    position: relative;
    padding-top: ${pct_f(168 / 272)};
    margin-bottom: ${vars.space_2};

    ${avoidCssnanoMerging(
      css`
        margin-bottom: min(${scale_phone_netbook(12, 24)}, ${vars.space_3});
      `
    )}

    ${resetImageChild}
  }
  .ArticleCards__image--missing {
    border: ${borderW} solid transparent;
    // TODO: Verify value
    padding-top: calc(${pct_f(168 / 272)} - (2 * ${borderW}));
    background: var(--ArticleCards--fallback) 50% 50% / contain no-repeat;
  }

  .ArticleCards__image > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    -o-object-fit: cover;
  }

  .ArticleCards__card__title {
    font: ${vars.font_sh_s};
  }
  .ArticleCards__card__title:last-child {
    margin-bottom: ${vars.space_1};
  }

  .ArticleCards__card__meta {
    color: ${vars.color_suld_150};
    margin-top: ${vars.space_1};
  }

  .ArticleCards__card__summary {
    margin-top: ${vars.space_1};
    flex-grow: 1;
  }
`;
