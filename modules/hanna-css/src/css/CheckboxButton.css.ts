import { css } from 'es-in-css';

import { TogglerButtonsKnob } from './styles/forms.js';
import { DEPS } from './utils/miscUtils.js';
import { CheckboxButtonsGroup_css } from './CheckboxButtonsGroup.css.js';
import { RadioButtonsGroup_css } from './RadioButtonsGroup.css.js';

export default css`
  ${DEPS('FormField')}

  @media screen {
    ${TogglerButtonsKnob('CheckboxButton')}
  }

  // ===========================================================================
  // Inline for better compression and loading speed
  ${CheckboxButtonsGroup_css}
  ${RadioButtonsGroup_css}
`;
