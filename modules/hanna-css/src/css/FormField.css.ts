import { css, px } from 'es-in-css';

import { srOnly } from '../lib/a11y.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconContent } from '../lib/icons.js';
import { FormFieldVariables, formFieldVars as ff } from '../lib/otherTokens.js';

import { FormField__error } from './styles/forms.js';
import { grid_units, overflowEllipsis, prem } from './utils/miscUtils.js';

import { Selectbox_css } from './Selectbox.css.js';
import { TextInput_css } from './TextInput.css.js';

export const InputField_paddingTop = 12;

export default css`
  @media screen {
    .FormField {
      ${FormFieldVariables.declare({
        input__background_color: vars.color_suld_0,
        input__border_color: vars.color_suld_100,
        input__border_radius: prem(3),
        input__border_inner_radius: prem(2),
        input__height: vars.space_7,
        input__height_inner: `calc(${ff.input__height} - 2px)`,
        input__padding_top: prem(InputField_paddingTop),
        input__padding_bottom: px(0),
        input__font_size: vars.font_body_l_size,
        input__color: vars.color_suld_200,
        input__color_placeholder: vars.color_suld_150,
        input__line_height: `calc(
          ${ff.input__height_inner} - ${ff.input__padding_top} - ${ff.input__padding_bottom}
        )`,
        input__paddingH: vars.space_2,
      })};

      display: flex;
      flex-flow: column;
      position: relative;
      margin-bottom: ${grid_units(3)};
    }

    .FormField--nolabel {
      ${FormFieldVariables.override({
        input__padding_top: prem(InputField_paddingTop / 2),
        input__padding_bottom: prem(InputField_paddingTop / 2),
      })}
    }

    .FormField--small {
      ${FormFieldVariables.override({
        input__font_size: vars.font_body_m_size,
        input__height: prem(40),
        input__padding_top: px(0),
        input__padding_bottom: px(0),
      })}
    }

    .FormField--filled {
      ${FormFieldVariables.override({
        input__border_color: vars.color_faxafloi_100,
      })}
    }

    .FormField__label {
      position: relative;
      z-index: 1;
      font-weight: ${vars.font_weight__bold};
      margin-bottom: ${prem(10)};
      align-self: flex-start;
    }
    :disabled > .FormField__label,
    .FormField--disabled > .FormField__label {
      opacity: 0.5;
    }

    [data-inputlabel].FormField__label,
    label.FormField__label {
      color: ${vars.color_suld_150};
      font-size: ${vars.font_label_size};
      font-weight: ${vars.font_weight__normal};
      line-height: ${prem(14)};
      transition: all 200ms ease-in;
    }
    :not(.FormField--small) > [data-inputlabel].FormField__label,
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
      > [data-inputlabel].FormField__label,
    .FormField--empty:not(.FormField--small):not(.FormField--focused)
      > label.FormField__label {
      font-size: ${vars.font_body_m_size};
      line-height: ${ff.input__height_inner};
    }

    .FormField--nolabel > .FormField__label {
      ${srOnly}
    }

    .FormField__label__reqstar {
      border-bottom: none;
      float: left;
      margin-right: 0.15em;
    }

    // ---------------------------------------------------------------------------

    .FormField__input {
      font-size: ${vars.font_body_l_size};
      position: relative;
      display: flex;
      width: 100%;
      background-color: ${ff.input__background_color};
      color: ${ff.input__color};
      border: ${prem(1)} solid ${ff.input__border_color};
      transition: all 400ms ease-in;
      transition-property: color, border-color, box-shadow, background-color;
      border-radius: ${ff.input__border_radius};
      padding: ${ff.input__padding_bottom} ${ff.input__paddingH};
      padding-top: ${ff.input__padding_top};
      height: ${ff.input__height};
      font-size: ${ff.input__font_size};
      line-height: ${ff.input__line_height};
    }
    .FormField--empty > .FormField__input,
    .FormField__input::placeholder,
    .FormField__input > *::placeholder {
      opacity: 1; // override browser default styling
      color: ${ff.input__color_placeholder};
    }
    .FormField--filled > .FormField__input {
      ${FormFieldVariables.override({
        input__border_color: vars.color_faxafloi_100,
      })}
    }
    .FormField--invalid > .FormField__input,
    .FormField__input[aria-invalid='true'] {
      ${FormFieldVariables.override({
        input__border_color: vars.color_heidmork_100,
        input__color: vars.color_heidmork_100,
      })}
    }
    .FormField--readonly > .FormField__input,
    .FormField__input[readonly] {
      ${FormFieldVariables.override({
        input__background_color: vars.color_suld_50,
        input__border_color: vars.color_suld_100,
      })}
    }
    // .FormField__input--focused[class],
    .FormField--focused > .FormField__input,
    .FormField__input:hover,
    .FormField__input:focus {
      ${FormFieldVariables.override({
        input__border_color: vars.color_faxafloi_100,
      })}
      color: ${vars.color_suld_200};
      box-shadow: inset 0 0 0 1px ${ff.input__border_color};
      outline: 0;
    }
    :disabled .FormField__input,
    .FormField--disabled > .FormField__input,
    .FormField__input:disabled {
      ${FormFieldVariables.override({
        input__background_color: vars.color_suld_50,
        input__border_color: vars.color_suld_100,
      })}
      box-shadow: none;
      opacity: 0.5;
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
      ${iconContent('warning_filled')}
    }
  }

  // ===========================================================================

  // Inline the most common input types for better
  // compression and loading speed
  ${Selectbox_css}
  ${TextInput_css}
`;
