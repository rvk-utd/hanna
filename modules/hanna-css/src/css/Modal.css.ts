import { css, em } from 'es-in-css';

import { scale_phone_netbook } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { buildVariables } from '../lib/cssutils.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { freezeScroll_css } from './styles/header.js';
import { hideText_css } from './utils/hideText.js';
import { cols_px, prem } from './utils/miscUtils.js';

const ModalVariables = buildVariables(['paddingV', 'paddingH'], 'Modal');
const mVars = ModalVariables.vars;

export default css`
  @media screen {
    html.modal-open {
      ${freezeScroll_css({ hideAlerts: false })}
    }

    .Modalwrapper {
      position: fixed;
      z-index: ${vars.zindex__modal};
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-y: auto;
      background-color: rgba(0, 0, 0, 0.5);
      padding: ${scale_phone_netbook(20, 100)} 0;

      transition: all 200ms ease-in;
      transition-property: opacity, visibility;

      @media ${mq.wide} {
        padding: ${prem(100)} 0;
      }
    }

    [hidden].Modalwrapper {
      display: block; // override default '[hidden][hidden]' styling
      visibility: hidden;
      opacity: 0;
    }

    .Modal {
      ${ModalVariables.declare({
        paddingV: vars.grid_1,
        paddingH: vars.grid_1,
      })}

      max-width: ${cols_px(8)};
      position: relative;
      width: 95%;
      margin: 0 auto;
      padding: ${mVars.paddingV} ${mVars.paddingH};
      background-color: #fff;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);

      transition: all 200ms ease-in;
      transform: translateY(0);
      opacity: 1;
    }
    [hidden].Modalwrapper > .Modal {
      transform: translateY(-25%);
      opacity: 0;
    }

    .Modal--w6 {
      max-width: ${cols_px(6)};

      @media ${mq.tablet_up} {
        ${ModalVariables.override({
          paddingH: vars.grid_0_1,
        })}
      }
    }
    .Modal--w8 {
      max-width: ${cols_px(8)};
    }
    .Modal--w10 {
      max-width: ${cols_px(10)};

      @media ${mq.netbook_up} {
        ${ModalVariables.override({
          paddingH: vars.grid_1_1,
        })}
      }
    }

    .Modal > :first-child {
      margin-top: 0;
    }

    .Modal__blings {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      overflow: clip;
      pointer-events: none;
    }
    .Modal__blings__inner {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: ${mVars.paddingV} calc(0.5 * ${mVars.paddingH});
    }

    // @deprecated  Remove this selector in v0.9
    .Modal__blings > :not(.Bling):not(.Modal__blings__inner) {
      ${WARNING__('Only place .Bling content inside .Modal__blings')};
    }
    /*
      // FIXME: Enable this instead in v0.9
      .Modal__blings > not(.Modal__blings__inner) {
        $ {WARNING__('Only place .Modal__blings__inner inside .Modal__blings')};
      }
    */

    .Modal__blings__inner > :not(.Bling) {
      ${WARNING__('Only place .Bling content inside .Modal__blings')};
    }

    .Modal__closebutton {
      ${hideText_css('soft')}
      display: block;
      position: absolute;
      z-index: 5;
      top: ${vars.grid_1};
      right: ${vars.grid_1};
      color: ${vars.color_suld_200};
      font-size: ${scale_phone_netbook(36, 64)};
      margin: -0.4em;
      width: 1em;
      height: 1em;
      line-height: 1em;
      transition: all 150ms ease-in;

      @media ${mq.wide} {
        font-size: 64px;
      }
    }
    .Modal__closebutton::before {
      ${iconStyle(vars.icon__close)}
      font-size: ${em(26 / 64)};
      width: 100%;
      margin-right: 1px;
    }
    .Modal__closebutton:hover {
      transform: scale(1.2);
    }
  }
`;
