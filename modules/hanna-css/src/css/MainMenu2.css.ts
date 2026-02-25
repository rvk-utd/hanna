import { color, css } from 'es-in-css';

import { srOnly_focusableContent } from '../lib/a11y.js';
import { mq } from '../lib/breakpoints.js';
import { htmlCl } from '../lib/classNames.js';
import { buildVariables } from '../lib/cssutils.js';
import { grid, gridPx } from '../lib/grid.js';
import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars.js';
import { iconContent, iconStyle } from '../lib/icons.js';
import { LinkStyle_Reset } from '../lib/links.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { ButtonVariables } from './styles/buttons.js';
import { freezeScroll_css } from './styles/header.js';
import { DEPS, extendBackgroundWithUnderlay } from './utils/miscUtils.js';

import { enableDataIcon } from './Icon.css.js';
import { whiteLogo, whiteLogo_reset } from './Layout.css.js';

const globalCl = {
  menuIsOpen: '.menu-is-open',
  menuIsClosed: '.menu-is-closed',
};

const DesktopVariables = buildVariables(
  ['main__width', 'bgLeft', 'bgShadw', 'bgRight', 'bgHead'],
  'MainMenu2'
);
const dtVars = DesktopVariables.vars;

const Variables = buildVariables(
  ['padding_bottom', 'mainLink__paddingBottom'],
  'MainMenu2'
);
const mm2Vars = Variables.vars;

const mq_mobileMode = mq.phone_tablet;
const mq_desktopMode = mq.netbook_up;

const resetNonLinkChildrenLayout = () => css`
  & > * {
    margin: 0;
    /*
      Without this elements with "width: max-content;"
      AND, it seems, complex (calc-based) padding or min-wdith
      will cause Firefox (as of 117 at least) to expand the width of the
      outer .MainMenu__item container.  Chrome does not do this.
      Remove this once Firefox has got its act together
    */
    width: auto;
  }
`;

const semiTransparentBg = color('#ffffff').alpha(0.8);
const semiTransparentShadow = color('#e0e0e0').alpha(0.8);

// ---------------------------------------------------------------------------
// Common Styles
// ---------------------------------------------------------------------------

