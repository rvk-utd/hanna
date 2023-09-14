import range from '@hugsmidjan/qj/range';
import { css } from 'es-in-css';

import { buildVariables } from '../lib/cssutils.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { FormFieldVariables, formFieldVars as ff } from '../lib/otherTokens.js';

import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('FormField')}
`;

export const TextInputVariables = buildVariables(
  ['textarea__leading', 'textarea__rows', 'textarea__extraPad'],
  'TextInput'
);

const ti = TextInputVariables.vars;

const minRows = 3;
const maxRows = 15;

// inlined by FormField
export const TextInput_css = () => css`
  @media screen {
    .TextInput {
    }
    .TextInput--multiline > .FormField__input {
      ${FormFieldVariables.override({
        input__font_size: vars.font_bd_s_size,
      })}
      ${TextInputVariables.declare({
        textarea__leading: vars.font_bd_s_leading,
        textarea__rows: minRows - 1,
        textarea__extraPad: `calc(
          (${ff.input__line_height} - ${ti.textarea__leading}) / 2
        )`,
      })}
      height: calc(${ti.textarea__rows} * ${ti.textarea__leading} + ${ff.input__height});
      line-height: ${ti.textarea__leading};
      padding-top: calc(${ff.input__padding_top} + ${ti.textarea__extraPad});
      padding-bottom: calc(${ff.input__padding_bottom} + ${ti.textarea__extraPad});

      ${range(minRows + 1, maxRows).map(
        (i) => css`
          &[rows='${i}'] {
            ${TextInputVariables.override({ textarea__rows: i - 1 })}
          }
        `
      )}
    }
  }
`;
