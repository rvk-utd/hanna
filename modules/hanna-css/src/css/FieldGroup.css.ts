import { css } from 'es-in-css';

import { between_cols } from '../lib/between';
import { hannaVars } from '../lib/hannavars';

import { prem } from './utils/miscUtils';

export default css`
  @media screen {
    .FieldGroup {
      margin-bottom: ${between_cols(30, 70)};
    }
    .FieldGroup__legend {
      font: ${hannaVars.font_sh_l};
      margin-bottom: ${prem(20)};
    }
  }
`;
