import { css } from 'es-in-css';

import {
  between_cols,
  between_phone_phablet,
  between_tablet_netbook,
} from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { ButtonTertiaryStyle } from './styles/buttons.js';
import { LinkStyle_SameColor } from './styles/links.js';
import { cols_pct, extendBackgroundWithUnderlay, grid_units } from './utils/miscUtils.js';
import { SeenEffect__fadeup } from './utils/seenEffects.js';

const offset = between_phone_phablet(0, 60);

export default css`
  @media screen {
    .IslandBlock {
      ${SeenEffect__fadeup}
      display: flex;
      flex-flow: column-reverse;
      justify-content: space-between;
      margin-top: ${between_cols(30, 100)};
      margin-bottom: ${between_cols(40, 167)};
    }

    .IslandBlock__image,
    .IslandBlock__content {
      display: block;
      margin: 0 ${vars.grid_margin__neg};
      padding: ${between_cols(20, 120)} ${vars.grid_margin};
    }
    .IslandBlock__content {
      background-color: ${vars.color_suld_25};
    }
    .IslandBlock__content:last-child {
      background-color: ${vars.theme_color_primary};
      color: ${vars.theme_color_primary__text};
      ${LinkStyle_SameColor}
    }

    .IslandBlock__title {
      font: ${vars.font_hd_s};
      margin-bottom: ${grid_units(3)};
    }

    .IslandBlock__summary {
      font: ${vars.font_bd_l};
      margin-bottom: ${grid_units(4)};
    }

    .IslandBlock__buttons {
    }
    .IslandBlock__button {
      ${ButtonTertiaryStyle}
      display: block;
    }

    .IslandBlock__image {
      // // Arg this bleeds around the edges of the SVG in chrome
      // background-color: ${vars.theme_color_tertiary};
      position: relative;
      display: block;
      overflow: hidden;
    }
    // NOTE: This Prevent background bleed around the edges of the SVG image in Chrome
    .IslandBlock__image::before {
      content: '';
      position: absolute;
      background-color: ${vars.theme_color_tertiary};
      top: 1px;
      right: 1px;
      bottom: 1px;
      left: 1px;
    }

    // TODO: Figure out what styles are needed for inlined <SVG/>s
    .IslandBlock__image > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .IslandBlock__image > svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
      width: auto;
    }
  }

  // ---------------------------------------------------------------------------

  @media ${mq.phone_phablet} {
    .IslandBlock {
      background-color: ${vars.color_suld_25};
      ${extendBackgroundWithUnderlay}
    }

    .IslandBlock--align--left > .IslandBlock__content:first-child,
    .IslandBlock--align--right > .IslandBlock__content:last-child,
    .IslandBlock--align--right > .IslandBlock__image {
      margin-right: ${offset};
    }
    .IslandBlock--align--right > .IslandBlock__content:first-child,
    .IslandBlock--align--left > .IslandBlock__content:last-child,
    .IslandBlock--align--left > .IslandBlock__image {
      margin-left: ${offset};
    }
    .IslandBlock__image {
      min-height: ${between_phone_phablet(210, 400)};
    }
    .IslandBlock__image > svg {
      width: 100%;
      height: auto;
    }
  }

  // ---------------------------------------------------------------------------

  @media ${mq.tablet_up} {
    .IslandBlock {
      flex-flow: row;
    }
    .IslandBlock--align--right {
      flex-flow: row-reverse;
    }

    .IslandBlock__content,
    .IslandBlock__image {
      box-sizing: content-box;
      // NOTE: ".01" part is to prevent rounding errors causing an ugly 1px gap between the columns
      width: ${cols_pct(5, 5.01)};
      margin-bottom: ${between_cols(50, 105)};
      min-height: ${between_tablet_netbook(280, 400)};

      @media ${mq.wide} {
        min-height: 400px;
      }
    }
    .IslandBlock__content:last-child,
    .IslandBlock__image {
      margin-top: ${between_cols(50, 105)};
      margin-bottom: 0;
    }
    .IslandBlock--align--left > .IslandBlock__content:first-child,
    .IslandBlock--align--right > .IslandBlock__content:last-child,
    .IslandBlock--align--right > .IslandBlock__image {
      margin-right: 0;
      padding-right: ${cols_pct(1, 0.5)};
    }
    .IslandBlock--align--right > .IslandBlock__content:first-child,
    .IslandBlock--align--left > .IslandBlock__content:last-child,
    .IslandBlock--align--left > .IslandBlock__image {
      margin-left: 0;
      padding-left: ${cols_pct(1, 0.5)};
    }
  }
`;
