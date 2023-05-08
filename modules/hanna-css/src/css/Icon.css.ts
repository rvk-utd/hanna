import { ObjectKeys } from '@reykjavik/hanna-utils';
import { css } from 'es-in-css';

import { buildVariables } from '../lib/cssutils.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { icons, iconStyle } from '../lib/icons.js';

const iconVariables = buildVariables(['Icon', 'Icon__size', 'Icon__enabled']);
const iVars = iconVariables.vars;
/** Opt-in to allowing the rendering of `data-icon=""` icons on `::before` */
export const enableDataIcon = iconVariables.override({
  Icon__enabled: 'initial',
});

const iconAfterVariables = buildVariables([
  'Icon_after',
  'Icon_after__size',
  'Icon_after__enabled',
]);
const iAVars = iconAfterVariables.vars;
/** Opt-in to allowing the rendering of `data-icon-after=""` icons on `::after` */
export const enableDataIconAfter = iconAfterVariables.override({
  Icon_after__enabled: 'initial',
});

// ---------------------------------------------------------------------------

export default css`
  @media screen {
    [data-icon] {
      // Reset icon name to prevent accidental bubbling
      // from ancestral \`data-icon=""\` attributes

      // NOTE: Add \`--Icon--enabled: initial;\`
      // to elements where you want to opt-in
      // to allow icons on ::before

      ${iconVariables.declare({
        Icon: 'none',
        Icon__size: 'inherit',
        Icon__enabled: 'none',
      })}
    }
    [data-icon]::before {
      ${iconStyle};
      // prettier-ignore
      content: ${iVars.Icon__enabled.or(iVars.Icon)};
      font-size: ${iVars.Icon__size};
      margin-right: ${vars.space_1};
    }

    // ---------------------------------------------------------------------------

    [data-icon-after] {
      // Reset icon name to prevent accidental bubbling
      // from ancestral \`data-icon-after=""\` attributes

      // NOTE: Add \`--Icon-after--enabled: initial;\`
      // to elements where you want to opt-in
      // to allow icons on ::after

      ${iconAfterVariables.declare({
        Icon_after: 'none',
        Icon_after__size: 'inherit',
        Icon_after__enabled: 'none',
      })}
    }
    [data-icon-after]::after {
      ${iconStyle};
      // prettier-ignore
      content: ${iAVars.Icon_after__enabled.or(iAVars.Icon_after)};
      font-size: ${iAVars.Icon_after__size};
      margin-left: ${vars.space_1$5};
    }

    // ===========================================================================

    // ===========================================================================

    ${ObjectKeys(icons).map((name) => {
      const iconVar = vars[`icon__${name}`];
      return css`
        [data-icon='${name}'] {
          --Icon: ${iconVar};
        }
        [data-icon-after='${name}'] {
          --Icon-after: ${iconVar};
        }
        \
      `;
    })}
  }
`;
