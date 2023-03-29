import { css } from 'es-in-css';

import { mq } from '../lib/breakpoints.js';
import { cols_pct } from '../lib/grid.js';
import { WARNING__ } from '../lib/WARNING__.js';

export default css`
  // @deprecated  Remove this module in v0.9
  @media ${mq.tablet_up} {
    [class].experimental_Columnized {
      column-count: 2;
      column-gap: ${cols_pct(0, 1, { ofCols: 8 })};

      ${WARNING__(
        'Deprecated: `.experimental_Columnized` will be removed in next version'
      )};
    }
    [class].experimental_Columnized li {
      break-inside: avoid;
    }
  }
`;
