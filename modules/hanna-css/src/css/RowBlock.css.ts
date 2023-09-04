import { css, ms } from 'es-in-css';

import { mq } from '../lib/breakpoints.js';
import { hannaVars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

import {
  SeenEffect__fadeup,
  SeenEffect__resetDefault,
  SeenEffect__transition,
} from './utils/seenEffects.js';
import { RowBlockColumn_css } from './RowBlockColumn.css.js';

export const RowBlock__seenEffects = (trigger?: null | string) => css`
  ${SeenEffect__fadeup({ child: '> .RowBlockColumn', trigger })}
  ${SeenEffect__transition({ child: '> .RowBlockColumn + .RowBlockColumn', trigger })(css`
    transition-delay: ${ms(100)};
  `)}
`;

// ---------------------------------------------------------------------------

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
    }

    * {
      /* Custom (optional) transition effect */
      ${SeenEffect__resetDefault('.RowBlock')}
      ${RowBlock__seenEffects()}
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
