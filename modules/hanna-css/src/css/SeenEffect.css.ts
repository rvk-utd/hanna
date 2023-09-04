import { css } from 'es-in-css';

import {
  SeenEffect__fadein,
  SeenEffect__fadeleft,
  SeenEffect__fadeup,
} from './utils/seenEffects.js';

export default css``;

// inlined in -basics.css.ts
export const SeenEffect_css = () => css`
  [data-seen-effect='fadeup'],
  /*
    Make "fadeup" the default (the empty value) effect.
    To override this, and effectively make "custom" (no-styling) the default,
    use \`SeenEffect__resetDefault()\` for a target element.
  */
  [data-seen-effect=''] {
    ${SeenEffect__fadeup('bare')}
  }
  [data-seen-effect='fadein'] {
    ${SeenEffect__fadein('bare')}
  }
  [data-seen-effect='fadeleft'] {
    ${SeenEffect__fadeleft('bare')}
  }
  [data-seen-effect='custom'] {
    /* Custom effect styles are implemented in the contained component. */
  }
`;
