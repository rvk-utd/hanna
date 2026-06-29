import { css, px } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';

const TRACK_COLOR_BLUE = vars.color_faxafloi_100;
const TRACK_COLOR_WHITE = vars.color_suld_0;
const TRACK_BG_COLOR = vars.color_faxafloi_25;
const BORDER_RADIUS = px(99);

export default css`
  .ProgressBar {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    background-color: ${TRACK_BG_COLOR};
    border-radius: ${BORDER_RADIUS};
    width: 100%;
  }

  /* Track - Chrome / Safari / Edge */
  .ProgressBar::-webkit-progress-bar {
    background-color: ${TRACK_BG_COLOR};
    border-radius: ${BORDER_RADIUS};
    border-radius: ${BORDER_RADIUS};
  }

  /* Track filled - Chrome / Safari / Edge */
  .ProgressBar::-webkit-progress-value {
    background-color: ${TRACK_COLOR_BLUE};
    border-top-left-radius: ${BORDER_RADIUS};
    border-bottom-left-radius: ${BORDER_RADIUS};
  }

  .ProgressBar--white::-webkit-progress-value {
    background-color: ${TRACK_COLOR_WHITE};
  }

  /* Track - Firefox */
  .ProgressBar::-moz-progress-bar {
    background-color: ${TRACK_COLOR_BLUE};
  }

  .ProgressBar--white::-moz-progress-bar {
    background-color: ${TRACK_COLOR_WHITE};
  }
`;
