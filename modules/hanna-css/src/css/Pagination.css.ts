import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';

export default css`
  /*!@deps
    ButtonPrimary
  */
  .ReactPaginate ul {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    list-style: none;
  }

  .ReactPaginate ul li a {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    height: 32px;
    padding: 0 11px;
    background: transparent;
    cursor: pointer;
    margin-right: 8px;
    border: 1px solid transparent;
    transition: color 150ms, background-color 150ms, border-color 150ms;
    color: #2a2b2c;
    font-weight: 500;
    font-size: 1em;
    border-radius: 2px;
  }

  .ReactPaginate ul li.selected a {
    background: ${vars.color_faxafloi_100};
    color: white;
  }

  /* =========================== Custom ======================= */
  .Pagination {
    display: flex;
    align-items: center;
    list-style: none;
    grid-gap: 5px;
  }

  .Pagination__button {
    padding: 0 11px;
    height: 32px;
  }

  .Pagination__button:not([disabled]):hover {
    background-color: ${vars.color_suld_50};
  }

  .Pagination__button--active {
    background-color: ${vars.color_faxafloi_100};
    color: white;
  }

  .Pagination__button--active:hover {
    background-color: ${vars.color_faxafloi_100};
  }

  .Pagination__button--back {
    &::before {
      ${iconStyle(vars.icon__chevron_left)}
      font-size: 12px;
    }
  }

  .Pagination__button--forward {
    &::before {
      ${iconStyle(vars.icon__chevron_right)}
      font-size: 12px;
    }
  }
`;
