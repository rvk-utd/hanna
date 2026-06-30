import { css, px } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';

/* Progress bar */
const PROGRESS_BAR_BLUE = vars.color_faxafloi_100;
const PROGRESS_BAR_WHITE = vars.color_suld_0;

/* Track bar */
const TRACK_BAR_BLUE = vars.color_faxafloi_25;
const TRACK_BAR_WHITE = '#4F95EA';

const BORDER_RADIUS = px(99);

const applyBorderRadius = (placement: 'left' | 'right' | 'both') => {
  if (placement === 'left') {
    return css`
      border-radius: ${BORDER_RADIUS} 0 0 ${BORDER_RADIUS};
    `;
  }
  if (placement === 'right') {
    return css`
      border-radius: 0 ${BORDER_RADIUS} ${BORDER_RADIUS} 0;
    `;
  }
  return css`
    border-radius: ${BORDER_RADIUS};
  `;
};

export default css`
  .ProgressBar {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    background-color: ${TRACK_BAR_BLUE};
    width: 100%;
    height: 4px;
    ${applyBorderRadius('both')}
  }

  .ProgressBar--white {
    background-color: ${TRACK_BAR_WHITE};
  }

  /* Track - Chrome / Safari / Edge */
  .ProgressBar::-webkit-progress-bar {
    background-color: ${TRACK_BAR_BLUE};
    ${applyBorderRadius('both')}
  }

  .ProgressBar--white::-webkit-progress-bar {
    background-color: ${TRACK_BAR_WHITE};
  }

  /* Track filled - Chrome / Safari / Edge */
  .ProgressBar::-webkit-progress-value {
    background-color: ${PROGRESS_BAR_BLUE};
    ${applyBorderRadius('left')}
  }

  .ProgressBar[value='100']::-webkit-progress-value {
    ${applyBorderRadius('right')}
  }

  .ProgressBar--white::-webkit-progress-value {
    background-color: ${PROGRESS_BAR_WHITE};
  }

  /* Track - Firefox */
  .ProgressBar::-moz-progress-bar {
    background-color: ${PROGRESS_BAR_BLUE};
  }

  .ProgressBar--white::-moz-progress-bar {
    background-color: ${PROGRESS_BAR_WHITE};
  }
`;
