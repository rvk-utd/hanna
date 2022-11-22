import range from '@hugsmidjan/qj/range';
import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';

const minRows = 3;
const maxRows = 15;

const textareaLineHeight = vars.font_bd_s_leading;

// inlined by FormField
export const TextInput_css = () => css`
  @media screen {
    .TextInput {
    }
    .TextInput--multiline > .FormField__input {
      --input-font-size: ${vars.font_bd_s_size};
      --textarea-leading: ${vars.font_bd_s_leading};
      --textarea-rows: ${minRows - 1};
      --textarea-extraPad: calc((var(--input-line-height) - var(--textarea-leading)) / 2);
      height: calc(var(--textarea-rows) * var(--textarea-leading) + var(--input-height));
      line-height: var(--textarea-leading);
      padding-top: calc(var(--input-padding-top) + var(--textarea-extraPad));
      padding-bottom: calc(var(--input-padding-bottom) + var(--textarea-extraPad));

      ${range(minRows + 1, maxRows).map(
        (i) => css`
          &[rows='${i}'] {
            --textarea-rows: ${i - 1};
          }
        `
      )}
    }
  }
`;

export default css`
  /*!@deps
    FormField
  */
`;
