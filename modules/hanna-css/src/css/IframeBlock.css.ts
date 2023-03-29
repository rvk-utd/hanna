import { css } from 'es-in-css';

import { mq } from '../lib/breakpoints.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { prem } from './utils/miscUtils.js';

export default css`
  @media screen {
    .IframeBlock {
      margin-bottom: ${prem(30)}; // like BasicTable (need reconsidering)

      // width/min-width hack recommended by https://github.com/davidjbradshaw/iframe-resizer-react
      width: 1px;
      min-width: 100%;
    }
    .IframeBlock--compact {
      margin-bottom: 0;
    }
    .IframeBlock--framed {
      box-shadow: 0 0 0 2px ${vars.color_suld_100};
    }
    .IframeBlock--align--right {
      @media ${mq.tablet_up} {
        margin-left: auto;
        min-width: ${vars.grid_7}; // tolerate containment by right-aligned TextBlock, for instance
      }
    }
  }
`;
