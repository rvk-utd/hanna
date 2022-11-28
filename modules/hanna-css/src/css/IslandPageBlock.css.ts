import { css } from 'es-in-css';

import { between_cols } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { hannaVars as vars } from '../lib/hannavars';

import { ButtonTertiaryStyle } from './styles/buttons';
import { extendBackgroundWithUnderlay } from './utils/miscUtils';
import { SeenEffect__fadeup } from './utils/seenEffects';

export default css`
  @media screen {
    .IslandPageBlock {
      ${SeenEffect__fadeup}
      margin-bottom: ${between_cols(40, 133)};
      display: flex;
      flex-flow: column-reverse;
      justify-content: space-between;
      align-items: center;
    }
    @media ${mq.tablet_up} {
      .IslandPageBlock {
        flex-flow: row;
      }
      .IslandPageBlock--align--right {
        flex-flow: row-reverse;
      }
    }

    .IslandPageBlock__content {
      padding: ${vars.space_2} 0;

      @media ${mq.tablet_up} {
        width: ${vars.grid_6};
      }
    }
    .IslandPageBlock__image {
      margin: 0 ${vars.grid_0_1__neg};

      @media ${mq.phone_phablet} {
        max-width: 400px;
        align-self: flex-start;
        margin-bottom: ${vars.space_2};
      }
      @media ${mq.tablet_up} {
        width: calc(${vars.grid_6_6} + ${vars.grid_0_1});
      }
    }

    .IslandPageBlock__title {
      font: ${vars.font_hd_s};
      margin-bottom: ${vars.space_3};
    }

    .IslandPageBlock__summary {
      font: ${vars.font_bd_l};
      margin-bottom: ${vars.space_3};
    }
    .IslandPageBlock__button {
      ${ButtonTertiaryStyle}
      display: block;
    }

    // Background variant. ------------------------------------------------------

    .IslandPageBlock--background--gray,
    .IslandPageBlock--background--secondary {
      ${extendBackgroundWithUnderlay}
      padding: ${between_cols(30, 48)} 0;
      background-color: ${vars.color_suld_25};
    }
    .IslandPageBlock--background--secondary {
      background-color: ${vars.theme_color_secondary_25};
    }
  }
`;
