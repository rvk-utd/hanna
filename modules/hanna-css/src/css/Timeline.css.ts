import { css } from 'es-in-css';
import { hannaVars as vars } from '../lib/hannavars.js';
import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('Skeleton')}

  .Timeline__item[aria-current='step'] > .Timeline__item__title::before {
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

  .Timeline__item__title::before {
    content: '';
    width: 11px;
    height: 11px;
    background-color: ${vars.color_faxafloi_75};
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: ${vars.space_2};
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

  .Timeline__item--skeleton {
    position: relative;
  }

  .Timeline__item--skeleton > .Skeleton {
    display: flex;
    flex-direction: column-reverse;
    width: 250px;
    margin-left: 25px;
    margin-bottom: calc(var(--Skeleton--gap) * var(--space-1));
  }

  .Skeleton__circle {
    width: 11px !important;
    height: 11px;
    border-radius: 11px;
    margin-left: 0px;
    position: absolute;
    left: 0;
    top: 5px;
    margin: 0 !important;
  }
`;
