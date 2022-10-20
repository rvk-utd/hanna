import { css } from 'es-in-css';

import { TogglerButtonsGroup, TogglerButtonsKnob } from './styles/forms';

export default css`
  /*!@deps
    FormField
    CheckboxButtonsGroup
  */
`;

// inlined by CheckboxButtonsGroup
export const RadioButtonsGroupStyling = () => css`
  @media screen {
    ${TogglerButtonsKnob('RadioButton')}
    ${TogglerButtonsGroup('RadioButtonsGroup')}
  }
`;
