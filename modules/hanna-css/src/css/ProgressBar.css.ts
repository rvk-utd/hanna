import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';

const TRACK_COLOR = vars.color_faxafloi_100;
const TRACK_BG_COLOR = vars.color_faxafloi_25;

export default css`
  progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    background-color: ${TRACK_BG_COLOR};
  }

  /* Track background - Chrome / Safari / Edge */
  progress::-webkit-progress-bar {
    background-color: ${TRACK_BG_COLOR};
  }

  /* Track filled - Chrome / Safari / Edge */
  progress::-webkit-progress-value {
    background-color: ${TRACK_COLOR};
  }

  /* Track filled - Firefox */
  progress::-moz-progress-bar {
    background-color: ${TRACK_COLOR};
  }
`;
