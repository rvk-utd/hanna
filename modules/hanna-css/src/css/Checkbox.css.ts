import { css } from 'es-in-css';

import { TogglerKnob } from './styles/forms.js';
import { CheckboxGroup_css } from './CheckboxGroup.css.js';
import { RadioGroup_css } from './RadioGroup.css.js';

export default css`
  /*!@deps
    FormField
  */

  @media screen {
    ${TogglerKnob('Checkbox')}
  }

  // ===========================================================================
  // Inline for better compression and loading speed
  ${CheckboxGroup_css}
  ${RadioGroup_css}
`;
