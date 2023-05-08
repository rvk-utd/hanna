import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';

import {
  ButtonTertiaryStyle,
  ButtonTertiaryStyle__backArrow,
  ButtonTertiaryStyle__disabled,
  ButtonTertiaryVariables,
} from './styles/buttons.js';

export default css`
  @media screen {
    .ButtonBack {
      ${ButtonTertiaryVariables.override({
        color: vars.color_faxafloi_100,
        dashColor: vars.color_faxafloi_100,
        dashWidth: vars.space_1$5,
        hover__dashWidth: vars.space_3,
        dashSpace: vars.space_1$5,
      })}

      ${ButtonTertiaryStyle};
      ${ButtonTertiaryStyle__disabled};
      font-size: ${vars.font_label_size};
    }

    .ButtonBack::before {
      ${ButtonTertiaryStyle__backArrow}
      margin-right: ${vars.space_1};
      margin-bottom: 0;
    }
  }
`;
