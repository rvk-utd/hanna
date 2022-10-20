import { css } from 'es-in-css';

import { TogglerButtonsGroup, TogglerButtonsKnob } from './styles/forms';

export default css`
  /*!@deps
    FormField
    CheckboxButtonsGroup
  */
`;

export const RadioGroup_css = () => css`
  @media screen {
    ${TogglerButtonsKnob('RadioButton')}
    ${TogglerButtonsGroup('RadioButtonsGroup')}
  }
`;
