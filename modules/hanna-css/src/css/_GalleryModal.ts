import { css } from 'es-in-css';

import { scale_container } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { grid } from '../lib/grid.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';

import { hideText_css } from './utils/hideText.js';
import { grid_units, prem } from './utils/miscUtils.js';

export const GalleryModal_css = () => css`
  @media screen {
    .GalleryModalwrapper {
      display: flex;
      background: ${vars.color_suld_0};
      position: fixed;
      z-index: ${vars.zindex__modal};
      top: 0;
      right: 0;
      left: 0;
      height: 100vh;
      overflow-y: auto;
      transition: all 200ms ease-in;
      transition-property: opacity, visibility;
    }

    [hidden].GalleryModalwrapper {
      display: block; // override default \`[hidden][hidden]\` styli5ng
      visibility: hidden;
      opacity: 0;
    }

    .GalleryModal {
      width: 100%;
      max-width: ${prem(grid.contentMaxWidth)};
      max-width: ${prem(grid.contentMaxWidth__outer)};
      margin: 0 auto;
      position: relative;

      display: flex;
      flex-flow: column;
      align-items: center;

      padding: ${scale_container(72, 104)} ${vars.grid_margin};

      @media ${mq.netbook_up} {
        flex-flow: row;
      }
    }

    .GalleryModalPager {
      display: flex;
      flex-flow: row-reverse;
    }

    .GalleryModalPager__button,
    .GalleryModal__closebutton {
      color: ${vars.color_faxafloi_100};

      &::before {
        ${iconStyle(vars.icon__arrow_left)}
        font-size: 23px;
      }
    }

    .GalleryModalPager__button {
      position: static;

      &::before {
        width: 100%;
      }

      @media ${mq.netbook_up} {
        ${hideText_css('soft')};
        width: ${vars.grid_column};
        height: 50%;
        transform: translateY(-50%);
        position: absolute;
      }

      @media ${mq.phone_tablet} {
        margin: ${prem(20)} 0;
        text-align: center;
        min-width: ${prem(128)};
      }
    }
    .GalleryModalPager__button--next {
      right: ${vars.grid_margin};
    }
    .GalleryModalPager__button--next::before {
      content: ${vars.icon__arrow_right};
    }
    .GalleryModalPager__button:disabled {
      display: none;
    }
    .GalleryModalPager__button--prev {
      @media ${mq.netbook_up} {
        left: 0;
        width: ${vars.grid_margin};
      }
    }

    .GalleryModal__closebutton {
      position: absolute;
      z-index: 1;
      top: ${vars.grid_column};
      left: ${vars.grid_margin};
      font-weight: ${vars.font_weight__bold};
    }
    .GalleryModal__closebutton::before {
      margin-right: ${vars.space_1$5};
    }
  }
`;

// ===========================================================================

export const GalleryModalItem_css = () => css`
  @media screen {
    .GalleryModalItem {
      width: 100%;
      display: flex;
      flex-flow: column;
      align-items: center;

      transition: all 200ms ease-in;
      transition-property: opacity;

      @media ${mq.netbook_up} {
        flex-flow: row;
      }
    }

    .GalleryModalItem---enter > .GalleryModalItem__image {
      opacity: 0;
    }

    .GalleryModalItem---enter > .GalleryModalItem__text > .GalleryModalItem__caption,
    .GalleryModalItem---enter > .GalleryModalItem__text > .GalleryModalItem__description {
      opacity: 0;
    }
    .GalleryModalItem---enter-done > .GalleryModalItem__text > .GalleryModalItem__caption,
    .GalleryModalItem---enter-done
      > .GalleryModalItem__text
      > .GalleryModalItem__description {
      opacity: 1;
    }

    .GalleryModalItem---enter-done > .GalleryModalItem__image {
      opacity: 1;
    }

    .GalleryModalItem__text {
      background: ${vars.theme_color_primary};
      color: ${vars.theme_color_primary__text};
      margin-top: ${grid_units(2.5)};
      padding: ${grid_units(3)};

      @media ${mq.netbook_up} {
        margin-top: 0;
        width: ${vars.grid_3_3};
        min-height: 392px; // magic number!
        display: flex;
        flex-flow: column;
        justify-content: center;
      }
    }

    .GalleryModalItem__caption {
      font: ${vars.font_heading_s};
      margin-bottom: ${vars.space_2};
    }

    .GalleryModalItem__image {
      order: -1;

      @media ${mq.netbook_up} {
        width: calc(${vars.grid_7_7} + ${vars.grid_0_1});
        margin-left: auto;
        margin-right: ${vars.grid_1};
        order: initial;
      }
    }
    .GalleryModalItem__image > img {
      width: auto;
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }

    .GalleryModalItem__caption,
    .GalleryModalItem__description,
    .GalleryModalItem__image {
      transition: all 200ms ease-in;
      transition-property: opacity;
    }
  }
`;
