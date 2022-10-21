import { css } from 'es-in-css';

import { sr_only_focusable_css } from '../css/utils/a11y';
import { mq } from '../lib/breakpoints';
import { isDevMode } from '../lib/cssutils';
import { grid, showColumnGridLines } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';

import { freezeScroll_css, LayoutHeaderLogo } from './styles/header';
import { LinkStyle_Reset } from './styles/links';
import { grid_units, prem } from './utils/miscUtils';
import { hideText_css } from './utils/scssutils/hideText';

const whiteLogo = () => css`
  --logo-fill-color: ${vars.color_suld_0};
  --logo-text-color: ${vars.color_suld_0};
  --logo-transition-delay: 0ms;
  --logo-background-color: ${vars.color_faxafloi_100};
  --link-focus-outlineColor: ${vars.color_suld_0};
`;

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
      min-height: 100vh;
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
    }
    .Layout__header > * {
      pointer-events: auto;
    }

    .Layout__header__logo {
      ${LayoutHeaderLogo}
    }

    .Layout__main {
      padding-top: ${prem(50)};
      flex-grow: 1;
      padding-bottom: ${prem(30)};
      min-height: 60vh;
    }

    .Layout__footer {
      position: relative;
      border-top: 1px solid ${vars.color_suld_75};
      padding-bottom: ${grid_units(4)};
    }
  }

  // ===========================================================================
  //  Mobile / Hamburger
  // ===========================================================================

  @media ${mq.Hamburger} {
    .Layout__header {
      --logo-transition: 200ms var(--logo-transition-delay, 100ms) ease-in;
      box-shadow: 0 0 0.33em 0.33em ${vars.Layout$$header_backgroundColor};

      transition: all 200ms ease-in;
      transition-property: background-color, box-shadow;
    }
    html.menu-is-open {
      ${freezeScroll_css({ fixHeader: true })}
    }
    html.menu-is-open .Layout__header {
      ${whiteLogo}
      transition-duration: 400ms;
      --Layout__header-backgroundColor: ${vars.color_faxafloi_100};
    }

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
    html.menu-is-open .Layout__header__skiplink {
      color: ${vars.color_suld_0};
      --open-icon-color: transparent;
      --close-icon-color: _inherit;
      // margin-right: $var--browser-scrollbar-width;
    }
    .Layout__header__skiplink:hover,
    .Layout__header__skiplink:active {
      text-shadow: 0 0 ${prem(8)} rgba(#000, 0.2);
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

    // Page content fadeout during menu open
    html.menu-is-active .Layout__nav::before {
      content: '';
      position: fixed;
      z-index: calc(${vars.zindex__header} - 1);
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background-color: ${vars.color_suld_0};
      opacity: 0;
      visibility: hidden;
      transition: (opacity 400ms 200ms ease-in-out, visibility 0ms (400ms + 200ms));
    }
    html.menu-is-open .Layout__nav::before {
      transition-delay: 0ms;
      opacity: 1;
      visibility: visible;
    }

    .Layout__nav__closebutton {
      // TODO: Why can't we call the function without empty object?
      ${sr_only_focusable_css({})}
    }
  }

  // ===========================================================================
  //  Desktop
  // ===========================================================================

  @media ${mq.Topmenu} {
    .Layout__header__skiplink {
      // TODO: Why can't we call the function without empty object?
      ${sr_only_focusable_css({})}
    }
    html[data-mega-panel-active] .Layout__header__logo {
      ${whiteLogo}
    }
  }

  // ===========================================================================
  // Grid helper
  // ===========================================================================

  // TODO: Check if right (getEnv('NODE_ENV') == '' in sass file)
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
