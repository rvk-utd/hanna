import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';

import {
  ButtonTertiaryStyle,
  ButtonTertiaryStyle__backArrow,
  ButtonTertiaryStyle__disabled,
  ButtonTertiaryVariables,
} from './styles/buttons';

export default css`
  @media screen {
    .ButtonBack {
      ${ButtonTertiaryVariables.override({
        ButtonTertiary__color: vars.color_faxafloi_100,
        ButtonTertiary__dashColor: vars.color_faxafloi_100,
        ButtonTertiary__dashWidth: vars.space_1$5,
        ButtonTertiary__hover__dashWidth: vars.space_3,
        ButtonTertiary__dashSpace: vars.space_1$5,
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
