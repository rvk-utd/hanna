import { css, LengthValue, VariablePrinter } from 'es-in-css';

import { srOnly } from '../../lib/a11y.js';
import { mq } from '../../lib/breakpoints.js';
import { buildVariables } from '../../lib/cssutils.js';
import { hannaVarOverride, hannaVars as vars } from '../../lib/hannavars.js';
import { iconStyle } from '../../lib/icons.js';
import { WARNING__ } from '../../lib/WARNING__.js';
import { grid_units, prem } from '../utils/miscUtils.js';

export const FormField__error = (
  paddingLeft: LengthValue | VariablePrinter | 0 = vars.space_2,
  marginTop: LengthValue | VariablePrinter | 0 = prem(9)
) => css`
  color: ${vars.color_heidmork_100};
  font-size: ${prem(12)};
  line-height: ${prem(14)};
  padding-left: ${paddingLeft};
  margin-top: ${marginTop};

  &::before {
    ${iconStyle(vars.icon__error)}
    margin-right: ${grid_units(1)};
    font-size: ${prem(10)};
  }

  &:not([id]) {
    ${WARNING__('should have id atribute to match input[aria-describedby]', {
      pos: 'after',
    })};
  }
`;

export const FormFieldVariables = buildVariables(
  [
    'input__border_color',
    'input__border_radius',
    'input__border_inner_radius',
    'input__height',
    'input__height_inner',
    'input__padding_top',
    'input__padding_bottom',
    'input__font_size',
    'input__color',
    'input__color_placeholder',
    'input__line_height',
    'input__paddingH',
  ],
  'FormField'
);

// ===========================================================================

export const TogglerGroup = (bem: string) => css`
  .${bem}--inline > .FormField__options {
    margin: 0 ${prem(-15)};
    display: flex;
    flex-flow: row wrap;
  }
  .${bem}--inline > * > .FormField__options__item {
    margin-left: ${prem(15)};
    margin-right: ${prem(15)};
    flex-shrink: 1;
  }
`;

const TogglerVariables = buildVariables(
  ['knob__color', 'knob__color_active', 'label__color'],
  'Toggler'
);
const tglVars = TogglerVariables.vars;

export const TogglerKnob = (bem: string, radio = bem === 'Radio') => css`
  .${bem}__input {
    ${srOnly}
  }
  .${bem}__label {
    ${TogglerVariables.declare({
      knob__color: vars.color_suld_100,
      knob__color_active: vars.color_faxafloi_100,
      label__color: '_inherit',
    })}
    display: inline-block;
    font: ${vars.font_button};
    padding: ${vars.space_1} 0;
    padding-left: ${prem(36)};
    position: relative;
    color: ${tglVars.label__color};
  }
  .${bem}__label::before {
    ${iconStyle('')}
    float: left;
    margin-top: ${prem(2)};
    margin-left: ${prem(-36)};
    width: ${prem(20)};
    height: ${prem(20)};
    line-height: ${prem(18)};
    font-size: ${prem(radio ? 14 : 16)};
    ${radio &&
    css`
      border-radius: 50%;
    `}
    border: ${prem(1)} solid ${tglVars.knob__color};
    transition: all 200ms ease-in;
    transition-property: box-shadow, border-color, background-color, outline;
    outline: 0 solid transparent;
  }

  // Focus/Hover
  .${bem}__label[class]:hover, //
  .${bem}__input:focus + .${bem}__label {
    color: ${tglVars.label__color};
  }
  .${bem}__label[class]:hover::before, //
  .${bem}__input:focus + .${bem}__label::before {
    border-color: ${tglVars.knob__color_active};
    box-shadow: inset 0 0 0 2px ${tglVars.knob__color_active};
  }

  // Checked
  .${bem}__input:checked + .${bem}__label::before {
    content: ${radio ? vars.icon__radioball : vars.icon__checkmark};
    border-color: transparent;
    background-color: ${tglVars.knob__color_active};
    color: ${vars.color_suld_0};
  }

  // Checked + Focus/Hover
  .${bem}__input:checked + .${bem}__label:hover::before, //
  .${bem}__input:checked:focus + .${bem}__label::before {
    outline: ${prem(1)} solid ${tglVars.knob__color_active};
    outline-offset: ${prem(1)};
  }

  // Invalid
  .${bem}__input[aria-invalid='true'] + .${bem}__label {
    ${TogglerVariables.override({
      knob__color: vars.color_heidmork_100,
      knob__color_active: vars.color_heidmork_100,
      label__color: vars.color_heidmork_100,
    })}
    ${hannaVarOverride({
      link_color: vars.color_heidmork_150,
      link_underline: vars.link_underline__hairline,
    })}
  }

  // Disabled
  .${bem}__input[class]:disabled + .${bem}__label {
    ${TogglerVariables.override({
      label__color: vars.color_suld_200,
    })}
    opacity: 0.5;
  }
  .${bem}__input[class]:disabled + .${bem}__label::before {
    border-color: ${vars.color_suld_100};
    background-color: ${vars.color_suld_50};
    color: ${vars.color_suld_100};
    box-shadow: none;
    outline: 0;
  }

  // Disabled + Checked
  ${radio &&
  css`
    .${bem}__input:disabled:checked + .${bem}__label::before {
      background-color: ${vars.color_suld_100};
      color: ${vars.color_suld_50};
    }
  `}

  ${!radio &&
  css`
    .${bem}:not(.FormField__options__item) {
      margin-bottom: ${vars.space_3};
    }
    .${bem}__label__reqstar {
      border-bottom: none;
      float: left;
      margin-right: 0.15em;
    }

    .${bem}__note, //
    .${bem}__error {
      ${FormField__error(prem(36), 0)};
    }
  `}
`;

