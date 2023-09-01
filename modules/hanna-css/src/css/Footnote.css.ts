import { css } from 'es-in-css';

import { scale_container } from '../lib/between.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { prem } from './utils/miscUtils.js';

export default css`
  @media screen {
    .Footnote {
      width: 100%;
      position: relative;
      margin-top: ${scale_container(24, 32)};
      margin-bottom: ${prem(30)};
      padding-left: ${scale_container(10, 36)};
      color: ${vars.color_suld_150};

      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        margin: ${prem(3)} 0;
        border-left: ${prem(4)} solid currentColor;
      }
    }
  }
`;
