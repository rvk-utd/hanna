import { css } from 'es-in-css';

import { mq } from '../lib/breakpoints.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';

import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('SiteSearchInput')}

  @media screen {
    .SiteSearchAutocomplete {
      position: relative;
    }
    .SiteSearchAutocomplete--open {
      z-index: ${vars.zindex__overlay};
    }

    .SiteSearchAutocomplete__container {
      position: absolute;
      z-index: -1;
      top: 100%;
      margin-top: -1px;
      left: 0;
      right: 0;
      padding: 0;
      background: ${vars.color_suld_0};
      border: ${vars.border_default};

      max-height: 0;
      opacity: 0;
      transition: all 300ms ease-in;
      transition-property: max-height, opacity;
      overflow: hidden;
      box-shadow: ${vars.boxShadow_elevated};
    }

    .SiteSearchAutocomplete__container--open {
      opacity: 1;
      max-height: 800px;
      padding: ${vars.space_1} 0;
    }

    .SiteSearchAutocomplete__item {
      font: ${vars.font_bd_l};
      padding: ${vars.space_2} ${vars.space_4};
      padding-right: ${vars.space_7};

      @media ${mq.phone_phablet} {
        padding-left: ${vars.space_2};
        padding-right: ${vars.space_4};
      }
    }

    .SiteSearchAutocomplete__item--highlighted {
      position: relative;
      cursor: pointer;
      color: ${vars.color_faxafloi_100};
      background-color: ${vars.color_suld_25};
    }
    .SiteSearchAutocomplete__item--highlighted::before {
      ${iconStyle(vars.icon__search)}
      color: ${vars.color_suld_100};
      float: right;
      font-size: ${vars.font_bd_s_size};
      width: ${vars.space_1$5};
      margin-right: ${vars.space_3__neg};
      margin-left: ${vars.space_1};

      @media ${mq.phone_phablet} {
        margin-right: ${vars.space_2__neg};
        margin-left: ${vars.space_0$5};
      }
    }
  }
`;
