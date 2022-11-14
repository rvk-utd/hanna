import { css } from 'es-in-css';

import { TogglerGroup, TogglerKnob } from './styles/forms';

export default css`
  /*!@deps
    FormField
    CheckboxGroup
  */
`;

// inlined by CheckboxGroup.css.ts
export const RadioGroup_css = () => css`
  @media screen {
    ${TogglerKnob('Radio')}
    ${TogglerGroup('RadioGroup')}
  }
`;
