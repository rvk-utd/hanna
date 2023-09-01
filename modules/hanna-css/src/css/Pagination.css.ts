import { css, rem } from 'es-in-css';

import { mq } from '../lib/breakpoints.js';
import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';

import { ButtonStyle, ButtonVariables } from './styles/buttons.js';
import { LinkStyle_Reset } from './styles/links.js';
import { hideText_css } from './utils/hideText.js';
import { prem } from './utils/miscUtils.js';

const _colorWhite = vars.color_white;
const _colorBlack = vars.color_blackish;

export default css`
  .Pagination {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    column-gap: ${vars.space_1};
    row-gap: ${vars.space_1};

    font-weight: ${vars.font_weight__bold};
    text-align: center;
    margin: ${vars.space_2} 0;

    @media ${mq.phone} {
      column-gap: ${vars.space_0$5};
      margin-left: ${vars.space_1$5__neg};
      margin-right: ${vars.grid_margin__right__neg};
    }
  }
  .Pagination__button {
    ${LinkStyle_Reset('noborder')};
    ${hannaVarOverride({
      link_focus_outlineColor: vars.link_color__hover,
    })}
    min-width: ${vars.space_4};
    padding: 0 ${vars.space_0$5};
    height: ${vars.space_4};
    line-height: ${vars.space_4};
    border-radius: ${prem(3)};
    transition: all ${vars.link_transition};
  }

  @media ${mq.phone} {
    // hide the last __button before a second __ellipsis
    .Pagination__button:nth-last-child(3):nth-last-of-type(2),
    // and the first __button after the first __ellipsis
    .Pagination__ellipsis + .Pagination__button:not(:last-child) {
      display: none;
    }
  }

  .Pagination__button:disabled {
    opacity: 0.25;
    pointer-events: none;
  }

  .Pagination__button:hover,
  .Pagination__button:active {
    background-color: ${vars.color_suld_50};
  }

  .Pagination__button--active[class] {
    background-color: ${vars.color_faxafloi_100};
    color: ${vars.color_white};
  }

  .Pagination__ellipsis {
    margin: 0 ${vars.space_0$5__neg};
    width: ${vars.space_2};
    font-size: ${vars.font_label_size};
    line-height: 1em;
    position: relative;
    top: -0.25em;
    color: ${vars.color_suld_100};
  }

  .Pagination__button--next,
  .Pagination__button--prev {
    ${hideText_css('soft')};
    width: 1px;
    padding: 0;
  }
  .Pagination__button--next {
    order: 1;
  }
  .Pagination__button--next::before,
  .Pagination__button--prev::before {
    ${iconStyle(vars.icon__chevron_left)};
    font-size: ${rem(12 / 16)}; /* 12px */
    width: 100%;
    margin-right: 1px;
  }
  .Pagination__button--next::before {
    content: ${vars.icon__chevron_right};
  }

  /* ======================================================================== */

  .PaginationOld {
    display: flex;
    align-items: center;
    list-style: none;
    grid-gap: 5px;
  }
  .PaginationOld__button {
    ${ButtonStyle};
    ${ButtonVariables.override({
      backgroundColor: _colorWhite,
      textColor: _colorBlack,
      height: vars.space_4,
    })}
    padding: 0 15px;
    min-width: auto;
    margin: 0;
  }
  .PaginationOld__button:not([disabled], .PaginationOld__button--active):hover {
    background-color: ${vars.color_suld_50};
    box-shadow: none;
  }
  .PaginationOld__button:disabled:active {
    background-color: ${_colorWhite};
    color: ${_colorBlack};
  }
  .PaginationOld__button--active {
    background-color: ${vars.color_faxafloi_100};
    color: ${_colorWhite};
  }
  .PaginationOld__button--active:focus-visible,
  .PaginationOld__button--active:hover {
    color: ${_colorWhite};
  }
  .PaginationOld__button--back {
    &::before {
      ${iconStyle(vars.icon__chevron_left)}
      font-size: 12px;
    }
  }
  .PaginationOld__button--forward {
    &::before {
      ${iconStyle(vars.icon__chevron_right)}
      font-size: 12px;
    }
  }
`;
