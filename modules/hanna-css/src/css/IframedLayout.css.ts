import { css } from 'es-in-css';

import { grid } from '../lib/grid.js';

import { prem } from './utils/miscUtils.js';

export default css`
  .IframedLayout {
    /* Must not be set to 100vh lest the iframe can't auto-reduce its height. */
    /* min-height: 100vh; */
    width: 100%;
    max-width: ${prem(grid.contentMaxWidth)};
    margin: 0 auto;
    position: relative;
  }
`;
