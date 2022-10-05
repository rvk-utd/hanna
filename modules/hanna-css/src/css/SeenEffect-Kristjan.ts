import { css } from 'es-in-css';

import {
  SeenEffect__fadein,
  SeenEffect__fadeleft,
  SeenEffect__fadeup,
} from './utils/seenEffects-Kristjan';

export const SeenEffect = () => css`
  [data-seen-effect=''],
  [data-seen-effect='true'],
  [data-seen-effect='fadeup'] {
    ${SeenEffect__fadeup()}
  }
  [data-seen-effect='fadein'] {
    ${SeenEffect__fadein()}
  }
  [data-seen-effect='fadeleft'] {
    ${SeenEffect__fadeleft()}
  }
`;
