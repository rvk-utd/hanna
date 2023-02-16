import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';

export default css`
  /*!@deps
    Tagpill
    TextInput
    Checkbox
  */

  .MultiselectDownshift {
  }

  .MultiselectDownshift_inputcontainer {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid ${vars.color_suld_100};
    border-radius: 4px;
  }

  .MultiselectDownshift_input {
    flex: 1;
    padding: 5px;
    border: none;
  }

  .MultiselectDownshift_input:focus-visible {
    outline: none;
  }

  .MultiselectDownshift_inputButton {
    display: flex;
    align-items: center;
    align-self: stretch;
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 0 0.5rem;
  }

  .MultiselectDownshift__options {
    border: 1px solid ${vars.color_suld_100};
    margin-top: var(--space-1);
    border-radius: 4px;
  }

  .MultiselectDownshift__options--hidden {
    display: none;
  }

  .MultiselectDownshift__option {
    padding: var(--space-1);
  }

  .MultiselectDownshift__option .Checkbox {
    margin-bottom: 0;
  }

  .MultiselectDownshift__option .Checkbox__label {
    width: 100%;
  }

  .MultiselectDownshift__option--selected {
    background-color: ${vars.color_suld_50};
  }

  /* ------------------- custom --------------------- */
  .MultiSelect__header {
    display: flex;
    position: relative;
  }

  .MultiSelect__textInput {
    flex: 1;
    margin: 0;
  }

  .MultiSelect__button {
    display: flex;
    border-left: 1px solid ${vars.color_suld_100};
    align-items: center;
    align-self: stretch;
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 0 0.5rem;
    position: absolute;
    right: 0;
    top: 37%;
  }
`;
