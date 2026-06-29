import { css, px } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';

const TRACK_COLOR = vars.color_faxafloi_100;
const TRACK_BG_COLOR = vars.color_faxafloi_25;
const BORDER_RADIUS = px(99);

export default css`
  progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    background-color: ${TRACK_BG_COLOR};
    border-radius: ${BORDER_RADIUS};
  }

  /* Track - Chrome / Safari / Edge */
  progress::-webkit-progress-bar {
    background-color: ${TRACK_BG_COLOR};
    border-radius: ${BORDER_RADIUS};
    border-radius: ${BORDER_RADIUS};
  }

  /* Track filled - Chrome / Safari / Edge */
  progress::-webkit-progress-value {
    background-color: ${TRACK_COLOR};
    border-top-left-radius: ${BORDER_RADIUS};
    border-bottom-left-radius: ${BORDER_RADIUS};
  }

  /* Track - Firefox */
  progress::-moz-progress-bar {
    background-color: ${TRACK_COLOR};
  }
`;
