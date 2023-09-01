import { css, em } from 'es-in-css';

import { scale_container } from '../lib/between.js';
import { grid } from '../lib/grid.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { ComponentLayout } from './styles/componentLayout.js';
import { SeenEffect__disallowNesting, SeenEffect__fadeup } from './utils/seenEffects.js';

export default css`
  /*!@deps
    TextBlock
  */
`;

// inlined by TextBlock.css.ts
export const PageHeading_css = () => css`
  .PageHeading {
    ${SeenEffect__fadeup}
    ${SeenEffect__disallowNesting /* eslint-disable-line deprecation/deprecation */}
    ${ComponentLayout(false)}

    font: ${vars.font_hd_l};
    margin-top: ${scale_container(0, 3 * grid.unit)};
    margin-bottom: ${em(40 / 64)};
  }
  .PageHeading--small {
    font: ${vars.font_hd_m};
  }
`;
