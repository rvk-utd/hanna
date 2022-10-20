import { css } from 'es-in-css';

import { TogglerButtonsGroup, TogglerButtonsKnob } from './styles/forms';

import { RadioButtonsGroupStyling } from './RadioButtonsGroup.css';

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
  ${RadioButtonsGroupStyling}
`;
