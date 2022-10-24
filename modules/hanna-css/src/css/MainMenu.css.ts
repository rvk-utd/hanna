import { color, css } from 'es-in-css';

import { between_Topmenu } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { colors } from '../lib/colors';
import { font } from '../lib/font';
import { cols_pct, grid } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';
import { WARNING__ } from '../lib/WARNING__';

import { freezeScroll_css } from './styles/header';
import { LinkStyle } from './styles/links';
import { sr_only_content_focusable, sr_only_focusable_css } from './utils/a11y';
import { extendSides } from './utils/extendSides';
import { grid_units, prem } from './utils/miscUtils';
import { AuxiliaryPanel_css } from './_AuxiliaryPanel';
import { PrimaryPanel_css } from './_PrimaryPanel';

const menu_speed = '400ms';

export default css`
  @keyframes MainMenu__mega__item--fadeup {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @media screen {
    .MainMenu {
    }
    .MainMenu__title {
      display: none; // ok if aria-label/aria-labelledby is used!
    }
    .MainMenu__item--home[class] {
      ${sr_only_content_focusable({})};
    }

    .MainMenu__link {
      ${LinkStyle}
      display: block;
      width: max-content;
      font-weight: ${vars.font_weight__bold};
    }

    .MainMenu__link::before {
      ${iconStyle('')}
      margin-right: ${prem(8)};
      vertical-align: ${prem(-3)};
    }
    .MainMenu__item--mypages > .MainMenu__link::before {
      content: ${vars.icon__user};
    }
    .MainMenu__item--search > .MainMenu__link::before {
      content: ${vars.icon__search};
    }
  }

  // ===========================================================================
  //
  // Mobile menu
  //
  // ===========================================================================

  @media ${mq.Hamburger} {
    html.before-sprinkling .MainMenu:not([data-sprinkled]) {
      display: none;
    }
    .MainMenu {
      position: relative;
      display: flex;
      flex-flow: column;

      background-color: ${vars.MainMenu_background};

      --MainMenu--offsetLeft: ${grid_units(4)};
      --MainMenu__list--padTop: ${grid_units(2)};

      @media screen and (max-width: 370px) {
        --MainMenu--offsetLeft: ${grid_units(2)};
      }
      // @include media('screen and (max-height: 640px)') {
      // 	--MainMenu__list--padTop: #{grid-units(2)};
      // }
    }

    html.menu-is-active .MainMenu {
      position: fixed;
      z-index: calc(${vars.zindex__header} - 1);
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      padding-left: ${vars.grid_margin};
      padding-right: ${vars.grid_margin__right};
      padding-top: ${vars.Layout$$header_height};
      overflow-x: hidden;
      overflow-y: scroll;

      transition: (
        margin-top ${menu_speed} 0ms ease-in-out,
        opacity ${menu_speed} 0ms,
        visibility 0ms ${menu_speed}
      );
    }

    html.menu-is-active:not(.menu-is-open) .MainMenu, // @deprecated (.menu-is-closed is always set now) Remove this selector in v0.9
	  html.menu-is-closed .MainMenu {
      visibility: hidden;
      opacity: 0;
      margin-top: -100vh;
    }
    html.menu-is-open {
      --Layout__header-backgroundColor: ${vars.color_faxafloi_100};
    }
    html.menu-is-open .MainMenu {
      transition-delay: 0ms;

      visibility: visible;
      opacity: 1;
      margin-top: 0;
    }

    .MainMenu__items {
      color: ${vars.color_suld_0};
      --link-color: _inherit;
      --link-color--hover: ${vars.color_suld_25};

      display: flex;
      flex-flow: row wrap;
      padding-top: var(--MainMenu__list--padTop);
      padding-bottom: ${grid_units(3)};

      margin-left: ${vars.grid_margin__neg};
      margin-right: ${vars.grid_margin__right__neg};
      padding-left: calc(${vars.grid_margin} + var(--MainMenu--offsetLeft));
      padding-right: ${vars.grid_margin__right};
    }

    .MainMenu__item {
      font: ${vars.font_bd_l};
      width: 100%;
      margin-bottom: ${grid_units(2)};
    }
    .MainMenu__link {
      margin-bottom: calc(-1 * ${vars.link_underline__thickness});
    }
    .MainMenu__link[aria-pressed='true'] {
      border-color: ${vars.color_suld_0};
    }

    .MainMenu__separator[class] {
      width: 100%; // because of flex
      height: ${grid_units(2)};
    }

    .MainMenu__separator ~ .MainMenu__item {
      font: ${vars.font_bd_s};
    }

    .MainMenu__item--lang {
      width: auto;
      padding-right: ${grid_units(2)};
    }
    .MainMenu__item--lang + .MainMenu__item--lang {
      padding-left: ${grid_units(2)};
    }
    .MainMenu__item--lang + .MainMenu__item--lang::before {
      content: '|';
      float: left;
      color: ${vars.color_faxafloi_75};
      margin-left: calc(${grid_units(-2)} - 0.2em);
    }

    .MainMenu__panels,
    .MainMenu__panelsWrap {
      flex-grow: 1;
      display: flex;
      flex-flow: column;
      position: relative;
    }

    [aria-current='true'] .MainMenu__mega__link::before {
      content: '';
      float: left;
      margin-left: ${prem(-24)};
      width: ${prem(8)};
      height: ${prem(2)};
      margin-top: ${prem(font.base_leading / 2 - 1)};
      background-color: currentColor;
    }

    .MainMenu__megapanel__backtomenu {
      ${sr_only_focusable_css({})}
    }
  }

  // ===========================================================================
  //
  // Desktop Menu
  //
  // ===========================================================================

  @media ${mq.Topmenu} {
    .MainMenu {
    }

    .MainMenu__items {
      --link-color: _inherit;
      --link-color--hover: ${vars.MainMenu_accentcolor};
      position: absolute;
      z-index: ${vars.zindex__header};
      top: 0;
      right: 0;
      left: ${cols_pct(3, 3)};
      height: ${vars.Layout$$header_height};
      margin-right: ${between_Topmenu(-8, -20)};
      margin-left: ${between_Topmenu(-14, -20)};
      display: flex;
      justify-content: flex-end;
      align-items: center;

      @media ${mq.wide} {
        margin-right: -20px;
        margin-left: -20px;
      }
    }

    .MainMenu__item {
      color: ${vars.color_suld_200};
      white-space: nowrap;
      margin: 0 ${between_Topmenu(4, 10)};
      --MainMenu__item-padding: ${between_Topmenu(4, 10)};

      @media ${mq.wide} {
        margin-right: 10px;
        margin-left: 10px;
        --MainMenu__item-padding: 10px;
      }
    }

    .MainMenu__item[aria-current='true'] {
      color: ${vars.color_faxafloi_100};

      html[data-mega-panel-active] & {
        color: ${vars.color_suld_0};
      }
    }

    .MainMenu__separator[class] {
      margin-left: auto;
    }

    .MainMenu__item:not(.MainMenu__separator ~ *) {
      --MainMenu__item-padding: ${prem(10)};
    }
    html.menu-is-open .MainMenu__item:not(.MainMenu__separator ~ *),
    html[data-mega-panel-active] .MainMenu__item:not(.MainMenu__separator ~ *) {
      --link-color--hover: ${vars.color_suld_0};
      color: ${color(colors.suld_25).fade(0.3)};
    }

    .MainMenu__link {
      padding: ${prem(10)} var(--MainMenu__item-padding);
      padding-bottom: calc(${prem(10)} - ${vars.link_underline__thickness});
    }
    .MainMenu__link[aria-pressed='true'] {
      color: ${vars.color_suld_0};
    }

    .MainMenu__item--lang {
      margin-right: ${prem(8)};
    }
    .MainMenu__item--lang > .MainMenu__link {
      padding-right: ${prem(8)};
      padding-left: ${prem(8)};
      display: inline-block;
    }
    .MainMenu__item--lang + .MainMenu__item--lang {
      margin-left: ${prem(-8)};
    }
    .MainMenu__item--lang + .MainMenu__item--lang::before {
      content: '|';
      display: inline-block;
      color: ${vars.color_suld_200};
    }

    // ===========================================================================
    //
    // Mega Menu
    //
    // ===========================================================================

    html[data-mega-panel-active] {
      ${freezeScroll_css({ immediate: true })}
    }

    html.before-sprinkling *:not([data-sprinkled]) > .MainMenu__panelsWrap {
      display: none;
    }

    .MainMenu__panelsWrap {
      background-color: ${vars.color_faxafloi_100};
      ${extendSides}
      position: relative;
    }
    .MainMenu__panelsWrap:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: calc(50% + 0.5 * (${vars.grid_gutter} + ${vars.browser_scrollbar_width}));
      margin-left: ${vars.grid_2_2};
      right: 0;
      background-color: ${vars.color_suld_25};

      @media ${mq.netbook} {
        margin-left: ${vars.grid_2};
      }
    }

    [data-sprinkled] > .MainMenu__panelsWrap {
      opacity: 0;
      visibility: hidden;

      transition: all 250ms ease-in-out;
      transition-property: opacity, visibility;

      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100vh;
      z-index: calc(${vars.zindex__header} - 1);

      overflow-x: hidden;
      overflow-y: auto;
    }
    [data-sprinkled] > .MainMenu__panelsWrap--active {
      opacity: 1;
      visibility: visible;
    }

    [data-sprinkled] > .MainMenu__panelsWrap:before {
      position: fixed;
    }

    .MainMenu__panels {
      position: relative;
      width: 100%;

      display: grid;
      column-gap: ${vars.grid_gutter};
      grid-template-columns: repeat(${grid.numCols}, minmax(0, 1fr));
    }

    // -------------------------------------

    .MainMenu__megapanel__backtomenu {
      position: fixed;
      bottom: 0;
      left: 0;
      width: ${prem(137)};
      height: ${prem(145)};

      color: ${vars.color_suld_200};

      padding-top: ${prem(65)};
      padding-left: ${prem(32)};
      padding-bottom: ${prem(33)};
      --link-focus-outlineColor: ${vars.color_suld_0};
    }
    .MainMenu__megapanel__backtomenu:hover::after,
    .MainMenu__megapanel__backtomenu:active::after {
      opacity: 1;
      transform: scale(1.2);
    }

    .MainMenu__megapanel__backtomenu::before {
      ${iconStyle(vars.icon__close)}
      font-size: ${prem(16)};
      width: 100%;
      text-align: left;
      margin-left: 8px;
    }

    .MainMenu__megapanel__backtomenu::after {
      content: '';
      transition: all 200ms ease-in-out;
      width: 269px;
      height: 269px;
      border-radius: 50%;
      background-color: ${vars.color_suld_0};
      position: absolute;
      top: 0;
      left: -132px;
      z-index: -1;
    }
  }

  // ===========================================================================
  //
  // Markup Warnings
  //
  // ===========================================================================

  @media screen {
    .MainMenu:not(nav) {
      ${WARNING__('Please use <nav/>')};
    }
    .MainMenu:not([aria-label]):not([aria-labelledby]) {
      ${WARNING__('Please add `aria-label` or `aria-labelledby`')};
    }
    .MainMenu[aria-labelledby] > .MainMenu__title:not([id]) {
      ${WARNING__('Please add `id` attribute')};
    }
    .MainMenu__separator:not(.MainMenu__items > *) {
      ${WARNING__('Separators must be child of ul.MainMenu__items')};
    }
    .MainMenu__list:first-child {
      ${WARNING__('`.MainMenu__title` missing')};
    }
    .MainMenu__item:first-child:not(.MainMenu__item--home) {
      ${WARNING__('Home link missing')};
    }
  }

  // ===========================================================================
  // Inline in order to not expose as standalone component styles
  ${PrimaryPanel_css}
  ${AuxiliaryPanel_css}
`;
