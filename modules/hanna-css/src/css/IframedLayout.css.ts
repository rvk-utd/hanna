import { css } from 'es-in-css';

import { grid } from '../lib/grid.js';
import { WARNING__ } from '../lib/WARNING__.js';

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

  .Layout {
    ${WARNING__('`Layout` can not be used when `IframedLayout.css` is loaded')}
  }
  .WizardLayout {
    ${WARNING__('`WizardLayout` can not be used when `IframedLayout.css` is loaded')}
  }
`;
