import { css, em } from 'es-in-css';

import { between_cols } from '../lib/between';
import { grid } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';

import { ComponentLayout } from './styles/componentLayout';
import { SeenEffect__disallowNesting, SeenEffect__fadeup } from './utils/seenEffects';

// inlined by TextBlock
export const PageHeading_css = () => css`
  .PageHeading {
    ${SeenEffect__fadeup}
    ${SeenEffect__disallowNesting}
    ${ComponentLayout(false)}

    font: ${vars.font_hd_l};
    margin-top: ${between_cols(0, 3 * grid.unit)};
    margin-bottom: ${em(40 / 64)};
  }
  .PageHeading--small {
    font: ${vars.font_hd_m};
  }
`;

export default css`
  /*!@deps
    TextBlock
  */
  ${PageHeading_css}
`;
