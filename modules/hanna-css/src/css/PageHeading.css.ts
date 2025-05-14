import { css, em } from 'es-in-css';

import { scale_container } from '../lib/between.js';
import { grid } from '../lib/grid.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { ComponentLayout } from './styles/componentLayout.js';
import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('TextBlock')}
`;

// inlined by TextBlock.css.ts
export const PageHeading_css = () => css`
  .PageHeading {
    ${ComponentLayout(false)}

    font: ${vars.font_heading_xl};
    margin-top: ${scale_container(0, 3 * grid.unit)};
    margin-bottom: ${em(40 / 64)};
  }
  .PageHeading--small {
    font: ${vars.font_heading_l};
  }
`;