// ===========================================================================

export const TogglerButtonsGroup = (bem: string) => css`
  .${bem} > .FormField__options {
    @media ${mq.phablet_up} {
      margin-right: ${vars.grid_0_1__neg};
      display: flex;
      flex-flow: row wrap;
    }
  }
  .${bem} > * > .FormField__options__item {
    margin-bottom: ${vars.space_2};

    @media ${mq.phablet_up} {
      margin-bottom: ${vars.grid_0_1};
      margin-right: ${vars.grid_0_1};
      width: ${vars.grid_6};
    }
    @media ${mq.netbook} {
      width: ${vars.grid_4};
    }
    @media ${mq.wide} {
      width: ${vars.grid_3};
    }
  }

  .${bem} > .FormField__error,
  .${bem} > .FormField__assist {
    position: relative;
    top: calc(-0.5 * ${vars.grid_0_1});
  }

  .${bem}--slim {
    ${WARNING__(`Deprecated: .${bem} --slim is no longer supported`)};
  }
  .${bem}--2col {
    ${WARNING__(` Deprecated: . ${bem} --2col is no longer supported`)};
  }
  .${bem}--3col {
    ${WARNING__(`Deprecated: . ${bem} --3col is no longer supported`)};
  }
`;

// ===========================================================================

export const TogglerButtonsKnob = (bem: string, radio = bem === 'RadioButton') => css`
  ${TogglerKnob(bem, radio)}

  .${bem}__label {
    font-weight: ${vars.font_weight__bold};
    width: 100%;
    height: 100%;
    padding: ${vars.space_3};
    padding-left: ${prem(60)};
    border: ${prem(1)} solid ${vars.color_suld_100};
    transition: all 200ms ease-in;
    transition-property: box-shadow, color, border-color, background-color;
    // @deprecated support for old non-inner-wrapped markup (Remove in v0.9)
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
  .${bem}__label > small, // @deprecated support for old non-inner-wrapped markup (Remove in v0.9)
  .${bem}__label__wrap > small {
    display: block;
    margin-top: ${vars.space_0$5};
    font: ${vars.font_label};
    font-weight: ${vars.font_weight__normal};
  }

  .${bem}__label::before {
    position: absolute;
    top: 50%;
    left: ${vars.space_3};
    margin-top: ${prem(-10)};
    margin-left: 0;
  }

  // Focus + Hover
  .${bem}__label:hover, //
  .${bem}__input:focus + .${bem}__label {
    border-color: ${tglVars.knob__color_active};
    box-shadow: inset 0 0 0 2px ${tglVars.knob__color_active};
  }

  // Checked + Focus/Hover
  .${bem}__input:checked + .${bem}__label:hover::before, //
  .${bem}__input:checked:focus + .${bem}__label::before {
    outline: 0;
  }

  // Disabled
  .${bem}__input[class]:disabled + .${bem}__label {
    ${TogglerVariables.override({
      label__color: vars.color_suld_150,
    })}
    border-color: ${vars.color_suld_100};
    background-color: ${vars.color_suld_50};
    box-shadow: none;
    opacity: 0.5;
  }

  ${!radio &&
  css`
    .${bem}__note, //
    .${bem}__error {
      margin-top: ${vars.space_1};
      padding-left: ${vars.space_3};
    }
  `};
`;
