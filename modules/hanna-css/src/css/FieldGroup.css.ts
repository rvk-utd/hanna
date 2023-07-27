import { css } from 'es-in-css';

import { scale_container } from '../lib/between.js';
import { buildVariables } from '../lib/cssutils.js';
import { hannaVars as vars } from '../lib/hannavars.js';

const FieldGroupVariables = buildVariables(['legendSize', 'legendMargin'], 'FieldGroup');
const fgVars = FieldGroupVariables.vars;

export default css`
  @media screen {
    .FieldGroup {
      margin-bottom: ${scale_container(30, 70)};
      ${FieldGroupVariables.declare({
        legendSize: vars.font_sh_l,
        legendMargin: vars.space_2,
      })}
    }
    .FieldGroup--small {
      ${FieldGroupVariables.override({
        legendSize: vars.font_sh_s,
        legendMargin: vars.space_1,
      })}
    }
    .FieldGroup__legend {
      font: ${fgVars.legendSize};
      margin-bottom: ${fgVars.legendMargin};
    }
  }
`;
