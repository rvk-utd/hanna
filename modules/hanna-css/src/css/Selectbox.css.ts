import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';
import { formFieldVars as ff } from '../lib/otherTokens.js';

import { overflowEllipsis, prem } from './utils/miscUtils.js';

// inlined by FormField.css.ts
export const Selectbox_css = () => css`
  @media screen {
    .Selectbox {
    }

    .Selectbox > .FormField__input--disabled {
    }
    .Selectbox > .FormField__input--focused {
    }

    .Selectbox > .FormField__input::after {
      ${iconStyle(vars.icon__chevron_down)}
      position: absolute;
      top: 0;
      bottom: 0;
      right: ${prem(20)};
      pointer-events: none;
      margin: auto;
      color: ${ff.input__border_color};
      transition: all 200ms ease-in;
      font-size: ${prem(16)};
      height: 1em;
      line-height: 1em;
    }

    .Selectbox:not(.FormField--filled):not(.FormField--empty) > .FormField__input {
      color: ${ff.input__color_placeholder};
    }
    // select options are not necessarily visible on focus,
    // * leaving this arrow in reversed state with no visible dropdown
    /*
      .Selectbox > .FormField__input--focused::after {
        transform: rotate(180deg);
      }
    */

    .Selectbox > * > .FormField__input__value {
      ${overflowEllipsis}

      // white-space: nowrap;
      // overflow: hidden;
      display: block;
      margin-right: ${prem(50)};
    }

    .Selectbox > * > .FormField__input__value--empty {
    }
  }
`;

export default css`
  /*!@deps
    FormField
  */
`;