const commonStyles = css`
  ${DEPS('ButtonPrimary', 'ButtonSecondary', 'Icon')}

  ${globalCl.menuIsOpen} {
    ${freezeScroll_css({ fixHeader: true })}
  }

  ${htmlCl.beforeSprinkling} .MainMenu2:not([data-sprinkled]) {
    display: none;
  }

  .MainMenu2 {
    z-index: 1;
    ${Variables.declare({
      padding_bottom: vars.space_8,
      mainLink__paddingBottom: vars.space_2,
    })};
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw + ${vars.browser_scrollbar_width});
  }

  .MainMenu2[data-sprinkled] {
    position: absolute;
    z-index: calc(${vars.zindex__header} - 1);
    top: 0;
    left: 0;
    right: 0;
  }
  .MainMenu2--open[class] {
    position: fixed;
    margin-left: 0;
    margin-right: 0;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }
  .MainMenu2--open::before {
    /*
      This ::before sets up a same-background underlap for the layout
      logo/header so that the menu can be scrolled under it.
    */
    content: '';
    position: fixed;
    z-index: 1;
    top: 0;
    /* Avoid overlapping the scrollbars */
    left: 20px;
    right: 20px;
    left: 0;
    right: 0;
    overflow-y: scroll;
    scrollbar-color: transparent transparent;
    height: ${vars.Layout$$header_height};
    background: inherit;
    background-color: ${dtVars.bgHead.or('inherit')};
  }

  .MainMenu2--closed {
    pointer-events: none;
  }
  .MainMenu2__content > * {
    pointer-events: auto;
  }

  :not([data-sprinkled]) > .MainMenu2__content {
    padding-top: ${vars.space_3};
  }
  .MainMenu2__content {
    margin: auto;
    min-height: 100%;
    box-sizing: content-box;
    max-width: ${grid.contentMaxWidth};
    padding-left: ${vars.grid_margin};
    padding-right: ${vars.grid_margin__right};
  }
  [data-sprinkled] > .MainMenu2__content {
    position: relative;
  }

  .MainMenu2__title {
    display: none; // ok as long as aria-label/aria-labelledby is used!
  }

  .MainMenu2--closed > * > .MainMenu2__main,
  .MainMenu2--closed > * > .MainMenu2__extra__items,
  .MainMenu2--closed > * > .MainMenu2__related {
    display: none !important;
  }

  /* ---------------------- */

  .MainMenu2__toggler {
    grid-area: toggler;
    align-self: center;
    justify-self: flex-end;

    margin: 0;
    width: auto; // DO NOT REMVE!
  }
  .MainMenu2--variant--light .MainMenu2__toggler {
    ${ButtonVariables.override({
      color: vars.color_suld_200,
      color__active: vars.color_faxafloi_150,
    })}
  }
  .MainMenu2__toggler[aria-pressed='true'] {
    position: sticky;
    top: calc(0.5 * calc(${vars.Layout$$header_height} - ${ButtonVariables.vars.height}));
    z-index: 1;
    outline: 1px solid currentColor;
    ${ButtonVariables.override({
      backgroundColor__active: vars.color_faxafloi_100,
    })}
  }
  .MainMenu2--variant--light .MainMenu2__toggler[aria-pressed='true'] {
    ${ButtonVariables.override({
      backgroundColor__active: vars.color_suld_200,
    })}
  }
  .MainMenu2__toggler::before {
    ${iconStyle('menu')};
    margin-left: ${ButtonVariables.vars.iconOutdent};
    margin-right: ${ButtonVariables.vars.iconSpace};
  }
  .MainMenu2__toggler[aria-pressed='true']::before {
    ${iconContent('close')};
  }

  a.MainMenu2__toggler {
    position: absolute;
    z-index: ${vars.zindex__header};
    top: calc(0.5 * ${vars.Layout$$header_height});
    right: 0;
    transform: translateY(-50%);
  }

  /* ---------------------- */

  .MainMenu2__main {
    grid-area: main;
    color: ${vars.color_suld_0};
    ${hannaVarOverride({
      link_color: '_inherit',
      link_color__hover: vars.color_faxafloi_25,
    })}
  }
  .MainMenu2--variant--light .MainMenu2__main {
    color: ${vars.color_faxafloi_100};
    ${hannaVarOverride({
      link_color__hover: vars.color_faxafloi_150,
    })}
  }

  .MainMenu2__main__item {
    ${resetNonLinkChildrenLayout()}
    font: ${vars.font_heading_s};
    margin-bottom: ${vars.space_1};
  }
  .MainMenu2__main__item[aria-current='true'] {
  }
  .MainMenu2__main__item--home {
    ${srOnly_focusableContent()};
  }
  .MainMenu2__main__link[class] {
    ${LinkStyle_Reset()};
    display: inline-block;
    font-weight: ${vars.font_weight__bold};
    padding-top: ${vars.space_1};
    padding-bottom: calc(${mm2Vars.mainLink__paddingBottom} - 2px);
    border-bottom: 2px solid transparent;
  }

  .MainMenu2__main__link[aria-pressed='true'] {
    border-color: currentColor;
  }
  [aria-current='true'] > a.MainMenu2__main__link {
    border-color: currentColor;
  }

  .MainMenu2__main__sub__items {
    margin-top: ${vars.space_2};
    margin-left: ${vars.space_2};
    margin-bottom: ${vars.space_3};
  }

  .MainMenu2__main__sub__item {
    ${resetNonLinkChildrenLayout()};
    margin-bottom: ${vars.space_2};
  }
  .MainMenu2__main__sub__item[aria-current='true'] {
  }
  .MainMenu2__main__sub__link {
  }
  [aria-current='true'] > .MainMenu2__main__sub__link {
    border-color: currentColor;
  }
  .MainMenu2__main__sub__link__descr {
    display: none;
  }

  /* ---------------------- */

  .MainMenu2__hot__items {
    grid-area: hot;
  }
  .MainMenu2__hot__item {
    ${resetNonLinkChildrenLayout()}
  }
  .MainMenu2__hot__item[aria-current='true'] {
  }
  .MainMenu2__hot__item--login {
  }
  .MainMenu2__hot__link {
  }

  /* ---------------------- */

  .MainMenu2__extra__items {
    grid-area: extra;
  }
  .MainMenu2__extra__item {
    ${resetNonLinkChildrenLayout()}
  }
  .MainMenu2__extra__item[aria-current='true'] {
  }
  .MainMenu2__extra__item--messages {
  }
  .MainMenu2__extra__item--search {
  }
  .MainMenu2__extra__link {
  }

  /* ---------------------- */

  .MainMenu2__related {
    grid-area: related;
    color: ${vars.color_suld_200};
  }
  .MainMenu2__related__title {
    font: ${vars.font_heading_s};
    padding-top: ${vars.space_1};
    padding-bottom: calc(${mm2Vars.mainLink__paddingBottom} - 1px);
    border-bottom: 1px solid ${vars.color_suld_100};
    width: max-content;
    min-width: 10em;
  }
  .MainMenu2__related__items {
    padding-top: ${vars.space_3};
  }
  .MainMenu2__related__item {
    ${resetNonLinkChildrenLayout()};
    margin-bottom: ${vars.space_2};
  }
  .MainMenu2__related__item[aria-current='true'] {
  }
  .MainMenu2__related__link {
  }
  .MainMenu2__related__link[data-icon]::before {
    ${enableDataIcon('small')}
    margin-right: ${vars.space_1};
    margin-left: ${vars.space_0$5__neg};
  }
  /* Indent all __related__links at least one of them has an icon */
  :has(.MainMenu2__related__link[data-icon])
    > *
    > .MainMenu2__related__link:not([data-icon]) {
    padding-left: calc(${vars.icon_size__small} + ${vars.space_0$5});
  }
`;

