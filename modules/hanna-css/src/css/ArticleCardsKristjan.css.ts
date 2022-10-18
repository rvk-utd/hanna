import { css, pct } from 'es-in-css';

import { between_phone_netbook } from '../lib/between';
import { hannaVars as vars } from '../lib/hannavars';

import { CardList_css } from './styles/cards';
import { avoidCssnanoMerging, prem } from './utils/miscUtils';

const borderW = prem(12);

export default css`
  .ArticleCards {
    --ArticleCards--fallback: url('/assets/illustrations/esjan.png');
    ${CardList_css}

    margin-bottom: 60px;
    ${avoidCssnanoMerging(
      css`
        margin-bottom: min(${between_phone_netbook(48, 80)}, 80px);
      `
    )}
    row-gap: 60px;
    ${avoidCssnanoMerging(
      css`
        row-gap: min(${between_phone_netbook(48, 80)}, 80px);
      `
    )}
  }

  .ArticleCards__item {
    // …
  }

  .ArticleCards__card {
    --link-color: _inherit;
    --link-underline: 1px solid ${vars.color_suld_200};
    --link-underline--hover: 1px solid ${vars.color_faxafloi_100};

    display: block;
    height: 100%;
    padding-bottom: ${vars.space_2};

    ${avoidCssnanoMerging(
      css`
        padding-bottom: min(${between_phone_netbook(16, 24)}, ${vars.space_3});
      `
    )}
  }

  .ArticleCards__image {
    display: block;
    position: relative;
    padding-top: ${pct(168 / 272)};
    margin-bottom: ${vars.space_2};

    ${avoidCssnanoMerging(
      css`
        margin-bottom: min(${between_phone_netbook(12, 24)}, ${vars.space_3});
      `
    )}
  }
  .ArticleCards__image--missing {
    border: ${borderW} solid transparent;
    padding-top: calc(${pct(168 / 272)} - ${2 * borderW});
    background: var(--ArticleCards--fallback) 50% 50% / contain no-repeat;
  }

  .ArticleCards__image > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ArticleCards__card__title {
    margin-bottom: ${vars.space_1};
    font: ${vars.font_sh_s};
    display: block;
  }

  .ArticleCards__card__meta {
    font: ${vars.font_bd_s};
    color: ${vars.color_suld_150};
    font-weight: ${vars.font_weight__normal};
  }
`;
