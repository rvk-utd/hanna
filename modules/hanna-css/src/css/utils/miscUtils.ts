import { css, RawCssString, rem } from 'es-in-css';

import { grid } from '../../lib/grid';
import { hannaVars } from '../../lib/hannavars';

/**
 * Utility function that returns a rem stringified value.
 * @param {number} px - number
 */
export const prem = (px: number) => {
  return rem(px / 16);
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
      left: ${hannaVars.grid_margin__neg};
    `;
  const rightProp =
    dir !== 'left' &&
    css`
      right: ${hannaVars.grid_margin__neg};
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
