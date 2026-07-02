import range from '@hugsmidjan/qj/range';
import { css } from 'es-in-css';
import { hannaVars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';

const indeterminateAnimation = 'Progress-indeterminate';
const spinAnimation = 'Progress-spin';

export default css`
  @keyframes ${indeterminateAnimation} {
    /* Phase 1 – leading edge advances to the finish (bar grows, left edge pinned) */
    0% {
      background-size: 0% 100%;
      background-position-x: 0%;
    }
    50% {
      background-size: 100% 100%;
      background-position-x: 0%;
    }
    /* Position flip happens while the bar fills the track, so it's invisible */
    50.01% {
      background-size: 100% 100%;
      background-position-x: 100%;
    }
    /* Phase 2 – trailing edge advances to the finish (bar shrinks, right edge pinned) */
    100% {
      background-size: 0% 100%;
      background-position-x: 100%;
    }
  }

  @keyframes ${spinAnimation} {
    to {
      transform: rotate(360deg);
    }
  }

  .Progress {
    --progress-color-transparent: color-mix(in srgb, currentColor 20%, transparent);

    display: inline-block;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    color: ${hannaVars.color_faxafloi_100};
  }

  .Progress__value {
    display: none;
  }

  ${range(0, 10).map(
    (i) => css`
      .Progress:not(.Progress--spinner)[aria-valuenow='${i}'] {
        background: linear-gradient(
          to right,
          currentColor ${i * 10}%,
          var(--progress-color-transparent) ${i * 10}%
        );
      }
    `
  )}

  .Progress:not(.Progress--spinner):not([aria-valuenow]) {
    background-color: var(--progress-color-transparent);
    background-image: linear-gradient(currentColor, currentColor);
    background-repeat: no-repeat;
    animation: ${indeterminateAnimation} 1.8s ease-in-out infinite;
  }

  .Progress--spinner {
    display: flex;
    width: 32px;
    height: 32px;
    border-radius: calc(infinity * 1px);
    /*
      Works but the circle becomes blurry
       mask-image: radial-gradient(circle, transparent 50%, black 50%);
    */
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

  .Progress--spinner.Progress--done {
    color: ${hannaVars.color_ellidaardalur_100};
  }

  .Progress--spinner.Progress--done::before {
    ${iconStyle('check', 'small')}
    clip-path: none;
    width: 25%;
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${hannaVars.color_ellidaardalur_100};
    color: ${hannaVars.color_ellidaardalur_150};
  }

  ${range(0, 10).map(
    (i) => css`
      .Progress--spinner[aria-valuenow='${i}'] {
        background: conic-gradient(
          currentColor ${i * 10}%,
          var(--progress-color-transparent) ${i * 10}%
        );
      }
    `
  )}

  .Progress--spinner:not([aria-valuenow]) {
    background: conic-gradient(currentColor, var(--progress-color-transparent));
    animation: ${spinAnimation} 1s linear infinite;
  }
`;
