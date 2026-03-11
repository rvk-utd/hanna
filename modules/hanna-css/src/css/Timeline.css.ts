import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';

import { ComponentLayout } from './styles/componentLayout.js';
import { DEPS } from './utils/miscUtils.js';

const circleWidth = '11px';
const circleHeight = '11px';
const circleBorderRadius = '50%';

export default css`
  ${DEPS('Skeleton')}

  .Timeline {
    ${ComponentLayout};
  }

  .Timeline__item {
    position: relative;
    padding-left: ${vars.space_3};
  }

  .Timeline__item::before {
    display: block;
    position: absolute;
    top: 6px;
    left: 0;
    content: '';
    width: ${circleWidth};
    height: ${circleHeight};
    background-color: ${vars.color_faxafloi_75};
    border-radius: ${circleBorderRadius};
    flex-shrink: 0;
    margin-right: ${vars.space_2};
  }

  .Timeline__item::after {
    display: block;
    position: absolute;
    content: '';
    top: 18px;
    bottom: 0;
    left: 5px;
    width: 1px;
    background-color: ${vars.color_faxafloi_75};
    margin: 5px 0;
  }

  .Timeline__item[aria-current='step']::before {
    background-color: ${vars.color_faxafloi_100};
  }

  .Timeline__item__title {
    display: flex;
    align-items: center;
    font: ${vars.font_body_m};
    font-weight: ${vars.font_weight__bold};
    color: ${vars.color_suld_200};
    padding-bottom: 4px;
  }

  .Timeline__items {
    display: flex;
    flex-direction: column;
  }

  .Timeline--oldestFirst .Timeline__items {
    flex-direction: column-reverse;
  }

  .Timeline__subitems {
    border-left: 1px solid ${vars.color_faxafloi_50};
    padding-left: calc(${vars.space_2} + 5px);
    margin-left: 5px;
    min-height: 20px;
  }

  .Timeline__item:last-child > .Timeline__subitems {
    min-height: auto;
  }

  .Timeline__subitem {
    padding: 4px 0;
    font: ${vars.font_body_s};
  }

  .Timeline__subitem:last-child {
    padding: 4px 0 8px 0;
  }

  .Timeline__item__description {
    color: ${vars.color_suld_200};
  }

  .Timeline__item__category,
  .Timeline__item__date {
    color: ${vars.color_suld_150};
  }

  .Timeline__item--loading::before,
  .Timeline__item--loading::after {
    display: none;
  }

  .Timeline__item--loading {
    position: relative;
    padding-left: 0;
  }

  .Timeline__item--loading > .Skeleton {
    display: flex;
    flex-direction: column-reverse;
    width: 250px;
    margin: 0 0 calc(var(--Skeleton--gap) * var(--space-1)) ${vars.space_3};
  }

  .Skeleton__circle {
    position: absolute;
    left: 0;
    top: 5px;
    width: ${circleWidth} !important;
    height: ${circleHeight};
    border-radius: ${circleBorderRadius};
    margin: 0 !important;
  }
`;
