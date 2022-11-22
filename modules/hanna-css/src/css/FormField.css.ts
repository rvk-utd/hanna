import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';

import { FormField__error } from './styles/forms';
import { sr_only } from './utils/a11y';
import { grid_units, overflowEllipsis, prem } from './utils/miscUtils';

import { Selectbox_css } from './Selectbox.css';
import { TextInput_css } from './TextInput.css';

export const InputField_paddingTop = 12;

export default css`
  @media screen {
    .FormField {
      --input-border-color: ${vars.color_suld_100};
      --input-border-radius: ${prem(3)};
      --input-border-inner-radius: ${prem(2)};
      --input-height: ${prem(56)};
      --input-height-inner: calc(var(--input-height) - 2px);
      --input-padding-top: ${prem(InputField_paddingTop)};
      --input-padding-bottom: 0px;
      --input-font-size: ${vars.font_bd_l_size};
      --input-color: ${vars.color_suld_200};
      --input-color-placeholder: ${vars.color_suld_150};
      --input-line-height: calc(
        var(--input-height-inner) - var(--input-padding-top) - var(--input-padding-bottom)
      );
      --input-paddingH: ${vars.space_2};

      display: flex;
      flex-flow: column;
      position: relative;
      margin-bottom: ${grid_units(3)};
    }

    .FormField--nolabel {
      --input-padding-top: ${prem(InputField_paddingTop / 2)};
      --input-padding-bottom: ${prem(InputField_paddingTop / 2)};
    }

    .FormField--small {
      --input-font-size: ${vars.font_bd_s_size};
      --input-height: ${prem(40)};
      --input-padding-top: 0px;
      --input-padding-bottom: 0px;
    }

    .FormField--filled {
      --input-border-color: ${vars.color_faxafloi_100};
    }

    .FormField__label {
      position: relative;
      z-index: 1;
      font-weight: ${vars.font_weight__bold};
      margin-bottom: ${prem(10)};
      align-self: flex-start;
    }
    .FormField--disabled > .FormField__label {
      opacity: 0.5;
    }

    label.FormField__label {
      color: ${vars.color_suld_150};
      font-size: ${vars.font_label_size};
      font-weight: ${vars.font_weight__normal};
      line-height: ${prem(14)};
      transition: all 200ms ease-in;
    }
    :not(.FormField--small) > label.FormField__label {
      position: absolute;
      top: 1px;
      left: ${grid_units(2)};
      line-height: ${prem(24)};
      pointer-events: none;
      max-width: calc(100% - ${grid_units(3)});
      ${overflowEllipsis}
    }
    .FormField--empty:not(.FormField--small):not(.FormField--focused)
      > label.FormField__label {
      font-size: ${vars.font_bd_s_size};
      line-height: var(--input-height-inner);
    }

    .FormField--nolabel > .FormField__label {
      ${sr_only}
    }

    .FormField__label__reqstar {
      border-bottom: none;
      float: left;
      margin-right: 0.15em;
    }

    // ---------------------------------------------------------------------------

    .FormField__input {
      font-size: ${vars.font_bd_l_size};
      position: relative;
      display: flex;
      width: 100%;
      background-color: ${vars.color_suld_0};
      color: var(--input-color);
      border: ${prem(1)} solid var(--input-border-color);
      transition: all 400ms ease-in;
      transition-property: color, border-color, box-shadow, background-color;
      border-radius: var(--input-border-radius);
      padding: var(--input-padding-bottom) var(--input-paddingH);
      padding-top: var(--input-padding-top);
      height: var(--input-height);
      font-size: var(--input-font-size);
      line-height: var(--input-line-height);
    }
    .FormField--empty > .FormField__input,
    .FormField__input::placeholder,
    .FormField__input > *::placeholder {
      opacity: 1; // override browser default styling
      color: var(--input-color-placeholder);
    }
    .FormField--filled > .FormField__input {
      --input-border-color: ${vars.color_faxafloi_100};
    }
    .FormField--invalid > .FormField__input,
    .FormField__input[aria-invalid='true'] {
      --input-border-color: ${vars.color_heidmork_100};
      --input-color: ${vars.color_heidmork_100};
    }
    .FormField--readonly > .FormField__input,
    .FormField__input[readonly] {
      --input-border-color: ${vars.color_suld_100};
      background-color: ${vars.color_suld_50};
    }
    // .FormField__input--focused[class],
    .FormField--focused > .FormField__input,
    .FormField__input:hover,
    .FormField__input:focus {
      --input-border-color: ${vars.color_faxafloi_100};
      color: ${vars.color_suld_200};
      box-shadow: inset 0 0 0 ${prem(1)} var(--input-border-color);
      outline: 0;
    }
    // .FormField__input--disabled[class],
    .FormField--disabled > .FormField__input,
    .FormField__input[disabled] {
      --input-border-color: ${vars.color_suld_100};
      background-color: ${vars.color_suld_50};
      opacity: 0.5;
      cursor: not-allowed;
    }

    // Reset contained field elements by default ...
    .FormField__input > * {
      border: 0;
      background: 0;
      padding: 0;
      width: 100%;
      flex-shrink: 1;
      height: auto;
      line-height: inherit;
      color: inherit;
    }
    .FormField__input > *:focus {
      outline: 0;
    }

    // ---------------------------------------------------------------------------

    .FormField__options {
    }
    .FormField__options__item {
    }

    // ---------------------------------------------------------------------------

    .FormField__assist,
    .FormField__error {
      ${FormField__error}
    }
    .FormField__assist {
      color: ${vars.color_suld_150};
    }
    .FormField__assist::before {
      content: ${vars.icon__alert};
      font-size: ${prem(11)};
    }
  }

  // ===========================================================================

  // Inline the most common input types for better
  // compression and loading speed
  ${Selectbox_css}
  ${TextInput_css}
`;
