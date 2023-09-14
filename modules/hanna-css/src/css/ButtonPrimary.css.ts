import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';

import { ButtonStyle, ButtonVariables } from './styles/buttons.js';
import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('Icon', 'ButtonBar')}

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
