import { ObjectKeys } from '@reykjavik/hanna-utils';
import { css, pct_f } from 'es-in-css';

import { scale_container, scale_phone_netbook } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { colorFamilies } from '../lib/colors.js';
import { grid } from '../lib/grid.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { carouselItemsScrollSnapStyles } from './styles/abstractCarousel.js';
import { ButtonTertiaryStyle } from './styles/buttons.js';
import { LinkStyle_Reset } from './styles/links.js';
import { DEPS, prem } from './utils/miscUtils.js';
import { carouselStepperBeforeSprinklingPadding } from './CarouselStepper.css.js';

const topBorderW = prem(21);

export default css`
  ${DEPS('Carousel')}

  @media screen {
    .ArticleCarousel {
      margin-bottom: ${scale_container(40, 130)};
      ${carouselStepperBeforeSprinklingPadding}
    }
    .ArticleCarousel__itemlist {
      ${carouselItemsScrollSnapStyles};
    }

    .ArticleCarousel__title {
      font: ${vars.font_hd_m};
      margin-bottom: ${scale_phone_netbook(32, 72)};

      @media ${mq.wide} {
        margin-bottom: ${vars.space_9};
      }
    }

    // @deprecated  (Remove in v0.9)
    .ArticleCarousel__items {
      ${WARNING__('Unsupported: use `.ArticleCarousel__itemlist` instead')};
      display: flex;
      flex-flow: row;
    }
    // @deprecated  (Remove in v0.9)
    .ArticleCarousel:not([data-sprinkled]) > .ArticleCarousel__items {
      overflow: auto;
    }
    // @deprecated  (Remove in v0.9)
    .ArticleCarousel__track {
      ${WARNING__('Unsupported: use `.ArticleCarousel__itemlist` instead')};
    }

    .ArticleCarouselCard {
      border: ${vars.border_default};
      border-width: 2px;
      border-top: 0;
      width: ${vars.grid_5};
      min-width: 330px;

      padding: ${topBorderW} ${vars.grid_column} ${scale_phone_netbook(24, 72)};
      margin-right: ${vars.grid_gutter};
      position: relative;

      @media ${mq.phone} {
        width: ${vars.grid_9_9};
        min-width: 280px;
      }
      @media ${mq.wide} {
        padding-bottom: ${vars.space_8};
      }
    }

    .ArticleCarouselCard::before {
      content: '';
      display: block;
    }

    .ArticleCarouselCard::after {
      content: '';
      display: block;
      height: ${topBorderW};
      position: absolute;
      top: 0;
      right: -2px;
      left: -2px;
      background-color: ${vars.theme_color_primary};
    }

    // Prefer \`data-color\` over inherited \`data-color-theme\`
    ${ObjectKeys(colorFamilies).map(
      (family) => css`
        .ArticleCarouselCard[data-color='${family}']::after {
          background-color: ${vars[`color_${family}_100`]};
        }
      `
    )}

    .ArticleCarouselCard__link {
      ${LinkStyle_Reset('noborder')};
    }

    .ArticleCarouselCard__illustration {
      position: relative;
      padding-top: ${pct_f(300 / (3 * grid.column + 4 * grid.gutter))};
      display: block;
      margin: 0 -1px;
      margin-bottom: ${vars.space_4};
    }
    .ArticleCarouselCard__illustration--photo {
      // photograp variant
    }
    .ArticleCarouselCard__illustration--missing {
      background-color: ${vars.color_suld_25};
    }

    .ArticleCarouselCard__illustration > img {
      position: absolute;
      top: ${vars.space_2};
      left: ${vars.grid_column__neg};
      left: ${vars.grid_column__neg};
      right: ${vars.grid_column__neg};
      width: calc(100% + ${vars.grid_column} + ${vars.grid_column});
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
    .ArticleCarouselCard__illustration--photo > img {
      object-fit: cover;
      top: 0;
    }

    .ArticleCarouselCard__title {
      font: ${vars.font_sh_l};
      margin-bottom: ${vars.space_4};
    }

    .ArticleCarouselCard__date {
      font: ${vars.font_bd_s};
      color: ${vars.color_suld_150};
      margin-bottom: ${vars.space_4};
      display: block;
    }

    .ArticleCarouselCard__summary {
      font: ${vars.font_bd_s};
      margin-bottom: ${vars.space_3};
    }

    .ArticleCarouselCard__morelink {
      ${ButtonTertiaryStyle};
    }

    .ArticleCarouselCard__morelink:not([aria-label]) {
      ${WARNING__('aria-label="" is missing')};
    }

    .ArticleCarousel > .CarouselStepper {
      margin-top: ${vars.space_3};
    }
  }
`;
