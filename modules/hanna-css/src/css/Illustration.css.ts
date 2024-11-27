import { css } from 'es-in-css';

import { mq } from '../lib/breakpoints.js';
import { isDevMode } from '../lib/cssutils.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('RowBlockColumn')}

  @media screen {
    .Illustration {
      display: block;
      margin: 0 ${vars.grid_gutter__neg};
      margin-bottom: ${vars.grid_1};
    }
  }

  @media ${mq.phone_phablet} {
    .Illustration > img {
      max-width: 500px;
      // margin: auto; // looks better left-aligned
    }
  }

  @media ${mq.tablet_up} {
    .Illustration {
      z-index: -1;
      margin: ${vars.grid_gutter__neg};
      position: relative;
      padding-top: 67%;
      min-height: 100%;
    }
    .Illustration > img {
      pointer-events: initial;
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      transform: translateY(-50%);
    }
  }

  // ===========================================================================

  @media screen {
    .RowBlockColumn--background .Illustration {
      ${WARNING__('Do not use inside `.RowBlockColumn--background`')};
      ${isDevMode &&
      css`
        z-index: 1;
      `}
    }
  }
`;
