import { css } from 'es-in-css';

import { TogglerGroup } from './styles/forms';

import { Checkbox_css } from './Checkbox.css';
import { RadioGroup_css } from './RadioGroup.css';

export default css`
  /*!@deps
    FormField
    Checkbox
  */
  ${Checkbox_css}
  @media screen {
    ${TogglerGroup('CheckboxGroup')}
  }
  // ===========================================================================
  // Inline for better compression and loading speed
  ${RadioGroup_css}
`;