// ===========================================================================
// Mobile mode
// ===========================================================================

const mobileStyles = css`
  @media ${mq_mobileMode} {
    ${globalCl.menuIsOpen} {
      ${whiteLogo()}
    }
    ${globalCl.menuIsOpen}:has(.MainMenu2--variant--light) {
      ${whiteLogo_reset()}
    }

    .MainMenu2 {
      ${Variables.override({
        mainLink__paddingBottom: vars.space_1,
      })};
      background: ${vars.color_faxafloi_100};
    }
    .MainMenu2--variant--light {
      background: ${vars.color_faxafloi_25};
    }
    .MainMenu2--closed {
      background: none;
    }

    .MainMenu2__content > * {
      padding-left: ${vars.space_3};
      padding-right: ${vars.space_3};
      @media (max-width: 350px) {
        padding-left: 0;
        padding-right: 0;
      }
    }

    .MainMenu2__content {
      display: grid;
      grid-template:
        '.       toggler' ${vars.Layout$$header_height}
        'main       main' auto
        'hot         hot' auto
        'extra     extra' auto
        'related related' 1fr
        'illstr   illstr' min(100vw, 300px)
        / ${vars.Layout$$header_homelink_width} auto;
    }

    .MainMenu2--closed > .MainMenu2__content {
      grid-template:
        '.    toggler' ${vars.Layout$$header_height}
        'hot      hot' auto
        / ${vars.Layout$$header_homelink_width} auto;
    }

    :not([data-sprinkled]) > .MainMenu2__content::after,
    .MainMenu2--open > .MainMenu2__content::after {
      content: '';
      grid-area: illstr;
      margin: 0 ${vars.grid_margin__neg};
      background: ${vars.color_suld_0} var(--menu-image, none) 50% calc(100% - 10px) /
        auto 90% no-repeat;
    }

    /* ---------------------- */

    .MainMenu2__toggler {
      overflow: hidden;
      width: 0;
      padding-left: 0;
      padding-right: 0;
      min-width: ${vars.space_5};
    }
    .MainMenu2--open > * > .MainMenu2__toggler {
      ${ButtonVariables.override({
        backgroundColor: vars.color_suld_0,
        backgroundColor__active: vars.color_suld_50,
        textColor: vars.color_faxafloi_100,
        textColor__active: vars.color_faxafloi_150,
      })};
    }
    .MainMenu2__toggler[class]::before {
      width: 100%;
      margin-left: 0;
      margin-right: 1px;
    }

    .MainMenu2__toggler[aria-pressed='true'] {
      ${ButtonVariables.override({
        color: vars.color_suld_0,
        border: '1px',
      })}
    }
    .MainMenu2--open > * > * > .MainMenu2__hot__item--redhot .ButtonSecondary {
      ${ButtonVariables.override({
        backgroundColor: vars.color_faxafloi_100,
        backgroundColor__active: vars.color_faxafloi_150,
        color: vars.color_suld_0,
        color__active: vars.color_suld_50,
      })};
    }

    /* ---------------------- */

    .MainMenu2__main {
      margin-top: ${vars.space_2};
      margin-bottom: ${vars.space_1};
    }

    /* ---------------------- */

    .MainMenu2__hot__items,
    .MainMenu2__extra__items {
      display: flex;
      flex-flow: row wrap;
      gap: ${vars.space_2};
      align-items: center;
      padding-top: ${vars.space_4};
      background-color: ${vars.color_suld_0};
      ${extendBackgroundWithUnderlay()}
    }
    .MainMenu2__hot__items + .MainMenu2__extra__items {
      padding-top: ${vars.space_2};
    }

    .MainMenu2__hot__items:last-child,
    .MainMenu2__extra__items:last-child {
      padding-bottom: ${vars.space_6};
    }

    .MainMenu2--closed > * > .MainMenu2__hot__items {
      padding: 0;
      background: none;
    }

    // Move "--redhot" item out of flow and fix its position
    // next to the toggler button
    .MainMenu2--closed
      > *
      > *
      > .MainMenu2__hot__item:not(.MainMenu2__hot__item--redhot) {
      display: none !important;
    }
    [data-sprinkled] > * > * > .MainMenu2__hot__item--redhot {
      position: fixed;
      z-index: 1;
      top: calc(${vars.Layout$$header_height} / 2);
      right: ${vars.grid_margin__right};
      margin-right: ${vars.space_7};
      transform: translateY(-50%);
    }
    .MainMenu2--open > * > * > .MainMenu2__hot__item--redhot {
      right: ${vars.grid_margin};
    }
    .MainMenu2__hot__item--redhot ~ .MainMenu2__hot__item--redhot {
      position: static;
      ${WARNING__('Only one `--redhot` item is allowed per menu')}
    }

    .MainMenu2__hot__item--redhot .ButtonSecondary[data-icon] {
      overflow: hidden;
      width: 0;
      padding-left: 0;
      padding-right: 0;
      min-width: ${vars.space_5};
    }
    .MainMenu2__hot__item--redhot .ButtonSecondary[data-icon]::before {
      width: 100%;
      margin-left: 0;
      margin-right: 1px;
    }

    /* ---------------------- */

    .MainMenu2__related {
      position: relative;
      background-color: ${vars.color_suld_0};
      padding-top: ${vars.space_6};
      /* padding-bottom: ${vars.space_4}; */
      padding-bottom: ${vars.space_2};
      ${extendBackgroundWithUnderlay()}
    }
    .MainMenu2__related:not(:first-child):not(button + *) {
      padding-top: ${vars.space_4};
    }

    .MainMenu2__related__title {
    }
  }
`;

