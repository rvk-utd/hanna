import { css } from 'es-in-css';

import { TogglerGroup } from './styles/forms.js';
import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('FormField', 'Checkbox')}
`;

// inlined by Checkbox.css.ts
export const CheckboxGroup_css = () => css`
  @media screen {
    ${TogglerGroup('CheckboxGroup')}
  }
`;
