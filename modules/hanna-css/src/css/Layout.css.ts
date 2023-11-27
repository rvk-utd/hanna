import { css } from 'es-in-css';

import { srOnly_focusable } from '../lib/a11y.js';
import { mq } from '../lib/breakpoints.js';
import { isDevMode } from '../lib/cssutils.js';
import { grid } from '../lib/grid.js';
import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';

import { LayoutHeaderHomeLink } from './styles/header.js';
import { LinkStyle_Reset } from './styles/links.js';
import { hideText_css } from './utils/hideText.js';
import { grid_units, prem, showColumnGridLines } from './utils/miscUtils.js';
import { MobileMenuTogglerGlobalClasses } from './MobileMenuToggler.css.js';

const { mobileMenuIsOpen } = MobileMenuTogglerGlobalClasses;

export const whiteLogo = () =>
  hannaVarOverride({
    Layout$$header_logo_color: vars.color_suld_0,
    Layout$$header_homelink_divColor: vars.color_faxafloi_75,
    Layout$$header_color: vars.color_suld_0,
  });
export const whiteHeader = () =>
  whiteLogo() +
  hannaVarOverride({
    Layout$$header_backgroundColor: vars.color_faxafloi_100,
  });

export default css`
  @media screen {
    body {
      padding-left: ${vars.grid_margin};
      padding-right: ${vars.grid_margin__right};
    }

    .Layout {
      min-height: 100vh;
      width: 100%;
      max-width: ${prem(grid.contentMaxWidth)};
      margin: 0 auto;
      position: relative;
      display: flex;
      flex-flow: column;
    }

    .Layout__alerts {
      max-height: 1000px;
      overflow: hidden;
      margin: 0 ${prem(-15)};
      transition: max-height 400ms ease-in;

      @media ${mq.tablet_up} {
        margin: 0;
      }
    }
    .Layout__alerts .Alert {
      margin: ${grid_units(2)} 0 0 0;
    }

    .Layout__content {
      flex-grow: 1;
      display: flex;
      flex-flow: column nowrap;
      padding-top: ${vars.Layout$$header_height};
      position: relative;
    }

    .Layout__header {
      position: absolute;
      z-index: ${vars.zindex__header};
      top: 0;
      left: ${vars.grid_margin__neg};
      right: ${vars.grid_margin__right__neg};
      padding-left: ${vars.grid_margin};
      padding-right: ${vars.grid_margin__right};
      margin: 0 auto;
      max-width: ${grid.contentMaxWidth__outer};

      display: flex;
      justify-content: space-between;
      align-items: center;
      height: ${vars.Layout$$header_height};
      background-color: ${vars.Layout$$header_backgroundColor};
      pointer-events: none;
      color: ${vars.Layout$$header_color};

      --logo-fill-color: ${vars.Layout$$header_logo_color};
      --logo-text-color: ${vars.Layout$$header_color};
      --logo-background-color: ${vars.Layout$$header_backgroundColor};
      --logo-transition: 200ms var(--logo-transition-delay, 100ms) ease-in;
      /* --logo-transition-delay: 0ms; */
      ${hannaVarOverride({
        link_focus_outline: vars.Layout$$header_color,
      })}

      ${LayoutHeaderHomeLink()};
    }
    .Layout__header > * {
      pointer-events: auto;
    }

    .Layout__header__navlink {
      ${srOnly_focusable()}
    }

    .Layout__main {
      padding-top: ${vars.Layout$$main_paddingTop};
      flex-grow: 1;
      padding-bottom: ${vars.space_4};
      min-height: 60vh;
    }

    .Layout__nav {
    }

    .Layout__footer {
      position: relative;
      border-top: 1px solid ${vars.color_suld_75};
      padding-bottom: ${grid_units(4)};
    }
  }

  // ===========================================================================
  //  Mobile / Hamburger

  @media ${mq.phone_tablet} {
    .Layout__header {
      box-shadow: 0 0 0.33em 0.33em ${vars.Layout$$header_backgroundColor};

      transition: all 200ms ease-in;
      transition-property: background-color, box-shadow;
    }
  }

  // ===========================================================================
  // Deprecated  (Will be removed in v0.9) */
  // ===========================================================================

  // Mobile / Hamburger
  @media ${mq.phone_tablet} {
    /** @deprecated  (Will be removed in v0.9) */
    .Layout__header__skiplink[class] {
      ${hideText_css('soft')}
      ${LinkStyle_Reset(true)}
      position: relative;
      color: ${vars.color_faxafloi_100};
      width: ${grid_units(6)};
      height: ${grid_units(6)};
      line-height: ${grid_units(6)};
      margin-right: ${grid_units(-1)};
      transition-duration: 200ms;
      --open-icon-color: _inherit;
      --close-icon-color: transparent;
    }
    ${mobileMenuIsOpen} .Layout__header__skiplink {
      color: ${vars.color_suld_0};
      --open-icon-color: transparent;
      --close-icon-color: _inherit;
      // margin-right: ${vars.browser_scrollbar_width};
    }
    .Layout__header__skiplink:hover,
    .Layout__header__skiplink:active {
      text-shadow: 0 0 ${prem(8)} rgba(0, 0, 0, 0.2);
    }

    .Layout__header__skiplink::before,
    .Layout__header__skiplink::after {
      ${iconStyle('')}
      width: 100%;
      margin-right: 1px;
      transition: inherit;
    }

    .Layout__header__skiplink::before {
      content: ${vars.icon__menu};
      font-size: ${prem(34)};
      color: var(--open-icon-color);
    }
    .Layout__header__skiplink::after {
      position: absolute;
      top: 0;
      left: 0;
      content: ${vars.icon__close};
      font-size: ${prem(26)};
      color: var(--close-icon-color);
    }

    /** @deprecated  (Will be removed in v0.9) */
    .Layout__nav__closebutton {
      ${srOnly_focusable()}
    }
  }

  /* Desktop / Topmenu */
  @media ${mq.netbook_up} {
    /** @deprecated  (Will be removed in v0.9) */
    .Layout__header__skiplink {
      ${srOnly_focusable()}
    }
  }

  // ===========================================================================
  // Grid helper
  // ===========================================================================

  ${isDevMode &&
  css`
    html[data-grid-overlay] body:hover {
      --show-grid-lines: '';
    }
    html[data-grid-overlay] .Layout:hover {
      /**/ //
      --show-grid-lines: initial;
      /**/
    }
    html[data-grid-overlay] .Layout::after {
      content: var(--show-grid-lines, none);
      pointer-events: none;
      position: absolute;
      z-index: calc(${vars.zindex__modal} + 100);
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      ${showColumnGridLines}
    }
  `}
`;
