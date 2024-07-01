import { css } from 'es-in-css';

import { TogglerGroup } from './styles/forms.js';
import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('FormField', 'Radio', 'Checkbox')}
`;

// inlined by Checkbox.css.ts
export const RadioGroup_css = () => css`
  @media screen {
    ${TogglerGroup('RadioGroup', 'Radio')}
  }
`;
