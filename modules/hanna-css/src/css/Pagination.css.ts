import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';

import { ButtonStyle, ButtonVariables } from './styles/buttons';

const _colorWhite = vars.color_white;
const _colorBlack = vars.color_blackish;

export default css`
  /*!@deps
    ButtonPrimary
  */

  .Pagination {
    display: flex;
    align-items: center;
    list-style: none;
    grid-gap: 5px;
  }

  .Pagination__button {
    ${ButtonStyle};
    ${ButtonVariables.override({
      backgroundColor: _colorWhite,
      textColor: _colorBlack,
      height: vars.space_4,
    })}
    padding: 0 15px;
    min-width: auto;
    margin: 0;
  }

  .Pagination__button:not([disabled], .Pagination__button--active):hover {
    background-color: ${vars.color_suld_50};
    box-shadow: none;
  }

  .Pagination__button:disabled:active {
    background-color: ${_colorWhite};
    color: ${_colorBlack};
  }

  .Pagination__button--active {
    background-color: ${vars.color_faxafloi_100};
    color: ${_colorWhite};
  }

  .Pagination__button--active:focus-visible,
  .Pagination__button--active:hover {
    color: ${_colorWhite};
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
