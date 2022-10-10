import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';

import { prem } from './utils/misc';

export default css`
  @media screen {
    .ButtonBack {
      // TODO: ADD VARIABLES
      // TODO: Include ButtonTertiaryStyle
      // TODO: Include ButtonTertiaryStyle--disabled
      font-size: ${vars.font_label_size};
    }

    .ButtonBack::before {
      ${iconStyle(vars.icon__arrow_left_long)};
      background: 0;
      height: auto;
      margin-right: ${prem(8)};
      margin-bottom: 0;
      font-size: ${prem(9)};
      overflow: hidden;
    }
  }
`;
