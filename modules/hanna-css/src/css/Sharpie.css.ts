import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('TextBlock')}
`;

// inlined by TextBlock.css.ts
export const Sharpie_css = () => css`
  p.Sharpie,
  ol.Sharpie,
  ul.Sharpie,
  li.Sharpie,
  div.Sharpie {
    color: inherit;
    ${WARNING__('Only use `Sharpie` on inline elements')}
  }
  .Sharpie--green {
    color: ${vars.color_ellidaardalur_150};
  }
  .Sharpie--red {
    color: ${vars.color_heidmork_100};
  }
`;
