import { css } from 'es-in-css';

import { TogglerGroup, TogglerKnob } from './styles/forms.js';
import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('FormField', 'Checkbox')}
`;

// inlined by Checkbox.css.ts
export const RadioGroup_css = () => css`
  @media screen {
    ${TogglerKnob('Radio')}
    ${TogglerGroup('RadioGroup')}
  }
`;
