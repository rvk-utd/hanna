import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';

import {
  FormField__error,
  InputField,
  InputField__disabled,
  InputField__filled,
  InputField__focused,
  InputField__invalid,
  InputField__noLabel,
  InputField__placeholder,
  InputField__readonly,
  InputField__small,
  InputField_heightI,
  InputField_paddingTop,
} from './styles/forms';
import { sr_only } from './utils/a11y';
import { grid_units, overflowEllipsis, prem } from './utils/miscUtils';

import { Selectbox_css } from './SelecboxKristjan.css';
import { TextInput_css } from './TextInputKristjan.css';

export default css`
  @media screen {
    .FormField {
      --input-border-color: ${vars.color_suld_100};
      --input-border-radius: ${prem(3)};

      display: flex;
      flex-flow: column;
      position: relative;
      margin-bottom: ${grid_units(3)};
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
      line-height: ${prem(InputField_heightI + InputField_paddingTop)};
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
      ${InputField}
    }
    .FormField--nolabel > .FormField__input {
      ${InputField__noLabel}
    }
    .FormField--small > .FormField__input {
      ${InputField__small}
    }
    .FormField--empty > .FormField__input,
    .FormField__input::placeholder {
      ${InputField__placeholder}
    }
    .FormField--filled > .FormField__input {
      @include InputField--filled();
      ${InputField__filled}
    }
    .FormField--invalid > .FormField__input,
    .FormField__input[aria-invalid='true'] {
      ${InputField__invalid}
    }
    .FormField--readonly > .FormField__input,
    .FormField__input[readonly] {
      ${InputField__readonly}
    }
    // .FormField__input--focused[class],
    .FormField--focused > .FormField__input,
    .FormField__input:hover,
    .FormField__input:focus {
      ${InputField__focused}
    }
    // .FormField__input--disabled[class],
    .FormField--disabled > .FormField__input,
    .FormField__input[disabled] {
      ${InputField__disabled}
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
