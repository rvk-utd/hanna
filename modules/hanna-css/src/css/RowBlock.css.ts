import { css, ms } from 'es-in-css';

import { mq } from '../lib/breakpoints.js';
import { hannaVars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

import {
  SeenEffect__delay,
  SeenEffect__fadeup,
  SeenEffect__transition,
} from './utils/seenEffects.js';

import { RowBlockColumn_css } from './RowBlockColumn.css';

export default css`
  /*!@deps
    RowBlockColumn
  */
  @media screen {
    .RowBlock {
      margin-bottom: ${hannaVars.component_vspace__large};
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      align-items: center;
      ${SeenEffect__fadeup('> .RowBlockColumn')}

      ${SeenEffect__transition('> .RowBlockColumn + .RowBlockColumn')(css`
        ${SeenEffect__delay(ms(100))}
      `)}
    }

    @media ${mq.tablet_up} {
      .RowBlock {
        flex-flow: row;
      }
      .RowBlock--align--right {
        flex-flow: row-reverse;
      }
    }

    // ===========================================================================

    .RowBlock > .RowBlockColumn:nth-child(n + 3) {
      ${WARNING__('Only two `RowBlockColumn`s allowed here')};
    }
    .RowBlock > .RowBlockColumn:first-child:last-child {
      ${WARNING__('Two `RowBlockColumn`s are required')};
    }
    .RowBlock > :not(.RowBlockColumn) {
      ${WARNING__('Only `RowBlockColumn`s allowed here')};
    }
  }

  // ===========================================================================
  // Inline conjoined component for better
  // compression and loading speed
  ${RowBlockColumn_css}
`;
