import { css } from 'es-in-css';

import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';
import { LinkStyle_Reset } from '../lib/links.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { DEPS, overflowEllipsis, prem } from './utils/miscUtils.js';

import { enableDataIcon } from './Icon.css.js';

const openAnimation = 'ContextMenu-open';

export default css`
  ${DEPS('ButtonPrimary', 'ButtonSecondary')}

  @keyframes ${openAnimation} {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .ContextMenu {
    display: inline-block;
    position: relative;
    margin-right: ${vars.Button__gapH};
    margin-bottom: ${vars.Button__gapV};
  }

  /* ------------------------------------------------------------------------ */

  /* Doubles also as 'ButtonSecondary' or 'ButtonPrimary' by default */
  .ContextMenu__toggler {
    margin: 0;
    min-width: 0;
    width: auto; /* needed by Firefox (as of 2024-11) Some conflicts between .Button* styles applying a min-width and width:max-content  */
  }
  summary:where(.ContextMenu__toggler) {
    list-style: none; /* reset default disclosure triangle */
    cursor: pointer;
    display: inline-block;
    width: auto;
  }
  ${['a', 'button']
    .map(
      (tag) => css`
        .ContextMenu__toggler ${tag} {
          ${WARNING__(`<${tag}/> is not allowed inside <summary/>`)}
        }
      `
    )
    .join('\n')}

  /* ------------------------------------------------------------------------ */

  .ContextMenu__menu {
    position: absolute;
    top: var(--ContextMenu-pos-y);
    left: var(--ContextMenu-pos-x);
    z-index: ${vars.zindex__overlay};
    margin: ${vars.space_0$5} 0;

    max-width: min(${prem(480)}, 90vw);
    width: max-content;
    min-width: ${prem(200)};

    background: ${vars.color_white};
    box-shadow: ${vars.boxShadow_elevated};
    border-radius: ${vars.space_0$5};

    font: ${vars.font_button};
  }
  [open] > .ContextMenu__menu {
    animation: ${openAnimation} 150ms ease-in;
  }

  /* ------------------------------------------------------------------------ */

  .ContextMenu__item {
    ${hannaVarOverride({
      link_focus_outlineColor: vars.color_faxafloi_100,
      link_focus_outlineOffset: 0,
    })}
  }
  .ContextMenu__item[aria-current='true']:has(> .ContextMenu__itembutton--destructive) {
    ${WARNING__('Destructive and current do not mix')}
  }

  /* ------------------------------------------------------------------------ */

  .ContextMenu__itemDivider {
    /* border-top: 1px solid ${vars.color_suld_50}; */
    border-top: ${vars.border_default};
    margin: 0 ${vars.space_2};
    height: 0;
  }
  .ContextMenu__itemDivider--labelled {
    height: auto;
    padding: ${vars.space_1} 0;
    color: ${vars.color_suld_100};
  }
  :has(.ContextMenu__itembutton[data-icon]) > * > .ContextMenu__itemDivider--labelled {
    ${overflowEllipsis()}
    padding-left: ${vars.space_1 /* (icon_size--medium +  2) */};
  }
  .ContextMenu__itemDivider--labelled:first-child {
    border-top: none;
  }
  .ContextMenu__itemDivider:first-child:not(.ContextMenu__itemDivider--labelled) {
    ${WARNING__('First item __itemDivider makes no sense')}
  }
  .ContextMenu__itemDivider:last-child {
    ${WARNING__('Last item __itemDivider makes no sense')}
  }

  /* ------------------------------------------------------------------------ */

  .ContextMenu__itembutton {
    ${LinkStyle_Reset('no-hover')};
    font-weight: ${vars.font_weight__normal};
    ${overflowEllipsis()}
    position: relative;
  }
  .ContextMenu__itembutton[class] {
    display: block;
    width: 100%;
    padding: ${vars.space_2};
    border: none;
  }
  :first-child > .ContextMenu__itembutton {
    border-radius: ${vars.space_0$5} ${vars.space_0$5} 0 0;
  }
  /** FIXME: .FocusTrap is the :last-child, must handle that... */
  :last-child > .ContextMenu__itembutton {
    border-radius: 0 0 ${vars.space_0$5} ${vars.space_0$5};
  }

  .ContextMenu__itembutton:hover,
  .ContextMenu__itembutton:focus {
    background-color: ${vars.color_esja_25};
    z-index: 1;
  }

  .ContextMenu__itembutton--destructive {
    ${hannaVarOverride({
      link_color: vars.color_heidmork_100,
    })}
  }
  .ContextMenu__itembutton--destructive:hover,
  .ContextMenu__itembutton--destructive:focus {
    background-color: ${vars.color_heidmork_25};
  }

  [aria-current='true'] > .ContextMenu__itembutton {
    ${hannaVarOverride({
      link_color: vars.color_faxafloi_150,
    })}

    padding-right: ${vars.space_6 /* (padding-right + icon_size__medium + 1) */};
    background: ${vars.color_esja_50};
  }
  [aria-current='true'] > .ContextMenu__itembutton:hover,
  [aria-current='true'] > .ContextMenu__itembutton:focus {
    background-color: ${vars.color_esja_75};
  }

  [aria-current='true'] > .ContextMenu__itembutton::after {
    ${iconStyle('check')};
    color: ${vars.color_suld_200};
    position: absolute;
    right: ${vars.space_2};
    top: ${vars.space_2};
  }

  /* Indent all buttons if at least one of them has an icon */
  :has(.ContextMenu__itembutton[data-icon]) > * > .ContextMenu__itembutton {
    padding-left: ${vars.space_7 /* (padding-left + icon_size--medium +  2) */};
  }
  .ContextMenu__itembutton[data-icon]::before {
    ${enableDataIcon}
    margin-left: ${vars.space_5__neg};
    margin-right: ${vars.space_2};
  }
`;
