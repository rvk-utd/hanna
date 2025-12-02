import { css, px } from 'es-in-css';

import { srOnly_focusable } from '../lib/a11y.js';
import { mq } from '../lib/breakpoints.js';
import { grid } from '../lib/grid.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';
import { LinkStyle_Reset } from '../lib/links.js';

import { freezeScroll_css } from './styles/header.js';
import { hideText_css } from './utils/hideText.js';
import { grid_units, prem } from './utils/miscUtils.js';

export const MobileMenuTogglerGlobalClasses = {
  mobileMenuIsActive: '.menu-is-active',
  mobileMenuIsOpen: '.menu-is-open',
  mobileMenuIsClosed: '.menu-is-closed',
};

const { mobileMenuIsActive, mobileMenuIsOpen } = MobileMenuTogglerGlobalClasses;

const bSize = grid_units(6);

export default /*#__PURE__*/ css`
  /* ------------------------------------------------------------------------ */
  // Mobile / Hamburger

  @media ${mq.phone_tablet} {
    .MobileMenuToggler[class] {
      ${LinkStyle_Reset(true)}
      ${hideText_css('soft')}
      position: absolute;
      top: calc(0.5 * ${vars.Layout$$header_height});
      right: 0;
      z-index: ${vars.zindex__header};
      width: ${bSize};
      height: ${bSize};
      transform: translateY(-50%);
      line-height: ${bSize};
      margin-right: ${grid_units(-1)};
      transition-property: opacity;
      transition-duration: 500ms;
      --open-icon-opacity: 1;
      --close-icon-opacity: 0;
    }
    ${mobileMenuIsOpen} .MobileMenuToggler {
      position: fixed;
      right: max(calc(50vw - ${px(grid.contentMaxWidth / 2)}), ${vars.grid_margin});
      --open-icon-opacity: 0;
      --close-icon-opacity: 1;
      // margin-right: ${vars.browser_scrollbar_width};
    }
    .MobileMenuToggler:hover,
    .MobileMenuToggler:active {
      text-shadow: 0 0 ${prem(8)} rgba(0, 0, 0, 0.2);
    }

    .MobileMenuToggler::before,
    .MobileMenuToggler::after {
      ${iconStyle()}
      width: 100%;
      margin-right: 1px;
      transition: inherit;
    }

    .MobileMenuToggler::before {
      content: ${vars.icon__menu};
      color: ${vars.color_faxafloi_100};
      font-size: ${prem(34)};
      opacity: var(--open-icon-opacity);
    }
    .MobileMenuToggler::after {
      content: ${vars.icon__close};
      position: absolute;
      top: 0;
      left: 0;
      color: ${vars.color_suld_0};
      font-size: ${prem(26)};
      opacity: var(--close-icon-opacity);
    }

    ${mobileMenuIsOpen} {
      ${freezeScroll_css({ fixHeader: true })}
    }
    ${mobileMenuIsOpen} .Layout__header {
      transition-duration: 400ms;
    }
    // Page content fadeout during menu open
    ${mobileMenuIsActive} .Layout__nav::before {
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
      transition: opacity 400ms 200ms ease-in-out, visibility 0ms 600ms;
    }
    ${mobileMenuIsOpen} .Layout__nav::before {
      transition-delay: 0ms;
      opacity: 1;
      visibility: visible;
    }

    .MobileMenuToggler__closebutton {
      ${srOnly_focusable()}
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Desktop / Topmenu */

  @media ${mq.netbook_up} {
    .MobileMenuToggler {
      ${srOnly_focusable()}
    }
  }
`;
