import { css, px } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';

import { ButtonStyle, ButtonVariables as b } from './styles/buttons.js';

export default css`
  /*!@deps
    Icon
    ButtonBar
  */

  .ButtonSecondary {
    ${ButtonStyle}
    ${b.override({
      // color: vars.color_faxafloi_100,
      color__active: vars.color_faxafloi_100,
      textColor: b.vars.color,
      textColor__active: b.vars.color__active,
      backgroundColor: vars.color_suld_0,
      backgroundColor__active: vars.color_suld_50,
      border: px(1),
    })}

    &:disabled,
    &[aria-disabled='true'] {
      // opacity: 0.5;
    }

    &--destructive {
      ${b.override({
        color: vars.color_heidmork_100,
        color__active: vars.color_heidmork_100,
      })}
    }
  }
`;
