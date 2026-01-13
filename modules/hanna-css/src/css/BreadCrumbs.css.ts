import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';
import { LinkStyle_Reset } from '../lib/links.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { hideText_css } from './utils/hideText.js';

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
      width: ${vars.space_3};
      margin: 0 ${vars.space_0$5__neg};
    }
    .BreadCrumbs__title + .BreadCrumbs__item::before {
      ${iconStyle('home', 'small')}
      font-size: 18px; /* Ragnar Freyr blessed this */
      width: 100%;
      margin-right: 1px;
    }

    // .BreadCrumbs__item[aria-current='true'] {
    // }

    .BreadCrumbs__separator {
      ${hideText_css('soft')}
      display: inline-block;
      width: ${vars.icon_size__small};
      margin: 0 -4px;
    }
    .BreadCrumbs__separator::before {
      ${iconStyle('chevron_forward', 'small')}
      /* TODO: Get updated design from Ragnar Freyr */
      font-size: ${vars.font_label_size};
      margin-top: 0.5px;
      margin-bottom: -0.5px;
      width: 100%;
      margin-right: 1px;
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
