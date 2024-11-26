import { css, rem } from 'es-in-css';

import { hoverKeyboardFocusAndActiveStyling, srOnly } from '../lib/a11y.js';
import { clamp_phone_netbook } from '../lib/between.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';
import { formFieldVars as ff } from '../lib/otherTokens.js';

import { hideText_css } from './utils/hideText.js';
import { DEPS, grid_units, prem } from './utils/miscUtils.js';

export default css`
  ${DEPS('FormField')}

  @media screen {
    .SiteSearchInput {
      margin-bottom: ${grid_units(7)};
      // Changes as evident in the "Frontpage" Figma document
      // $ {FormFieldVariables.override({
      //   input__border_color: vars.color_suld_75,
      //   input__border_radius: 0,
      // })}
      --ssi-height: ${clamp_phone_netbook(64, 96)};
    }
    .SiteSearchInput > .FormField__label {
      ${srOnly}
    }

    .SiteSearchInput > .FormField__input {
      padding: 0;
      height: auto;
    }
    .SiteSearchInput > .FormField__input > input {
      padding: ${clamp_phone_netbook(10, 26)} 2px;
      padding-left: ${clamp_phone_netbook(16, 32)};
      border-right: var(--ssi-height) solid transparent;
    }

    // .SiteSearchInput__input {
    // }

    .SiteSearchInput > .FormField__input::after,
    .SiteSearchInput__button {
      ${hideText_css('soft')}
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      margin: ${prem(-1)};
      width: var(--ssi-height);
      height: var(--ssi-height);
      line-height: var(--ssi-height);
      border: solid ${prem(2)} transparent;
      border-radius: 0 ${ff.input__border_radius} ${ff.input__border_radius} 0;
    }
    .SiteSearchInput > .FormField__input::after {
      color: ${vars.color_suld_100};
      background-color: ${vars.color_suld_0};
      background-clip: padding-box;
      pointer-events: none;
    }
    .SiteSearchInput__button {
      z-index: 1;
      background-color: ${vars.color_faxafloi_100};
      color: ${vars.color_suld_0};
    }
    .SiteSearchInput__button {
      ${hoverKeyboardFocusAndActiveStyling(css`
        background-color: ${vars.color_faxafloi_150};
        color: ${vars.color_suld_0};
      `)}
    }
    .SiteSearchInput > .FormField__input::after,
    .SiteSearchInput__button::before {
      ${iconStyle(vars.icon__search)}
      font-size: ${rem(32 / 20)};
    }
    .SiteSearchInput__button::before {
      width: 100%;
      margin-right: 1px;
    }
  }
`;