// ===========================================================================
// Desktop mode
// ===========================================================================

const desktopStyles = css`
  @media ${mq_desktopMode} {
    ${globalCl.menuIsOpen} {
      ${whiteLogo()}
    }
    ${globalCl.menuIsOpen}[class]:has(.MainMenu2--variant--light),
    ${globalCl.menuIsOpen}[class]:not(:has(.MainMenu2__related)),
    ${globalCl.menuIsOpen}[class]:not(:has(.MainMenu2__main)) {
      ${whiteLogo_reset()}
    }

    .MainMenu2 {
      // font: ${vars.font_body_l};
      ${DesktopVariables.declare({
        // main__width: `calc(50% + ${vars.grid_1_1})`,
        // main__width: `calc(50% + ${clamp_netbook(gridPx(0, 1), gridPx(1, 1))})`,
        main__width: `calc(50% + ${vars.grid_6} - ${gridPx(5, 4)})`,
        bgLeft: vars.color_faxafloi_100,
        bgShadw: dtVars.bgLeft,
        bgRight: vars.color_suld_0,
        bgHead: vars.color_suld_0,
      })};
    }
    .MainMenu2--variant--light {
      ${DesktopVariables.override({
        bgLeft: vars.color_faxafloi_25,
      })};
    }

    .MainMenu2:not([data-sprinkled]),
    .MainMenu2--open {
      background-image: linear-gradient(
        90deg,
        ${dtVars.bgLeft} calc(${dtVars.main__width} - ${vars.space_4}),
        ${dtVars.bgShadw} ${dtVars.main__width},
        ${dtVars.bgRight} 0%
      );
    }
    .MainMenu2:not(:has(.MainMenu2__related)) {
      ${DesktopVariables.override({
        bgLeft: semiTransparentBg,
        bgShadw: semiTransparentShadow,
        bgRight: vars.color_faxafloi_100,
      })};
    }
    .MainMenu2--variant--light:not(:has(.MainMenu2__related)) {
      ${DesktopVariables.override({
        bgRight: vars.color_faxafloi_25,
      })};
    }
    .MainMenu2:not(:has(.MainMenu2__main)) {
      ${DesktopVariables.override({
        bgLeft: semiTransparentBg,
        bgShadw: semiTransparentShadow,
      })};
    }

    .MainMenu2__content {
      display: grid;
      grid-template:
        '.     hot      hot  toggler' ${vars.Layout$$header_height}
        'main  .    related  related' auto
        'main  .    extra      extra' auto
        '.     .    .              .' 1fr
        / ${dtVars.main__width} ${vars.grid_1} 1fr auto;
    }
    .MainMenu2__content:not(:has(.MainMenu2__related):has(.MainMenu2__main)) {
      grid-template:
        '.  hot  hot      toggler' ${vars.Layout$$header_height}
        '.  .    main        main' auto
        '.  .    related  related' auto
        '.  .    extra      extra' auto
        '.  .    .              .' 1fr
        / ${dtVars.main__width} ${vars.grid_1} 1fr auto;
    }

    .MainMenu2--open .MainMenu2__content:has(.MainMenu2__related)::after {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      left: 50%;
      width: 50vw;
      height: 100%;
      background: var(--menu-image, none) ${vars.grid_3} 95% no-repeat;
    }

    /* ---------------------- */

    .MainMenu2__toggler {
    }

    /* ---------------------- */

    .MainMenu2__main {
      margin-bottom: ${vars.space_6};
    }

    /* ---------------------- */

    :not([data-sprinkled]) > * > .MainMenu2__hot__items {
      position: static;
      margin-bottom: ${vars.space_2};
    }
    .MainMenu2__hot__items {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-end;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1;
    }
    .MainMenu2--closed > * > .MainMenu2__hot__items {
      display: flex !important;
    }
    .MainMenu2__hot__item {
      margin-right: ${vars.space_2};
    }
    .MainMenu2--variant--light .MainMenu2__hot__items .ButtonSecondary {
      ${ButtonVariables.override({
        color: vars.color_suld_200,
        color__active: vars.color_faxafloi_150,
      })}
    }

    /* ---------------------- */

    .MainMenu2__extra__items {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
    }

    .MainMenu2__extra__items,
    :not(.MainMenu2__extra__items) + .MainMenu2__related {
      padding-bottom: 235px;
      margin-bottom: ${vars.space_2};
    }
    .MainMenu2__extra__item {
      margin-right: ${vars.space_2};
    }

    /* ---------------------- */

    .MainMenu2__related {
      margin-bottom: ${vars.space_4};
    }
    .MainMenu2__related__link {
      background-color: ${vars.color_suld_0};
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Dev warnings                                                             */
  /* ------------------------------------------------------------------------ */

  .MainMenu2:not([aria-label]) {
    ${WARNING__('aria-label="" is missing')};
  }
  .MainMenu {
    ${WARNING__('`MainMenu` can not be used when `MainMenu2.css` is loaded')}
  }
`;

export default commonStyles + mobileStyles + desktopStyles;
