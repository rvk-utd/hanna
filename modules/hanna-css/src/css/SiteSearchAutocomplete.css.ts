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
    .SiteSearchAutocomplete__container {
      position: absolute;
      z-index: ${vars.zindex__overlay};
      top: 100%;
      left: 0;
      right: 0;
      padding: 0 ${vars.space_4};
      background: ${vars.color_suld_0};
      border: ${vars.border_default};

      height: 0;
      opacity: 0;
      transition: all 200ms ease-in;
      transition-property: height, opacity;
      overflow: hidden;
    }

    .SiteSearchAutocomplete__container--open {
      height: auto;
      opacity: 1;
      padding: ${vars.space_4} 0;
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
