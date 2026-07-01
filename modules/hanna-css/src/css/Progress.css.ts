import range from '@hugsmidjan/qj/range';
import { css } from 'es-in-css';
import { hannaVars } from '../lib/hannavars';

const growAnimation = 'Progress-grow';
const spinAnimation = 'Progress-spin';

export default css`
  @keyframes ${growAnimation} {
    0% {
      background-size: 0% 100%;
    }
    100% {
      background-size: 100% 100%;
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
    animation: ${growAnimation} 1.5s ease-in-out infinite;
  }

  .Progress--spinner {
    display: flex;
    width: 64px;
    height: 64px;
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
    background: conic-gradient(
      currentColor,
      var(--progress-color-transparent)
    );
    animation: ${spinAnimation} 1s linear infinite;
  }
`;
