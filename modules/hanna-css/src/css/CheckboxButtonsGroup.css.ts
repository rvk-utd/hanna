import { css } from 'es-in-css';

import { TogglerButtonsGroup } from './styles/forms.js';
import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('FormField', 'CheckboxButton')}
`;

// inlined by CheckboxButton.css.ts
export const CheckboxButtonsGroup_css = () => css`
  @media screen {
    ${TogglerButtonsGroup('CheckboxButtonsGroup')}
  }
`;
