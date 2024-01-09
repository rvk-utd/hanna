import {
  buildVariables,
  css,
  hannaVarOverride,
  hannaVars as vars,
  hoverKeyboardFocusAndActiveStyling,
  htmlCl,
  mq,
  srOnly_focusableContent,
  vw_f,
  WARNING__,
} from '@reykjavik/hanna-css';

import { clamp_netbook } from '../lib/between.js';
import { grid } from '../lib/grid.js';

import { ButtonVariables } from './styles/buttons.js';
import { freezeScroll_css } from './styles/header.js';
import { LinkStyle_Reset } from './styles/links.js';
import { cols_px, DEPS, extendBackgroundWithUnderlay, prem } from './utils/miscUtils.js';

import { whiteLogo } from './Layout.css.js';

const globalCl = {
  menuIsOpen: '.menu-is-open',
  menuIsClosed: '.menu-is-closed',
};

const DesktopVariables = buildVariables(['main__width'], 'MainMenu2');
const dtVars = DesktopVariables.vars;

const Variables = buildVariables(
  ['padding_bottom', 'mainLink__paddingBottom'],
  'MainMenu2'
);
const mm2Vars = Variables.vars;

const mq_mobileMode = mq.phone_tablet;
const mq_desktopMode = mq.netbook_up;

const largeFont = () => css`
  font-size: ${prem(20)};
  line-height: ${prem(32)};
`;

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

// --------------------------------0-------------------------------------------

