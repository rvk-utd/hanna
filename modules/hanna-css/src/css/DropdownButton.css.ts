import { css } from 'es-in-css';

import { buildVariables } from '../lib/cssutils.js';
import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars.js';
import { LinkStyle } from '../lib/links.js';

import { DEPS, prem } from './utils/miscUtils.js';

import { enableDataIcon } from './Icon.css.js';

const openAnimation = 'DropdownButton-open';

const db = buildVariables(['DropdownButton__padH']);

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

  .DropdownButton {
    display: inline-block;
    position: relative;
    margin-right: ${vars.Button__gapH};
    margin-bottom: ${vars.Button__gapV};
  }

  /* ------------------------------------------------------------------------ */

  /* Doubles also as 'ButtonSecondary' or 'ButtonPrimary' */
  .DropdownButton__toggler {
    margin: 0;
    min-width: 0;
    width: auto; /* needed by Firefox (as of 2024-11) Some conflicts between .Button* styles applying a min-width and width:max-content  */
  }

  /* ------------------------------------------------------------------------ */

  .DropdownButton__menu {
    position: absolute;
    top: var(--DropdownButton-pos-y);
    left: var(--DropdownButton-pos-x);
    z-index: ${vars.zindex__overlay};
    margin: ${vars.space_0$5} 0;

    max-width: min(${prem(500)}, 90vw);
    width: max-content;

    background: ${vars.color_white};
    box-shadow: ${vars.boxShadow_elevated};
    border: 1px solid ${vars.color_suld_100};
    border-radius: ${vars.space_0$5};
  }
  [open] > .DropdownButton__menu {
    animation: ${openAnimation} 200ms ease-in;
  }

  /* ------------------------------------------------------------------------ */

  .DropdownButton__item {
  }
  .DropdownButton__item:not(:last-child) {
    border-bottom: ${vars.border_default};
  }

  /* ------------------------------------------------------------------------ */

  .DropdownButton__itembutton {
    ${LinkStyle()};
  }
  .DropdownButton__itembutton[class] {
    display: block;
    width: 100%;
    ${db.declare({ DropdownButton__padH: vars.space_2 })};
    padding: ${vars.space_1} ${db.vars.DropdownButton__padH};
    border: none;
    border-radius: calc(${vars.space_0$5} - 1px);
  }
  .DropdownButton__itembutton:hover,
  .DropdownButton__itembutton:focus {
    background-color: ${vars.color_suld_50};
  }

  [aria-current='true'] > .DropdownButton__itembutton {
    ${hannaVarOverride({
      link_color: vars.color_faxafloi_150,
    })}
    background: ${vars.color_faxafloi_25};
  }

  .DropdownButton__itembutton[data-icon]::before {
    ${enableDataIcon}
    margin-right: ${vars.space_1};
  }
  /* Indent all __related__links at least one of them has an icon */
  :has(.DropdownButton__itembutton[data-icon])
    > *
    > .DropdownButton__itembutton:not([data-icon]) {
    padding-left: calc(${db.vars.DropdownButton__padH} + ${vars.space_3});
  }
`;
