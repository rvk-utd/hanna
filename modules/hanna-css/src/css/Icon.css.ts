import { ObjectEntries } from '@reykjavik/hanna-utils';
import { css } from 'es-in-css';

import { _iconTokenList } from '../iconfontTokens.js';
import { buildVariables } from '../lib/cssutils.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { icons, IconSize, iconStyle } from '../lib/icons.js';

const filledTokens = _iconTokenList.filter((token) => token.endsWith('_filled'));

const iconVariables = buildVariables(['Icon', 'Icon__size', 'Icon__enabled']);
const iVars = iconVariables.vars;

/** Opt-in to allowing the rendering of `data-icon=""` icons on `::before` */
export const enableDataIcon = (size?: IconSize) =>
  iconVariables.override({
    Icon__enabled: 'initial',
    ...(size ? { Icon__size: vars[`icon_size__${size}`] } : undefined),
  });

const iconAfterVariables = buildVariables([
  'Icon_after',
  'Icon_after__size',
  'Icon_after__enabled',
]);
const iAVars = iconAfterVariables.vars;
/** Opt-in to allowing the rendering of `data-icon-after=""` icons on `::after` */
export const enableDataIconAfter = (size?: IconSize) =>
  iconAfterVariables.override({
    Icon_after__enabled: 'initial',
    ...(size ? { Icon_after__size: vars[`icon_size__${size}`] } : undefined),
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
        Icon: 'initial',
        Icon__size: vars.icon_size__medium,
        Icon__enabled: 'none',
      })}
    }
    ${filledTokens.map(
      (token_filled) => css`
        [data-icon='${token_filled}'] {
          ${iconVariables.override({
            Icon: `'${token_filled.replace(/_filled$/, '')}'`,
          })};
        }
      `
    )}
    [data-icon]::before {
      ${iconStyle};
      content: ${iVars.Icon__enabled.or(iVars.Icon.or(`attr(data-icon)`))};
      font-size: ${iVars.Icon__size};
      margin-right: ${vars.space_1};
    }
    [data-icon$='_filled']::before {
      font-variation-settings: 'FILL' 1;
    }

    [data-icon-size='small'] {
      ${iconVariables.override({ Icon__size: vars.icon_size__small })}
      ${iconAfterVariables.override({ Icon_after__size: vars.icon_size__small })}
    }
    [data-icon-size='large'] {
      ${iconVariables.override({ Icon__size: vars.icon_size__large })}
      ${iconAfterVariables.override({ Icon_after__size: vars.icon_size__large })}
    }

    // ---------------------------------------------------------------------------

    [data-icon-after] {
      // Reset icon name to prevent accidental bubbling
      // from ancestral \`data-icon-after=""\` attributes

      // NOTE: Add \`--Icon-after--enabled: initial;\`
      // to elements where you want to opt-in
      // to allow icons on ::after

      ${iconAfterVariables.declare({
        Icon_after: 'initial',
        Icon_after__size: vars.icon_size__medium,
        Icon_after__enabled: 'none',
      })}
    }
    ${filledTokens.map(
      (token_filled) => css`
        [data-icon-after='${token_filled}'] {
          ${iconAfterVariables.override({
            Icon_after: `'${token_filled.replace(/_filled$/, '')}'`,
          })};
        }
      `
    )}
    [data-icon-after]::after {
      ${iconStyle};
      content: ${iAVars.Icon_after__enabled.or(
        iAVars.Icon_after.or(`attr(data-icon-after)`)
      )};
      font-size: ${iAVars.Icon_after__size};
      margin-left: ${vars.space_1$5};
    }
    [data-icon-after$='_filled']::after {
      font-variation-settings: 'FILL' 1;
    }

    // ---------------------------------------------------------------------------

    /* Styling for the Icon component (which uses the 'data-icon' attributes styled above) */
    .Icon {
      ${enableDataIcon};
    }

    // ===========================================================================

    // ===========================================================================

    // Support old icon names for back-compatibility
    // with a couple of type-assertion hacks pushing officially unsupported icon
    // names into button components.

    /** @deprecated  (Remove in v0.9 or after 2027-01-01, whichever comes first) */
    ${ObjectEntries(icons) // eslint-disable-line deprecation/deprecation
      .map(([oldIcon, iconName]) => {
        const fillVariation = iconName.endsWith('_filled')
          ? (pos: string) =>
              css`
                &::${pos} {
                  font-variation-settings: 'FILL' 1;
                }
              `
          : () => undefined;

        return css`
          [data-icon='${oldIcon}'] {
            ${iconVariables.override({ Icon: `'${iconName}'` })}
            ${fillVariation('before')}
          }
          [data-icon-after='${oldIcon}'] {
            ${iconAfterVariables.override({ Icon_after: `'${iconName}'` })}
            ${fillVariation('after')}
          }
          /* ---- */
        `;
      })}
  }
`;
