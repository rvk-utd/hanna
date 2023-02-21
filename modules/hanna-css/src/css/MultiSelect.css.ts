import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';

import { prem } from './utils/miscUtils';

export default css`
  /*!@deps
    Heading
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

  .Multiselect__inputcontainer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    grid-gap: 0.5rem;
    border: ${prem(1)} solid ${vars.color_suld_100};
    border-radius: 4px;
  }

  .Multiselect__inputcontainer .TagPill {
    margin: 0;
  }

  .Multiselect__input {
    display: flex;
    flex: 1 1 auto;
    position: relative;
  }

  .Multiselect__textInput {
    flex: 1;
    margin: 0;
  }

  .Multiselect__textInput input {
    border: none;
  }

  .Multiselect__textInput .FormField__input:hover,
  .Multiselect__textInput .FormField__input:focus {
    box-shadow: none;
  }

  .Multiselect__button {
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

  .Multiselect__button svg path {
    fill: ${vars.color_suld_150};
  }

  .Multiselect__options {
    border: 1px solid ${vars.color_suld_100};
    margin-top: var(--space-1);
    border-radius: 4px;
  }

  .Multiselect__options--hidden {
    display: none;
  }

  .Multiselect__options .Checkbox {
    margin: 0;
  }

  .Multiselect__options .Checkbox__label {
    width: 100%;
  }

  .Multiselect__option {
    padding: var(--space-1);
  }

  .Multiselect__option:hover {
    background-color: ${vars.color_suld_50};
  }
`;
