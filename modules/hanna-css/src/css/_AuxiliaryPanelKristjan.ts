import { css, pct } from 'es-in-css';

import { mq } from '../lib/breakpoints';
import { cols_pct } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';

import { grid_units, prem } from './utils/miscUtils';

export const AuxiliaryPanel_css = () => css`
  @media screen {
    .AuxiliaryPanel {
      color: ${vars.MainMenu_accentcolor};
      --link-color: _inherit;
      --link-color--hover: ${vars.MainMenu_accentcolor};
      --link-weight: ${vars.font_weight__normal};
    }

    .AuxiliaryPanel__title {
      font-weight: ${vars.font_weight__bold};

      border-bottom: 1px solid ${vars.color_suld_100};
      // TODO: Check if value is right
      margin-right: ${cols_pct(1, 0, { ofCols: 4 })};
      margin-bottom: ${grid_units(3)};
      padding-bottom: ${grid_units(2)};
    }
  }

  // ===========================================================================

  // ===========================================================================

  @media ${mq.Hamburger} {
    .AuxiliaryPanel {
      position: relative;
      background-color: ${vars.color_suld_25};
      padding-top: ${grid_units(4)};
      padding-bottom: percentage(125 / 325);
      flex-grow: 1;

      margin-left: $var--grid-margin--neg;
      margin-right: $var--grid-margin--right--neg;
      padding-left: calc(#{$var--grid-margin} + var(--MainMenu--offsetLeft));
      padding-right: calc(#{$var--grid-margin--right} + var(--MainMenu--offsetLeft));
    }

    .AuxiliaryPanel__title {
      @include SubheadingStyle--small();
      padding-bottom: grid-units(1);
      margin-bottom: grid-units(2);
      margin-right: 0;

      max-width: percentage(140/365);
      min-width: prem(140);
    }

    .AuxiliaryPanel__items {
      margin-bottom: grid-units(4);
    }
    .AuxiliaryPanel__item {
      margin-bottom: grid-units(1.5);
    }

    .AuxiliaryPanel::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      background: 50% 100% / contain repeat-x;
      background-image: url('/assets/valmundur-a-sundi.png');
      mix-blend-mode: multiply;
      // TODO: Check if value is right
      padding-top: ${pct(115 / 325)};
    }

    html.menu-is-open .AuxiliaryPanel::after {
      transition: visibility 0s linear, opacity 600ms 200ms;
    }
    html.menu-is-closed .AuxiliaryPanel::after {
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s 300ms linear, opacity 300ms;
    }
  }

  // ===========================================================================

  // ===========================================================================

  @media ${mq.Topmenu} {
    .AuxiliaryPanel {
      grid-column: span 4;

      padding-top: ${vars.Layout$$header_height};
      padding-left: ${vars.grid_1_1};
    }

    .AuxiliaryPanel::after {
      content: '';

      background: 50% 0 / auto 305px no-repeat;
      background-image: var(--menu-auxiliary-image);

      margin: ${prem(40)} 0;
      display: block;
      height: 305px;
    }

    .AuxiliaryPanel__items {
      // TODO: Check if value is right
      margin-right: ${cols_pct(1, 0, { ofCols: 4 })};
    }
    .AuxiliaryPanel__item {
      // TODO: Check if value is right
      margin-bottom: ${prem(8)};
    }
  }
`;
