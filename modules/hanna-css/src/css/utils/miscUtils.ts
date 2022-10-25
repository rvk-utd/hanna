import { css, pct, PlainNumber, PxValue, RawCssString, rem } from 'es-in-css';

import { grid } from '../../lib/grid';
import { hannaVars as vars } from '../../lib/hannavars';

/**
 * Converts a pixel size to a rem value.
 */
export const prem = (px: PlainNumber | PxValue) => {
  return rem(px / 16);
};

/**
 * Converts a unitless number (a decimal between 0 and 1) to a percentage.
 * @param {number} num - number between 0 and 1
 */
export const percentage = (num: number) => {
  return pct(num * 100);
};

export const grid_units = (units = 1) => {
  return prem(units * grid.unit);
};

// TODO: Fix ugly syntax
export const extendBackgroundWithUnderlay = (
  dir: 'left' | 'right' | 'both' = 'both',
  pseudo: 'before' | 'after' = 'before'
) => {
  const leftProp =
    dir !== 'right' &&
    css`
      left: ${vars.grid_margin__neg};
    `;
  const rightProp =
    dir !== 'left' &&
    css`
      right: ${vars.grid_margin__neg};
    `;

  return css`
    position: relative;

    &::${pseudo} {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      ${leftProp}
      ${rightProp}
      z-index: -1;
      background: inherit;
    }
  `;
};

/**
 * Hack to generate an extra selector block to stop cssnano
 * from destructively merging adjacent properties – e.g. when
 * providing a fallback value for older browsers.
 *
 * Remove as soon as this issue has been resolved:
 * https://github.com/cssnano/cssnano/issues/897
 */
export const avoidCssnanoMerging = (cssContent: RawCssString) => css`
  & {
    ${cssContent};
  }
`;

export const overflowEllipsis = () => css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
