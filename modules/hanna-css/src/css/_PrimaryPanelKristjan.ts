import { css } from 'es-in-css';

import { mq } from '../lib/breakpoints';
import { cols_pct } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';

import { sr_only } from './utils/a11y';
import { grid_units, prem } from './utils/miscUtils';

export const PrimaryPanel_css = () => css`
  .PrimaryPanel {
    color: ${vars.color_suld_0};
    --link-color: _inherit;
    --link-color--hover: ${vars.color_suld_25};

    background-color: ${vars.MainMenu_background};
  }
  .PrimaryPanel__title {
    font-weight: ${vars.font_weight__bold};
    border-bottom: 1px solid ${vars.color_suld_75};

    margin-bottom: ${grid_units(3)};
    padding-bottom: ${grid_units(2)};
  }

  .MainMenu[data-sprinkled] .PrimaryPanel:not(.PrimaryPanel--active) {
    display: none;
  }

  // ===========================================================================

  @media ${mq.Hamburger} {
    .PrimaryPanel {
      padding-bottom: ${prem(24)};
      padding-left: var(--MainMenu--offsetLeft);
      padding-right: var(--MainMenu--offsetLeft);
    }

    .PrimaryPanel__title {
      font: ${vars.font_sh_s};
    }

    // .MainMenu[data-sprinkled] .PrimaryPanel__title {
    // 	@include sr-only();
    // }

    .PrimaryPanel__item {
      margin-bottom: ${prem(16)};
    }
    .PrimaryPanel__summary {
      ${sr_only}
    }
  }

  // ===========================================================================

  @media ${mq.Topmenu} {
    .PrimaryPanel {
      --PrimaryPanel-columns: 8;
      display: grid;
      align-content: flex-start;
      grid-template-columns: repeat(var(--PrimaryPanel-columns), minmax(0, 1fr));

      padding-top: ${vars.Layout$$header_height};
      padding-bottom: ${prem(125)}; // clear .MainMenu__megapanel__backtomenu
      grid-column: 2 / span 7;
      column-gap: ${vars.grid_gutter};
    }
    .PrimaryPanel--active {
    }

    .PrimaryPanel--twocol {
      grid-column: span var(--PrimaryPanel-columns);
    }

    .PrimaryPanel__title {
      margin-right: ${cols_pct(1, 0, { ofCols: 5 })};
      grid-column: span 5;
    }
    .PrimaryPanel--twocol .PrimaryPanel__title {
      grid-column: span var(--PrimaryPanel-columns);
      margin-right: ${cols_pct(1, 0, { ofCols: 8 })};
    }

    .PrimaryPanel__items {
      grid-column: span 4;
      padding-right: cols_pct(1, 0, 4);
    }
    .PrimaryPanel--twocol .PrimaryPanel__items {
      grid-column: span var(--PrimaryPanel-columns);
      display: grid;
      column-gap: ${vars.grid_gutter};
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding-right: 0;
    }

    .PrimaryPanel__item {
      margin-bottom: ${grid_units(3)};
    }
    .PrimaryPanel--twocol .PrimaryPanel__item {
      padding-right: ${cols_pct(1, 0, { ofCols: 4 })};
    }

    .PrimaryPanel__linkTitle {
      font: ${vars.font_bd_l};
    }

    .PrimaryPanel__summary {
      display: block;
      font-size: inherit; // override default <small> styling
      font-weight: ${vars.font_weight__normal};
    }
  }
`;
