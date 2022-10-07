import { grid_unit } from '@reykjavik/hanna-css/src/css/vars/grid';
import { css, rem } from 'es-in-css';

import { hannaVars } from '../../lib/hannavars';

/**
 * Utility function that returns a rem stringified value.
 * @param {number} px - number
 */
export const prem = (px: number) => {
  return `${rem(px / 16)}`;
};

export const grid_units = (units = 1) => {
  return prem(grid_unit * units);
};

// TODO: Fix ugly syntax
export const extendBackgroundWithUnderlay = (
  dir: 'left' | 'right' | 'both' = 'both',
  pseudo: 'before' | 'after' = 'before'
) => {
  const direction = css``;
  if (dir !== 'right') {
    direction.concat(css`
      left: ${hannaVars.grid_margin__neg};
    `);
  }
  if (dir !== 'left') {
    direction.concat(css`
      right: ${hannaVars.grid_margin__neg};
    `);
  }
  return css`
    position: relative;
    &::${pseudo} {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      ${direction.trim()}
      z-index: -1;
      background: inherit;
    }
  `;
};

// Todo: Add 'avoidCssnanoMerging' function from 'css/utils/_index.scss'
