import { css } from 'es-in-css';

import { TogglerButtonsGroup, TogglerButtonsKnob } from './styles/forms';

import { RadioButtonsGroup_css } from './RadioButtonsGroup.css';

export default css`
  /*!@deps
    FormField
  */
  @media screen {
    ${TogglerButtonsKnob('CheckboxButton')}
    ${TogglerButtonsGroup('CheckboxButtonsGroup')}
  }

  // ===========================================================================
  // Inline for better compression and loading speed
  ${RadioButtonsGroup_css}
`;
