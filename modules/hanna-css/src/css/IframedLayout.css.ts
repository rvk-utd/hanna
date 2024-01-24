import { css } from 'es-in-css';

import { grid } from '../lib/grid.js';

import { prem } from './utils/miscUtils.js';

export default css`
  body {
    padding: 0;
  }

  .IframedLayout {
    min-height: 100vh;
    width: 100%;
    max-width: ${prem(grid.contentMaxWidth)};
    margin: 0 auto;
    position: relative;
  }
`;
