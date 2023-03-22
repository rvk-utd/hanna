import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';

import { FormFieldVariables } from './styles/forms';
import { prem } from './utils/miscUtils';

const ff = FormFieldVariables.vars;

export default css`
  /*!@deps
    Heading
    Tagpill
    TextInput
    Checkbox
  */

  #react-select-2-listbox {
    z-index: 999;
  }

  .MultiSelect__inputbutton {
    overflow: hidden;
  }

  .MultiSelect__container {
    position: absolute;
    top: 54px;
    left: 0;
    max-height: 380px;
    overflow-y: auto;
    background: white;
    box-shadow: 0px 60px 120px rgba(0, 0, 0, 0.08), 0px 30px 60px rgba(0, 0, 0, 0.08);
    border: 1px solid ${vars.color_suld_100};
    border-top: none;
    border-radius: 0 0 4px 4px;
    z-index: 99;
    scroll-padding: 50px 0;
  }

  .MultiSelect__currentvalues {
    position: sticky;
    top: 0;
    left: 0;
    padding: 8px 16px 0 16px;
    background-color: white;
    z-index: 100;
  }

  .MultiSelect__seperator {
    margin: 5px 0;
  }

  .MultiSelect__currentvalues .TagPill {
    margin-bottom: 0;
  }

  .MultiSelect__options {
    // overflow: hidden;
    // max-height: 380px;
  }

  .MultiSelect__option {
    padding: 8px 16px;
  }

  .MultiSelect__option.Checkbox {
    margin: 0;
  }

  .MultiSelect__option:hover {
    // background-color: ${vars.color_suld_50};
  }

  .MultiSelect__option .Checkbox__label {
    width: 100%;
  }

  .MultiSelect__option--focus {
    background-color: ${vars.color_suld_50};
  }

  /* TODO: Refactor with Selectbox */
  .MultiSelect > .FormField__input::after {
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

  .MultiSelect.FormField--focused > .FormField__input::after {
    transform: rotateX(180deg);
    transition: all 200ms ease-in;
  }
`;
