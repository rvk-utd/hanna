import { css } from 'es-in-css';

import { between_phone_netbook } from '../lib/between.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { avoidCssnanoMerging, extendBackgroundWithUnderlay } from './utils/miscUtils.js';

export default css`
  .BgBox {
    ${extendBackgroundWithUnderlay};
    background-color: ${vars.color_suld_25};
    margin-bottom: ${vars.component_vspace__medium};
    padding: 70px 0;
    ${avoidCssnanoMerging(css`
      padding: min(${between_phone_netbook(30, 90)}, 90px) 0;
    `)}
  }
  .BgBox[class] > *:last-child {
    margin-bottom: 0;
  }
`;
