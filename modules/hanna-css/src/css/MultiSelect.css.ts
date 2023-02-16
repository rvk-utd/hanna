import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';

export default css`
  /*!@deps
    Tagpill
    TextInput
    Checkbox
  */

  .Multiselect {
  }

  .Multiselect__inputcontainer {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid ${vars.color_suld_100};
    border-radius: 4px;
  }

  .Multiselect_input {
    flex: 1;
    padding: 5px;
    border: none;
  }

  .Multiselect_input:focus-visible {
    outline: none;
  }

  .Multiselect_inputButton {
    display: flex;
    align-items: center;
    align-self: stretch;
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 0 0.5rem;
  }

  .Multiselect__options {
    border: 1px solid ${vars.color_suld_100};
    box-shadow: 0 0 0 2px ${vars.color_suld_100};
    margin-top: var(--space-1);
    border-radius: 4px;
  }

  .Multiselect__options--hidden {
    display: none;
  }

  .Multiselect__option {
    padding: var(--space-1);
  }

  .Multiselect__option .Checkbox {
    margin-bottom: 0;
  }

  .Multiselect__option .Checkbox__label {
    width: 100%;
  }

  .Multiselect__option--selected {
    background-color: ${vars.color_suld_50};
  }
`;
