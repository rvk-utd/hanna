import { css } from 'es-in-css';

import { mq } from '../lib/breakpoints.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { cols_pct, DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('NameCard')}

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
