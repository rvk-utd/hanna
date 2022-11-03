import { css } from 'es-in-css';

import { mq } from '../../lib/breakpoints';
import { hannaVars as vars } from '../../lib/hannavars';
import { iconStyle } from '../../lib/icons';
import { WARNING__ } from '../../lib/WARNING__';
import { sr_only } from '../utils/a11y';
import { grid_units, prem } from '../utils/miscUtils';

export const InputField_heightI = 42;
export const InputField_paddingTop = 12;
export const InputField_heightI__small = 38;
export const InputField_paddingH = grid_units(2);

export const FormField__error = (paddingLeft = grid_units(2), marginTop = prem(9)) => css`
  color: ${vars.color_heidmork_100};
  font-size: ${prem(12)}; // TODO find variable $font-size-12
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

export const TogglerKnob = (bem: string, radio = bem === 'Radio') => css`
  .${bem}__input {
    ${sr_only}
  }
  .${bem}__label {
    display: inline-block;
    font: ${vars.font_button};
    padding: ${vars.space_1} 0;
    padding-left: ${prem(36)};
    position: relative;
  }
  .${bem}__label::before {
    ${iconStyle('')}
    float: left;
    margin-top: ${prem(2)};
    margin-left: ${prem(-36)};
    width: ${prem(20)};
    height: ${prem(20)};
    line-height: ${prem(18)};
    ${radio
      ? css`
          border-radius: 50%;
          font-size: ${prem(14)};
        `
      : css`
          font-size: ${prem(12)};
        `}
    border: ${prem(1)} solid ${vars.color_suld_100};
    transition: all 200ms ease-in;
    transition-property: box-shadow, border-color, background-color, outline;
    outline: 0 solid transparent;
  }

  // Invalid
  .${bem}__input[aria-invalid='true'] + .${bem}__label {
    color: ${vars.color_heidmork_100};
  }
  .${bem}__input[aria-invalid='true'] + .${bem}__label::before {
    border-color: ${vars.color_heidmork_100};
  }

  // Focus/Hover
  .${bem}__label[class][class]:hover, .${bem}__input[class]:focus + .${bem}__label {
    color: ${vars.color_suld_200};
  }
  .${bem}__label[class][class]:hover::before,
    .${bem}__input[class]:focus
    + .${bem}__label::before {
    border-color: ${vars.color_faxafloi_100};
    box-shadow: inset 0 0 0 2px ${vars.color_faxafloi_100};
  }

  // Checked
  .${bem}__input:checked + .${bem}__label::before {
    ${radio
      ? css`
          content: ${vars.icon__radioball};
        `
      : css`
          content: ${vars.icon__checkmark};
        `}

    border-color: transparent;
    background-color: ${vars.color_faxafloi_100};
    color: ${vars.color_suld_0};
  }
  // Checked + Invalid
  .${bem}__input[aria-invalid='true']:checked + .${bem}__label::before {
    background-color: ${vars.color_heidmork_100};
  }

  // Checked + Focus/Hover
  .${bem}__input:checked
    + .${bem}__label:hover::before,
    .${bem}__input:checked:focus
    + .${bem}__label::before {
    background-color: ${vars.color_faxafloi_100};
    outline: ${prem(1)} solid ${vars.color_faxafloi_100};
    outline-offset: ${prem(1)};
  }

  // Disabled
  .${bem}__input[class]:disabled + .${bem}__label {
    color: ${vars.color_suld_200};
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

  // __error
  ${!radio &&
  css`
    .${bem}__error {
      ${FormField__error}
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

export const TogglerButtonsKnob = (bem: string, radio = bem === 'RadioButton') => css`
  ${TogglerKnob(bem)}

  .${bem}__label {
    font-weight: ${vars.font_weight__bold};
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding: ${vars.space_3};
    padding-left: ${prem(60)};
    border: ${prem(1)} solid ${vars.color_suld_100};
    transition: all 200ms ease-in;
    transition-property: box-shadow, color, border-color, background-color;
  }
  .${bem}__label > small {
    margin-top: ${vars.space_0$5};
    display: block;
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
  .${bem}__label:hover, .${bem}__input:focus + .${bem}__label {
    border-color: ${vars.color_faxafloi_100};
    box-shadow: inset 0 0 0 2px ${vars.color_faxafloi_100};
  }

  // Checked + Focus/Hover
  .${bem}__input:checked
    + .${bem}__label:hover::before,
    .${bem}__input:checked:focus
    + .${bem}__label::before {
    outline: 0;
  }

  // Disabled
  .${bem}__input[class]:disabled + .${bem}__label {
    color: ${vars.color_suld_150};
    border-color: ${vars.color_suld_100};
    background-color: ${vars.color_suld_50};
    box-shadow: none;
    opacity: 0.5;
  }
  .${bem}__input:disabled + .${bem}__label > small {
    color: ${vars.color_suld_150};
  }

  ${!radio &&
  css`
    .${bem}__error {
      color: ${vars.color_heidmork_150};
      padding-left: ${prem(36)};
    }
  `};
`;

// ===========================================================================

// ===========================================================================

export const InputField = () => css`
  font-size: ${vars.font_bd_l_size};
  position: relative;
  display: flex;
  width: 100%;
  background-color: ${vars.color_suld_0};
  color: ${vars.color_suld_200};
  border: ${prem(1)} solid var(--input-border-color);
  transition: all 400ms ease-in;
  transition-property: color, border-color, box-shadow, background-color;
  border-radius: var(--input-border-radius);
  padding: 0 ${InputField_paddingH};
  padding-top: ${prem(InputField_paddingTop)};
  height: ${prem(InputField_heightI + InputField_paddingTop + 2)};
  line-height: ${prem(InputField_heightI)};
`;

export const InputField__noLabel = () => css`
  padding-top: ${prem(InputField_paddingTop / 2)};
  padding-bottom: ${prem(InputField_paddingTop / 2)};
`;

export const InputField__small = () => css`
  padding-top: 0;
  font-size: ${vars.font_base_size};
  height: ${prem(InputField_heightI__small + 2)};
  line-height: ${prem(InputField_heightI__small)};
`;

export const InputField__placeholder = () => css`
  color: ${vars.color_suld_150};
  opacity: 1; // override browser default styling
`;

export const InputField__filled = () => css`
  --input-border-color: ${vars.color_faxafloi_100};
`;

export const InputField__invalid = () => css`
  --input-border-color: ${vars.color_heidmork_100};
  color: ${vars.color_heidmork_100};
`;

export const InputField__focused = () => css`
  --input-border-color: ${vars.color_faxafloi_100};
  color: ${vars.color_suld_200};
  box-shadow: inset 0 0 0 ${prem(1)} var(--input-border-color);
  outline: 0;
`;

export const InputField__disabled = () => css`
  --input-border-color: ${vars.color_suld_100};
  background-color: ${vars.color_suld_50};
  opacity: 0.5;
  cursor: not-allowed;
`;

export const InputField__readonly = () => css`
  --input-border-color: ${vars.color_suld_100};
  background-color: ${vars.color_suld_50};
`;
