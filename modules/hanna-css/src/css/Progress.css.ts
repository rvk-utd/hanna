import range from '@hugsmidjan/qj/range';
import { css, px } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';

/* Progress bar */
const PROGRESS_BAR_BLUE = vars.color_faxafloi_100;
const PROGRESS_BAR_BLUE_LIGHTER = vars.color_faxafloi_50;
const PROGRESS_BAR_WHITE = vars.color_suld_0;

/* Track bar */
const TRACK_BAR_BLUE = vars.color_faxafloi_25;
const TRACK_BAR_WHITE = '#4F95EA';

const BORDER_RADIUS = px(99);

export default css`
  .Progress {
    --progress: 75;
    display: inline-block;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      to right,
      ${PROGRESS_BAR_BLUE} 40%,
      ${PROGRESS_BAR_BLUE_LIGHTER} 60%
    );
  }

  .Progress__value {
    display: none;
  }

  ${range(0, 10).map(
    (i) => css`
      .Progress:not(.Progress--spinner)[aria-valuenow='${i}'] {
        background: linear-gradient(
          to right,
          ${PROGRESS_BAR_BLUE} ${i * 10}%,
          ${PROGRESS_BAR_BLUE_LIGHTER} ${i * 10}%
        );
      }
    `
  )}

  .Progress--spinner {
    display: flex;
    width: 64px;
    height: 64px;
    background: red;
    border-radius: calc(infinity * 1px);
  }

  .Progress--spinner::before {
    content: '';
    width: 90%;
    height: 90%;
    background: white;
    clip-path: circle(40%);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  ${range(0, 10).map(
    (i) => css`
      .Progress--spinner[aria-valuenow='${i}'] {
        background: conic-gradient(
          ${PROGRESS_BAR_BLUE} ${i * 10}%,
          ${PROGRESS_BAR_BLUE_LIGHTER} ${i * 10}%
        );
      }
    `
  )}
`;
