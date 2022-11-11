import range from '@hugsmidjan/qj/range';
import { css } from 'es-in-css';

import { font } from '../lib/font';
import { hannaVars as vars } from '../lib/hannavars';

import {
  InputField_heightI,
  InputField_heightI__small,
  InputField_paddingTop,
} from './styles/forms';
import { prem } from './utils/miscUtils';

const minRows = 3;
const maxRows = 12;

const pHLarge = (InputField_heightI - font.base_leading) / 2;
const pHSmall = (InputField_heightI__small - font.base_leading) / 2;

const heightLarge = (i: number) => {
  const result = 2 * pHLarge + 2 + InputField_paddingTop + i * font.base_leading;
  return prem(result);
};

const heightSmall = (i: number) => {
  const result = 2 * pHSmall + 2 + i * font.base_leading;
  return prem(result);
};

// inlined by FormField
export const TextInput_css = () => css`
  @media screen {
    .TextInput {
    }
    .TextInput--multiline > .FormField__input {
      font: ${vars.font_bd_s};
      height: ${heightLarge(minRows)};
      padding-top: ${prem(pHLarge + InputField_paddingTop)};
      padding-bottom: ${prem(pHLarge)};

      ${range(minRows + 1, maxRows).map(
        (i) => css`
          &[rows='${i}'] {
            height: ${heightLarge(i)};
          }
        `
      )}
    }
    .FormField--small.TextInput--multiline > .FormField__input {
      height: ${heightSmall(minRows)};
      padding-top: ${prem(pHSmall)};
      padding-bottom: ${prem(pHSmall)};

      ${range(minRows + 1, maxRows).map(
        (i) => css`
          &[rows='${i}'] {
            height: ${heightSmall(i)};
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
