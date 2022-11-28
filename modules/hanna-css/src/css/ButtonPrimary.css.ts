import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';

import { ButtonStyle, ButtonVariables } from './styles/buttons';

export default css`
  /*!@deps
    Icon
    ButtonBar
  */

  .ButtonPrimary {
    ${ButtonStyle};

    &--destructive {
      ${ButtonVariables.override({
        color: vars.color_heidmork_100,
        color__active: vars.color_heidmork_150,
      })}
    }
  }
`;
