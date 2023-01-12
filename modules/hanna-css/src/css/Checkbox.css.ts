import { css } from 'es-in-css';

import { TogglerKnob } from './styles/forms';

import { CheckboxGroup_css } from './CheckboxGroup.css';
import { RadioGroup_css } from './RadioGroup.css';

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
