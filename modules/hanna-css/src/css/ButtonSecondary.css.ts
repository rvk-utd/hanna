import { css, px } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';

import { ButtonStyle, ButtonVariables as b } from './styles/buttons';

export default css`
  /*!@deps
    Icon
    ButtonBar
  */

  .ButtonSecondary {
    ${ButtonStyle}
    ${b.override({
      // Button__color: vars.color_faxafloi_100,
      Button__color__active: vars.color_faxafloi_100,
      Button__textColor: b.vars.Button__color,
      Button__textColor__active: b.vars.Button__color__active,
      Button__backgroundColor: vars.color_suld_0,
      Button__backgroundColor__active: vars.color_suld_50,
      Button__border: px(1),
    })}

    &[disabled],
    &[aria-disabled='true'] {
      // opacity: 0.5;
    }

    &--destructive {
      ${b.override({
        Button__color: vars.color_heidmork_100,
        Button__color__active: vars.color_heidmork_100,
      })}
    }
  }
`;
