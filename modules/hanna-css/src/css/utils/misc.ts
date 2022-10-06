import { grid_unit } from '@reykjavik/hanna-css/src/css/vars/grid';
import { rem } from 'es-in-css';

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
