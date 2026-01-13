import { color, css } from 'es-in-css';

import { htmlCl } from '../lib/classNames.js';
import { colors } from '../lib/colors.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';
import { formFieldVars as ff } from '../lib/otherTokens.js';

import { DEPS } from './utils/miscUtils.js';

import { TagPillVariables } from './TagPill.css.js';

/*
  Markup OUTLINE:
  .FormField(--*).Multiselect(--nowrap)
    .FormField__label
    .FormField__input.Multiselect__input(--open)
        .Multiselect__choices
          .Multiselect__search / .Multiselect__toggler
          .Multiselect__currentvalues  // Always when closed, sometimes when open.
          .Multiselect__options
              .Multiselect__option.Checkbox(--focus) / .Multiselect__noresults
              ...
*/

export default css`
  ${DEPS('TagPill', 'FormField', 'TextInput', 'Checkbox')}

  .Multiselect__input {
    height: auto;
    min-height: ${ff.input__height};
    min-width: 98px; /* to approximately match an empty Selectbox */
    padding-right: calc(${vars.space_5} + ${ff.input__paddingH});
    flex-flow: row wrap;
  }

  .Multiselect__input[data-sprinkled]::before {
    content: '';
    position: absolute;
    z-index: 2;
    top: 1px;
    bottom: 1px;
    right: 1px;
    width: ${vars.space_7};
    pointer-events: none;
    background-image: linear-gradient(
      -90deg,
      ${ff.input__background_color} ${vars.space_4},
      transparent 100%
    );
  }
  .Multiselect--nowrap:not(.FormField--empty)
    > .Multiselect__input[data-sprinkled]::before {
    width: ${vars.space_9};
  }

  .Multiselect__input[data-sprinkled]::after {
    ${iconStyle('keyboard_arrow_down')}
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    right: ${vars.space_2};
    width: ${vars.space_3};
    pointer-events: none;
    margin: auto;
    color: ${ff.input__border_color};
    transition: all 200ms ease-in;
    height: 1em;
    line-height: 1em;
  }
  .Multiselect__input--open[data-sprinkled]::after {
    transform: scaleY(-1);
  }

  .Multiselect__toggler {
    color: ${ff.input__color_placeholder};
    white-space: nowrap;
    overflow: hidden;
  }

  :not(.Multiselect__input--open) > .Multiselect__search,
  :not(.Multiselect__input--open) > .Multiselect__toggler {
    position: absolute;
    z-index: 1;
    width: calc(100% - 2 * ${ff.input__paddingH});
  }

  .FormField--focused > * > .Multiselect__search,
  .FormField--focused > * > .Multiselect__toggler {
  }

  ${htmlCl.beforeSprinkling} .Multiselect__input:not([data-sprinkled]) > .Multiselect__choices {
    display: none;
  }

  .Multiselect__input--open > .Multiselect__choices {
    position: absolute;
    top: 100%;
    margin-top: 1px;
    left: -1px;
    right: -1px;
    width: auto;
    max-height: 500px;
    overflow-y: auto;
    background: ${vars.color_white};
    box-shadow: ${vars.boxShadow_elevated};
    border: 1px solid ${vars.color_suld_100};
    border-top: none;
    border-radius: 0 0 4px 4px;
    z-index: ${vars.zindex__overlay};
  }

  :not(.Multiselect__input--open) > * > .Multiselect__currentvalues {
    line-height: 1;
    padding-top: ${vars.space_1};
    margin-bottom: -2px;
    overflow: hidden;
    margin-right: ${vars.space_7__neg};
    padding-right: ${vars.space_4};

    position: relative;
  }
  .FormField--small > :not(.Multiselect__input--open) > * > .Multiselect__currentvalues {
    margin-top: -2px;
    margin-bottom: -4px;
  }
  .Multiselect__input--open > * > .Multiselect__currentvalues {
    padding: ${vars.space_1} 0 0 ${vars.space_2};
  }
  .Multiselect__input--open > * > .Multiselect__currentvalues::after {
    content: '';
    display: block;
    margin-top: ${vars.space_0$5};
    margin-right: ${vars.space_2};
    border-bottom: ${vars.border_default};
  }

  /* prettier-ignore */
  .Multiselect--nowrap > :not(.Multiselect__input--open) > * > .Multiselect__currentvalues {
    white-space: nowrap;
  }

  .Multiselect__currentvalues > .TagPill {
    margin-bottom: ${vars.space_1};
    ${TagPillVariables.override({
      // NOTE: Is this something we may want to do in the TagPill itself?
      background: color(colors.suld_100).alpha(0.25),
    })}
  }
  :not(.Multiselect__input--open) > * > .Multiselect__currentvalues > .TagPill {
    margin-right: ${vars.space_1};
  }
  .FormField--invalid > * > * > .Multiselect__currentvalues > .TagPill {
    ${TagPillVariables.override({ color: vars.color_heidmork_100 })}
  }

  .Multiselect__options:not([aria-expanded]) {
    padding: ${vars.space_1} 0;
    display: flex;
    flex-flow: row wrap;
    gap: 0 ${vars.space_4};
  }

  .Multiselect__option[class] {
    margin: 0;
  }

  .Multiselect__optionSeparator {
    margin: ${vars.space_1} ${vars.space_0$5};
    border-top: 1px solid ${vars.color_suld_100};
    padding: 0 ${vars.space_1$5};
    padding-top: ${vars.space_1};
    font: ${vars.font_button};
    font-weight: ${vars.font_weight__normal};
    color: ${vars.color_suld_100};
  }

  .Multiselect__optionSeparator:not(.Multiselect__option + *) {
    border-top: none;
    margin-top: 0;
  }

  .Multiselect__optionSeparator--empty {
    padding-top: 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .Multiselect__option:hover {
    // background-color: ${vars.color_suld_50};
  }

  [aria-expanded] > .Multiselect__option > .Checkbox__label {
    padding-top: ${vars.space_2};
    padding-right: ${vars.space_2};
    padding-bottom: ${vars.space_2};
    border-left: ${vars.space_2} solid transparent;
    width: 100%;
  }

  .Multiselect__option--focused {
    background-color: ${vars.color_suld_50};
  }

  .Multiselect__noresults {
    font: ${vars.font_button};
    padding: ${vars.space_2} ${vars.space_2};
  }
`;
