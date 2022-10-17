import { css, em } from 'es-in-css';

import { between_phone_netbook } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { cols_px } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';
import { WARNING__ } from '../lib/WARNING__';

import { freezeScroll_css } from './styles/header';
import { prem } from './utils/miscUtils';
import { hideText_css } from './utils/scssutils/hideText';

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
      padding: ${between_phone_netbook(20, 100)} 0;

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
      max-width: ${cols_px(8)};

      --Modal--paddingV: ${vars.grid_1};
      --Modal--paddingH: ${vars.grid_1};

      position: relative;
      width: 95%;
      margin: 0 auto;
      padding: var(--Modal--paddingV) var(--Modal--paddingH);
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
        --Modal--paddingH: ${vars.grid_0_1};
      }
    }
    .Modal--w8 {
      max-width: ${cols_px(8)};
    }
    .Modal--w10 {
      max-width: ${cols_px(10)};

      @media ${mq.netbook_up} {
        --Modal--paddingH: ${vars.grid_1_1};
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
      margin: var(--Modal--paddingV) calc(0.5 * var(--Modal--paddingH));
    }

    // @deprecated  Remove this selector in v0.9
    .Modal__blings > :not(.Bling):not(.Modal__blings__inner) {
      ${WARNING__('Only place .Bling content inside .Modal__blings')};
    }
    // // FIXME: Enable this instead in v0.9
    // .Modal__blings > not(.Modal__blings__inner) {
    //   @include WARNING__('Only place .Modal__blings__inner inside .Modal__blings');
    // }
    .Modal__blings__inner > :not(.Bling) {
      ${WARNING__('Only place .Bling content inside .Modal__blings')};
    }

    .Modal__closebutton {
      ${hideText_css()}
      display: block;
      position: absolute;
      z-index: 5;
      top: ${vars.grid_1};
      right: ${vars.grid_1};
      color: ${vars.color_suld_200};
      font-size: ${between_phone_netbook(36, 64)};
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
