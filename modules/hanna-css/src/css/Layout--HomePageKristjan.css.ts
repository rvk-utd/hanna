import { css } from 'es-in-css';

import { between_cols, between_container } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';

import { grid_units, prem } from './utils/miscUtils';

export default css`
  /*!@deps
    Layout-full
  */

  @media screen {
    .Layout--HomePage .RowBlock {
      margin-bottom: ${between_cols(70, 200)};
    }

    // ---------------------------------------------------------------------------

    .ScrollCTA {
      display: none;
      margin-top: ${between_container(-30, -80)};
      margin-bottom: ${between_container(30, 210)};
      // TODO: FIND font-size-12
      // font-size: $font-size-12;
      // font-weight: $font-weight--bold;

      @media ${mq.tablet_up} {
        display: block;
      }
    }
    .ScrollCTA::after {
      ${iconStyle(vars.icon__chevron_down)}
      display: block;
      margin-top: ${prem(6)};
      width: 1em;
      height: 1em;
      line-height: 1em;
      color: ${vars.color_faxafloi_100};
    }

    // ---------------------------------------------------------------------------

    .Layout--HomePage .GridBlocks {
      margin-bottom: ${between_cols(40, 170)};
    }

    // ---------------------------------------------------------------------------

    .Layout--HomePage .ExtraLinks::before {
      border-left: 0;
    }

    .Layout--HomePage .ExtraLinks__card {
      border-color: transparent;
      background-color: ${vars.color_suld_0};
      --Card-lineColor: ${vars.color_faxafloi_100};
      padding-top: ${prem(40)};
      padding-bottom: ${prem(40)};
    }
    .Layout--HomePage .ExtraLinks__card::after {
      margin-top: ${grid_units(4)};
      height: ${prem(4)};
      max-width: 67%;
    }
    .ExtraLinks__card:hover,
    .ExtraLinks__card:active {
      border-color: transparent;
      background-color: ${vars.color_suld_0};
      color: inherit;
      outline: normal;
    }
    .ExtraLinks__card:hover > .ExtraLinks__card__title,
    .ExtraLinks__card:active > .ExtraLinks__card__title {
      color: ${vars.color_faxafloi_100};
    }
  }
`;
