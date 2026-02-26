import { css } from 'es-in-css';
import { hannaVars as vars } from '../lib/hannavars.js';

export default css`
  .Timeline__item[aria-current='step'] .Timeline__item__title::before {
    background-color: ${vars.color_faxafloi_100};
  }

  .Timeline__item__title {
    display: flex;
    align-items: center;
    color: ${vars.color_suld_200};
    font-family: Esja;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
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
  }

  .Timeline__subitem {
    padding: 4px 0;
  }

  .Timeline__subitem:last-child {
    padding: 4px 0 8px 0;
  }
`;
