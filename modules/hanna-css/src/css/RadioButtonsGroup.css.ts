import { css } from 'es-in-css';

import { TogglerButtonsGroup, TogglerButtonsKnob } from './styles/forms';

export default css`
  /*!@deps
    FormField
    CheckboxButton
  */
`;

// inlined by CheckboxButton.css.ts
export const RadioButtonsGroup_css = () => css`
  @media screen {
    ${TogglerButtonsKnob('RadioButton')};
    ${TogglerButtonsGroup('RadioButtonsGroup')};
  }
`;
