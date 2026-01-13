import { css } from 'es-in-css';

import { mq } from '../lib/breakpoints.js';
import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars.js';
import { iconContent, iconStyle } from '../lib/icons.js';
import { LinkStyle_Reset } from '../lib/links.js';

import { grid_units } from './utils/miscUtils.js';

export default css`
  @media screen {
    .RelatedLinks {
      margin-bottom: ${vars.baseVerticalMargin};
    }
    .RelatedLinks__title {
      font-size: ${vars.font_body_l_size};
      line-height: ${vars.font_body_l_leading};
      font-weight: ${vars.font_weight__bold};
      color: ${vars.color_suld_150};
      margin-bottom: ${grid_units(1)};
    }
    .RelatedLinks__list {
      display: flex;
      flex-flow: row wrap;
      margin-right: calc(${vars.grid_gutter__neg} - 1px);
    }
    .RelatedLinks__item {
      margin-top: ${grid_units(1)};
      margin-bottom: ${grid_units(2)};
      margin-right: ${vars.grid_gutter};
      width: ${vars.grid_12};
      min-width: 250px;

      @media ${mq.phablet_tablet} {
        width: ${vars.grid_6};
      }
      @media ${mq.netbook_up} {
        width: ${vars.grid_4};
      }
    }
    .RelatedLinks__link {
      ${LinkStyle_Reset(true)}
      ${hannaVarOverride({
        link_color: vars.color_faxafloi_100,
      })}
      position: relative;
      display: block;
      background-color: ${vars.color_suld_25};
      text-decoration: none;
      padding: ${grid_units(2)} ${grid_units(3)};
      padding-left: ${grid_units(7)};
      outline: 1px solid transparent;
    }
    .RelatedLinks__link:hover {
      outline: 1px solid currentColor;
    }
    .RelatedLinks__link::before {
      ${iconStyle('link')}
      position: absolute;
      left: ${grid_units(2)};
    }

    .RelatedLinks__link[target]::before {
      ${iconContent('open_in_new')}
    }
    // exclude taget="_self" without increasing selector specificity
    .RelatedLinks__link:not([target='_self'])::before {
      ${iconContent('link')}
    }

    .RelatedLinks__link[href$='.pdf']::before,
    .RelatedLinks__link[href*='.pdf?']::before,
    .RelatedLinks__link[data-type='pdf']::before {
      ${iconContent('picture_as_pdf')}
    }
    .RelatedLinks__link[data-type='document']::before {
      ${iconContent('docs')}
    }
    .RelatedLinks__link[data-type='external']::before {
      ${iconContent('open_in_new')}
    }
  }
`;
