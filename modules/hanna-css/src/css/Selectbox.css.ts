import { css } from 'es-in-css';

import { hannaVars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';

import { InputField__placeholder } from './styles/forms';
import { overflowEllipsis, prem } from './utils/miscUtils';

// inlined by FormField
export const Selectbox_css = () => css`
  @media screen {
    .Selectbox {
    }

    .Selectbox > .FormField__input--disabled {
    }
    .Selectbox > .FormField__input--focused {
    }

    .Selectbox > .FormField__input::after {
      ${iconStyle(hannaVars.icon__chevron_down)}
      position: absolute;
      top: 0;
      bottom: 0;
      right: ${prem(20)};
      pointer-events: none;
      margin: auto;
      color: var(--input-border-color);
      transition: all 200ms ease-in;
      font-size: ${prem(16)};
      height: 1em;
      line-height: 1em;
    }

    .Selectbox:not(.FormField--filled):not(.FormField--empty) > .FormField__input {
      ${InputField__placeholder}
    }
    // select options are not necessarily visible on focus,
    // * leaving this arrow in reversed state with no visible dropdown
    /*.Selectbox > .FormField__input--focused::after {
			transform: rotate(180deg);
		}*/

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
