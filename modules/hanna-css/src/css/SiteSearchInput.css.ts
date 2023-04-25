import { css, rem } from 'es-in-css';

import { between_phone_netbook } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';

import { FormFieldVariables } from './styles/forms.js';
import { srOnly } from '../lib/a11y.js';
import { hoverActiveKeyboardFocus_selector } from './utils/focus-selectors.js';
import { hideText_css } from './utils/hideText.js';
import { grid_units, prem } from './utils/miscUtils.js';

const ff = FormFieldVariables.vars;

export default css`
  /*!@deps
    FormField
  */

  @media screen {
    .SiteSearchInput {
      margin-bottom: ${grid_units(7)};
      // Changes as evident in the "Frontpage" Figma document
      // $ {FormFieldVariables.override({
      //   input__border_color: vars.color_suld_75,
      //   input__border_radius: 0,
      // })}
      --ssi-height: ${between_phone_netbook(64, 96)};
      @media ${mq.wide} {
        --ssi-height: 96px;
      }
    }
    .SiteSearchInput > .FormField__label {
      ${srOnly}
    }

    .SiteSearchInput > .FormField__input {
      padding: 0 var(--ssi-height) 0 0;
      height: auto;
    }
    .SiteSearchInput > .FormField__input > input {
      padding: ${between_phone_netbook(10, 26)} 0;
      padding-left: ${between_phone_netbook(16, 32)};

      @media ${mq.wide} {
        padding: 26px 0;
        padding-left: 32px;
      }
    }

    // .SiteSearchInput__input {
    // }

    .SiteSearchInput__button {
      ${hideText_css('soft')}
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      margin: ${prem(-1)};
      width: var(--ssi-height);
      height: var(--ssi-height);
      background-color: ${vars.color_faxafloi_100};
      border-radius: 0 ${ff.input__border_radius} ${ff.input__border_radius} 0;
      color: ${vars.color_suld_0};
    }
    .SiteSearchInput__button {
      ${hoverActiveKeyboardFocus_selector()(css`
        background-color: ${vars.color_faxafloi_150};
        color: ${vars.color_suld_0};
      `)}
    }
    .SiteSearchInput__button::before {
      ${iconStyle(vars.icon__search)}
      width: 100%;
      margin-right: 1px;
      font-size: ${rem(32 / 20)};
    }
  }
`;
