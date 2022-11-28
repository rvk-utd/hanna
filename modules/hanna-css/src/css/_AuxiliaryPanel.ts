import { css, pct_f } from 'es-in-css';

import { mq } from '../lib/breakpoints';
import { cols_pct } from '../lib/grid';
import { hannaVars as vars, linkVars } from '../lib/hannavars';

import { grid_units, prem } from './utils/miscUtils';

export const AuxiliaryPanel_css = () => css`
  @media screen {
    .AuxiliaryPanel {
      color: ${vars.MainMenu_accentcolor};
      ${linkVars.override({
        link_color: '_inherit',
        link_color__hover: vars.MainMenu_accentcolor,
        link_weight: vars.font_weight__normal,
      })}
    }

    .AuxiliaryPanel__title {
      font-weight: ${vars.font_weight__bold};

      border-bottom: 1px solid ${vars.color_suld_100};
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
      padding-top: ${vars.space_4};
      padding-bottom: ${pct_f(125 / 325)};
      flex-grow: 1;

      margin-left: ${vars.grid_margin__neg};
      margin-right: ${vars.grid_margin__right__neg};
      padding-left: calc(${vars.grid_margin} + var(--MainMenu--offsetLeft));
      padding-right: calc(${vars.grid_margin__right} + var(--MainMenu--offsetLeft));
    }

    .AuxiliaryPanel__title {
      font: ${vars.font_sh_s};
      padding-bottom: ${vars.space_1};
      margin-bottom: ${vars.space_2};
      margin-right: 0;

      max-width: ${pct_f(140 / 365)};
      min-width: ${prem(140)};
    }

    .AuxiliaryPanel__items {
      margin-bottom: ${vars.space_4};
    }
    .AuxiliaryPanel__item {
      margin-bottom: ${vars.space_1$5};
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
      padding-top: ${pct_f(115 / 325)};
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
      margin-right: ${cols_pct(1, 0, { ofCols: 4 })};
    }
    .AuxiliaryPanel__item {
      margin-bottom: ${prem(8)};
    }
  }
`;