export default css`
  ${DEPS('ButtonPrimary', 'ButtonSecondary')}

  ${globalCl.menuIsOpen} {
    ${freezeScroll_css({ fixHeader: true })}
    ${whiteLogo()}
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
  }
  .MainMenu2--open::before {
    content: '';
    position: fixed;
    z-index: 1;
    top: 0;
    /* Avoid overlapping the scrollbars */
    left: 20px;
    right: 20px;
    height: ${vars.Layout$$header_height};
    background: inherit;
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

  .MainMenu2--closed > * > .MainMenu2__hot__items,
  .MainMenu2--closed > * > .MainMenu2__main,
  .MainMenu2--closed > * > .MainMenu2__extra__items,
  .MainMenu2--closed > * > .MainMenu2__related {
    display: none !important;
  }

  .MainMenu2__toggler {
    grid-area: toggler;
    align-self: center;
    justify-self: flex-end;

    margin: 0;
    width: auto; // DO NOT REMVE!
  }
  .MainMenu2__toggler[aria-pressed='true'] {
    position: sticky;
    top: calc(0.5 * calc(${vars.Layout$$header_height} - ${ButtonVariables.vars.height}));
    z-index: 1;
    ${ButtonVariables.override({
      backgroundColor__active: vars.color_faxafloi_100,
    })}
  }
  a.MainMenu2__toggler {
    position: absolute;
    z-index: ${vars.zindex__header};
    top: calc(0.5 * ${vars.Layout$$header_height});
    right: 0;
    transform: translateY(-50%);
  }

  .MainMenu2__main {
    grid-area: main;
    color: ${vars.color_suld_0};
    ${hannaVarOverride({
      link_color: '_inherit',
      link_color__hover: vars.color_faxafloi_25,
    })}
  }

  .MainMenu2__main__item {
    ${resetNonLinkChildrenLayout()}
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
  }

  .MainMenu2__main__sub__item {
    ${resetNonLinkChildrenLayout()};
  }
  .MainMenu2__main__sub__item[aria-current='true'] {
  }
  .MainMenu2__main__sub__link {
  }
  [aria-current='true'] > .MainMenu2__main__sub__link {
    border-color: currentColor;
  }
  .MainMenu2__main__sub__link__descr {
  }

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

  .MainMenu2__related {
    grid-area: related;
    color: ${vars.color_suld_200};
  }

  .MainMenu2__related__title {
    font-weight: ${vars.font_weight__bold};
    padding-top: ${vars.space_1};
    padding-bottom: calc(${mm2Vars.mainLink__paddingBottom} - 1px);
    /* color: ${vars.color_faxafloi_100};
    border-bottom: 1px solid ${vars.color_faxafloi_75}; */
    color: ${vars.color_suld_150};
    border-bottom: 1px solid ${vars.color_suld_100};
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

  /*

   ==========================================================================
    Mobile mode
   ==========================================================================
  */

  @media ${mq_mobileMode} {
    .MainMenu2 {
      ${Variables.override({
        mainLink__paddingBottom: vars.space_1,
      })};
      background: ${vars.color_faxafloi_100};
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
        'illstr   illstr' clamp(175px, ${vw_f(115 / 325)}, 250px)
        / ${vars.Layout$$header_homelink_width} auto;
    }

    :not([data-sprinkled]) > .MainMenu2__content::after,
    .MainMenu2--open > .MainMenu2__content::after {
      content: '';
      grid-area: illstr;
      margin: 0 ${vars.grid_margin__neg};
      background: ${vars.color_suld_0} url('/assets/valmundur-a-sundi.png')
        calc(40% - 10px) 100% / auto 90% repeat-x;
      /* mix-blend-mode: multiply; */
    }

    .MainMenu2__toggler {
      overflow: hidden;
      width: 0;
      padding-left: 0;
      padding-right: 0;
      min-width: ${vars.space_8};
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
    .MainMenu2 .ButtonSecondary {
      ${ButtonVariables.override({
        backgroundColor: vars.color_faxafloi_100,
        backgroundColor__active: vars.color_faxafloi_150,
        color: vars.color_suld_0,
        color__active: vars.color_suld_50,
      })}
    }

    .MainMenu2__main {
      padding-top: ${vars.space_2};
      margin-bottom: ${vars.space_3};
    }

    .MainMenu2__main__item {
      ${largeFont()};
      margin-bottom: ${vars.space_1};
    }
    .MainMenu2__main__link {
      ${hoverKeyboardFocusAndActiveStyling(css`
        color: ${vars.color_suld_0};
        border-color: currentColor;
      `)}
    }

    .MainMenu2__main__sub__items {
      margin-top: ${vars.space_2};
      margin-left: ${vars.space_2};
      margin-bottom: ${vars.space_1};
    }
    .MainMenu2__main__sub__item {
      margin-bottom: ${vars.space_2};
    }
    .MainMenu2__main__sub__link {
    }
    .MainMenu2__main__sub__link__descr {
      display: none;
    }

    .MainMenu2__hot__items,
    .MainMenu2__extra__items {
      display: flex;
      flex-flow: row wrap;
      gap: ${vars.space_2};
      align-items: center;
      margin-bottom: ${vars.space_2};
    }

    .MainMenu2__related {
      position: relative;
      z-index: 1;
      margin-top: ${vars.space_4};
      background-color: ${vars.color_suld_0};
      padding-top: ${vars.space_6};
      padding-bottom: ${vars.space_4};
      ${extendBackgroundWithUnderlay()}
    }
    .MainMenu2__related__title {
      ${largeFont()};
    }
  }

  /*

   ==========================================================================
    Desktop mode
   ==========================================================================
  */

  @media ${mq_desktopMode} {
    .MainMenu2 {
      ${DesktopVariables.declare({
        // main__width: `calc(50% + ${vars.grid_1_1})`,
        main__width: `calc(50% + ${clamp_netbook(cols_px(0, 1), cols_px(1, 1))})`,
      })};
    }
    .MainMenu2__content {
      display: grid;
      grid-template:
        '.     . hot    ' ${vars.space_10}
        'main  . related' auto
        'main  . extra  ' 1fr
        / ${dtVars.main__width} ${vars.grid_1} auto;
    }
    [data-sprinkled] > .MainMenu2__content {
      grid-template:
        '.     hot      hot  toggler' ${vars.Layout$$header_height}
        'main  .    related  related' auto
        'main  .    extra      extra' 1fr
        / ${dtVars.main__width} ${vars.grid_1} 1fr auto;
    }

    .MainMenu2:not([data-sprinkled]),
    .MainMenu2--open {
      background: ${vars.color_suld_0};
      background-image: linear-gradient(
        90deg,
        ${vars.color_faxafloi_100} ${dtVars.main__width},
        transparent 0%
      );
    }

    .MainMenu2--open .MainMenu2__content::after {
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      left: 50%;
      width: 50vw;
      height: 100%;
      background: var(--menu-image, none) ${vars.grid_3} 95% no-repeat;
    }

    .MainMenu2__toggler {
    }

    .MainMenu2__main {
      position: relative;
      margin-right: ${vars.grid_1};
      padding-bottom: ${mm2Vars.padding_bottom};
    }
    [data-sprinkled] > * > .MainMenu2__main {
      display: flex;
      flex-flow: row wrap;
      align-content: flex-start;
    }
    :not([data-sprinkled]) > * > * > .MainMenu2__main__item {
      border-bottom: 1px solid ${vars.color_faxafloi_75};
    }
    :not([data-sprinkled]) > * > * > * > a.MainMenu2__main__link {
      color: inherit;
    }
    .MainMenu2__main__link {
      color: ${vars.color_faxafloi_75};
      /* margin-right: ${vars.grid_0_1}; */
      margin-right: ${clamp_netbook(16, 40)};
    }
    .MainMenu2__main--noneActive > * > .MainMenu2__main__link {
      color: inherit;
    }

    .MainMenu2__main__link:not(strong) {
      ${hoverKeyboardFocusAndActiveStyling(css`
        color: inherit;
        border-color: currentColor;
      `)}
    }
    .MainMenu2__main__link[aria-pressed='true'] {
      color: ${vars.color_suld_0};
    }

    .MainMenu2__main__sub__items {
      width: 100%;
      margin-top: -1px;
      margin-bottom: ${vars.space_4};
      border-top: 1px solid ${vars.color_faxafloi_75};
      padding-top: ${vars.space_3};
      order: 2;
      transition: all 500ms ease-in-out;
      transition-property: visibility, opacity;

      @media ${mq.wide} {
        column-count: 2;
        column-gap: ${clamp_netbook(16, 32)};
        /* display: grid;
        grid-template-columns: repeat(2, 1fr); */
      }
    }

    .MainMenu2__main__sub__items[hidden] {
      order: 1;
      position: absolute;
      top: calc(${vars.font_base_leading} + ${vars.space_3});
      display: block;
      pointer-events: none;
      visibility: hidden;
      opacity: 0;
    }
    .MainMenu2__main__sub__item {
      margin-bottom: ${vars.space_4};

      @media ${mq.wide} {
        min-height: ${prem(2 * 24 + 32)};
        break-inside: avoid;
      }
    }

    .MainMenu2__main__sub__link {
      ${largeFont()};
    }
    .MainMenu2__main__sub__link__descr {
      display: block;
      font: ${vars.font_base};
      font-weight: ${vars.font_weight__normal};
    }

    :not([data-sprinkled]) > * > .MainMenu2__hot__items {
      justify-content: flex-start;
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

    .MainMenu2__extra__items,
    :not(.MainMenu2__extra__items) + .MainMenu2__related {
      padding-bottom: 235px;
      margin-bottom: ${vars.space_2};
    }

    .MainMenu2__extra__item {
      margin-bottom: ${vars.space_2};
    }

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
`;
