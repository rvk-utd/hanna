import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { LinkStyle_Reset } from './styles/links.js';
import { hideText_css } from './utils/hideText.js';
import { prem } from './utils/miscUtils.js';

export default css`
  @media screen {
    .BreadCrumbs {
      color: ${vars.color_suld_150};
      font: ${vars.font_label};
    }

    .Layout__nav .BreadCrumbs {
      position: absolute;
      top: ${vars.Layout$$header_height};
      transform: translateY(-33%);
      left: 0;
      max-width: 100%;
    }

    .BreadCrumbs__title {
      display: none; // ok as aria-label/aria-labelledby is also required!
    }

    .BreadCrumbs__item {
      display: inline-block;
      vertical-align: top;
      font-weight: 400;
    }
    .BreadCrumbs__item:not(:last-child) {
      ${LinkStyle_Reset}
    }

    .BreadCrumbs__title + .BreadCrumbs__item {
      ${hideText_css('soft')}
      width: ${prem(25)};
      margin: 0 ${prem(-5)};
    }
    .BreadCrumbs__title + .BreadCrumbs__item::before {
      ${iconStyle(vars.icon__home)}
      width: 100%;
      margin-right: 1px;
      font-size: ${prem(14)};
    }

    // .BreadCrumbs__item[aria-current='true'] {
    // }

    .BreadCrumbs__separator {
      ${hideText_css('soft')}
      display: inline-block;
      width: ${prem(13)};
    }
    .BreadCrumbs__separator::before {
      ${iconStyle(vars.icon__chevron_soft_right)}
      width: 100%;
      margin-right: 1px;
      font-size: ${prem(5)};
    }

    /* ------------------------------------------------------------------------ */

    .BreadCrumbs__item:last-child:not([aria-current='true']) {
      ${WARNING__('You forgot aria-current="true"')};
    }
    .BreadCrumbs:not(nav) {
      ${WARNING__('Please use <nav/>')};
    }
    .BreadCrumbs:not([aria-label]):not([aria-labelledby]) {
      ${WARNING__('Please add `aria-label` or `aria-labelledby`')};
    }
    .BreadCrumbs[aria-labelledby] > .BreadCrumbs__title:not([id]) {
      ${WARNING__('Please add `id` attribute')};
    }
  }
`;
