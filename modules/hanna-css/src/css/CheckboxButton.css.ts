import { css } from 'es-in-css';

import { TogglerButtonsKnob } from './styles/forms';

import { CheckboxButtonsGroup_css } from './CheckboxButtonsGroup.css';
import { RadioButtonsGroup_css } from './RadioButtonsGroup.css';

export default css`
  /*!@deps
    FormField
  */

  @media screen {
    ${TogglerButtonsKnob('CheckboxButton')}
  }

  // ===========================================================================
  // Inline for better compression and loading speed
  ${CheckboxButtonsGroup_css}
  ${RadioButtonsGroup_css}
`;
