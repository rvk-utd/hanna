import range from '@hugsmidjan/qj/range';
import { css } from 'es-in-css';

export default css`
  .Progress {
    display: inline-block;
    width: 100%;
    height: 4px;
    border-radius: 4px;
  }

  .Progress__value {
    display: none;
  }

  ${range(0, 10).map(
    (i) => css`
      .Progress:not(.Progress--spinner)[aria-valuenow='${i}'] {
        background: linear-gradient(
          to right,
          var(--progress-color) ${i * 10}%,
          var(--progress-color-transparent) ${i * 10}%
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
          var(--progress-color) ${i * 10}%,
          var(--progress-color-transparent) ${i * 10}%
        );
      }
    `
  )}
`;
