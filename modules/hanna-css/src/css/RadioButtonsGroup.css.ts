import { css } from 'es-in-css';

import { TogglerButtonsGroup, TogglerButtonsKnob } from './styles/forms.js';
import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('FormField', 'CheckboxButton')}
`;

// inlined by CheckboxButton.css.ts
export const RadioButtonsGroup_css = () => css`
  @media screen {
    ${TogglerButtonsKnob('RadioButton')};
    ${TogglerButtonsGroup('RadioButtonsGroup', 'RadioButton')};
  }
`;
