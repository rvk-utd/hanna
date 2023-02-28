import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';

import { FormFieldVariables } from './styles/forms';
import { prem } from './utils/miscUtils';

const ff = FormFieldVariables.vars;

export default css`
  /*!@deps
    Heading
    VSpacer
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

  .Multiselect {
    position: relative;
  }

  .Multiselect__input {
    position: relative;
  }

  // Todo: Refactor with Selectbox.css.ts
  .Multiselect__input::after {
    ${iconStyle(vars.icon__chevron_down)}
    position: absolute;
    top: 0;
    bottom: 0;
    right: ${prem(20)};
    pointer-events: none;
    margin: auto;
    color: ${ff.input__border_color};
    transition: all 200ms ease-in;
    font-size: ${prem(16)};
    height: 1em;
    line-height: 1em;
  }

  .Multiselect__options {
    border: 1px solid ${vars.color_suld_100};
    border-top: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin-top: var(--space-1);
    border-radius: 4px;
    position: absolute;
    top: 48px;
    left: 0;
    width: 100%;
    background: white;
    max-height: 380px;
    overflow-y: scroll;
    overflow-x: hidden;
    box-shadow: 0px 60px 120px rgba(0, 0, 0, 0.08), 0px 30px 60px rgba(0, 0, 0, 0.08);
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

  .Multiselect__hr {
    border-bottom: 1px solid red;
    padding: var(--space-1);
  }

  .Multiselect__option {
    padding: var(--space-1);
  }

  .Multiselect__option:hover {
    background-color: ${vars.color_suld_50};
  }
`;
