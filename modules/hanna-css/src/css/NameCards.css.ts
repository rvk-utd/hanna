import { css } from 'es-in-css';

import { mq } from '../lib/breakpoints';
import { cols_pct } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';

export default css`
  /*!@deps
    NameCard
  */
  @media screen {
    .NameCards {
      display: grid;
      column-gap: ${vars.grid_gutter};

      @media ${mq.phablet_tablet} {
        grid-template-columns: repeat(auto-fill, ${cols_pct(6)});
      }
      @media ${mq.netbook_up} {
        grid-template-columns: repeat(auto-fill, ${cols_pct(4)});
      }
    }
  }
`;
