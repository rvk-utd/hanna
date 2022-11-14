import { css } from 'es-in-css';

import { TogglerKnob } from './styles/forms';
import { grid_units } from './utils/miscUtils';

export default css`
  /*!@deps
    CheckboxGroup
  */
`;

// inlined by CheckboxGroup.css.ts
export const Checkbox_css = () => css`
  @media screen {
    ${TogglerKnob('Checkbox')}

    .Checkbox:not(.FormField__options__item) {
      margin-bottom: ${grid_units(3)};
    }
    .Checkbox__label__reqstar {
      border-bottom: none;
      float: left;
      margin-right: 0.15em;
    }
  }
`;
