import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';

import { prem } from './utils/miscUtils';

export default css`
  /*!@deps
    SiteSearchInput
  */
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
      padding: ${prem(16)} ${prem(45)} ${prem(16)} ${prem(32)};
      font: ${vars.font_bd_l};
    }

    .SiteSearchAutocomplete__item--highlighted {
      position: relative;
      cursor: pointer;
      color: ${vars.color_faxafloi_100};
      background-color: ${vars.color_suld_25};
    }
    .SiteSearchAutocomplete__item--highlighted::after {
      ${iconStyle(vars.icon__search)}
      color: ${vars.color_suld_100};
      float: right;
      margin-left: ${vars.space_2};
      font-size: ${prem(16)};
    }
  }
`;
