import { css } from 'es-in-css';

import {
  SeenEffect__fadein,
  SeenEffect__fadeleft,
  SeenEffect__fadeup,
} from './utils/seenEffects.js';

export default css``;

// inlined in -basics.css.ts
export const SeenEffect_css = () => css`
  [data-seen-effect=''],
  [data-seen-effect='true'],
  [data-seen-effect='fadeup'] {
    ${SeenEffect__fadeup}
  }
  [data-seen-effect='fadein'] {
    ${SeenEffect__fadein}
  }
  [data-seen-effect='fadeleft'] {
    ${SeenEffect__fadeleft}
  }
`;
