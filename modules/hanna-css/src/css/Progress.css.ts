import range from '@hugsmidjan/qj/range';
import {
  buildVariables,
  css,
  hannaVars as vars,
  pct,
  scoped,
  srOnly,
  WARNING__,
} from '@reykjavik/hanna-css';

import { iconStyle } from '../lib/icons.js';

const progressVars = buildVariables(
  ['colorTransparent', 'spinnerSize', 'spinnerHoleRadius', 'value'],
  'Process'
);
const pVars = progressVars.vars;

const indeterminateAnimation = scoped('Progress-indeterminate');
const spinAnimation = scoped('Progress-spin');

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
    50.001% {
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

  +  /** Makes the spinner value work for smooth CSS \`transition\`s  */
  @property ${pVars.value.cssName} {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%;
  }

  .Progress {
    display: block;
    vertical-align: middle;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    margin: ${vars.space_1} 0;
    color: ${vars.color_faxafloi_100};
    transition: ${pVars.value.cssName} 500ms ease-in-out;
    ${progressVars.override({
      value: pct(0),
      colorTransparent: 'color-mix(in srgb, currentColor 20%, transparent)',
    })}
  }
  .Progress__value {
    ${srOnly()}
  }

  ${range(0, 10).map(
    (i) => css`
      .Progress[aria-valuenow='${i}'] {
        ${progressVars.override({ value: pct(i * 10) })}
      }
    `
  )}
  .Progress--done {
    ${progressVars.override({ value: pct(100) })}
  }

  .Progress--done:not([aria-valuenow='10']) {
    ${WARNING__('`--done` state should always have aria-valuenow="10"')}
  }

  /* ------------------------------------------------------------------------ */

  .Progress:not(.Progress--spinner) {
    background: ${pVars.colorTransparent} linear-gradient(currentColor, currentColor)
      no-repeat 0 0 / ${pVars.value} 100%;
  }
  /** Indeterminate spinner state */
  .Progress:not(.Progress--spinner):not([aria-valuenow]) {
    animation: ${indeterminateAnimation} 1.8s linear infinite;
  }

  /* ======================================================================== */

  .Progress--spinner {
    ${progressVars.override({
      spinnerSize: vars.space_3,
      spinnerHoleRadius: '8px',
    })}
    display: inline-block;
    vertical-align: middle;
    font-size: ${pVars.spinnerSize};
    width: 1em;
    height: 1em;
    line-height: 1em;
    margin: 0;
    border-radius: 50%;
    background: conic-gradient(
      currentColor ${pVars.value},
      ${pVars.colorTransparent} ${pVars.value}
    );
    mask-image: radial-gradient(
      circle,
      transparent ${pVars.spinnerHoleRadius},
      black ${pVars.spinnerHoleRadius}
    );
  }

  .Progress--spinner.Progress--size--xsmall {
    ${progressVars.override({
      spinnerSize: vars.space_1$5,
      spinnerHoleRadius: '4px',
    })}
  }
  .Progress--spinner.Progress--size--small {
    ${progressVars.override({
      spinnerSize: vars.space_2,
      spinnerHoleRadius: '5px',
    })}
  }
  .Progress--spinner.Progress--size--large {
    ${progressVars.override({
      spinnerSize: vars.space_4,
      spinnerHoleRadius: '11px',
    })}
  }

  /** Indeterminate spinner state */
  .Progress--spinner:not([aria-valuenow]) {
    background: conic-gradient(currentColor 180deg, ${pVars.colorTransparent} 180deg);
    animation: ${spinAnimation} 1s linear infinite;
  }

  .Progress--spinner.Progress--done {
    color: ${vars.color_ellidaardalur_150};
    background: ${vars.color_ellidaardalur_100};
    mask-image: none;
  }
  .Progress--spinner.Progress--done::before {
    ${iconStyle('check')}
    font-size: 20px;
    clip-path: none;
    width: 100%;
    height: 100%;
    line-height: calc(${pVars.spinnerSize} / 1em);
  }

  .Progress--spinner.Progress--size--xsmall.Progress--done::before {
    font-size: 1em;
  }
  .Progress--spinner.Progress--size--small.Progress--done::before {
    font-size: 1em;
  }
  .Progress--spinner.Progress--size--large.Progress--done::before {
    font-size: 24px;
  }

  .ButtonPrimary .Progress--spinner,
  .ButtonSecondary .Progress--spinner {
    color: currentColor;
    margin-bottom: 2px;
    margin-left: ${vars.space_1__neg};
    margin-right: ${vars.space_0$5};
  }
`;
