import { color, css } from 'es-in-css';

import { mq } from '../lib/breakpoints.js';
import { colors } from '../lib/colors.js';
import { hannaVars as vars } from '../lib/hannavars.js';

import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('SiteSearchAutocomplete')}

  @media screen {
    .SiteSearchCurtain {
      position: relative;
      z-index: ${vars.zindex__overlay};
    }

    @media ${mq.tablet_up} {
      .SiteSearchCurtain > .SiteSearchAutocomplete {
        width: 100%;
        transition: width 200ms ease-in;
      }
      .SiteSearchCurtain--focused > .SiteSearchAutocomplete {
        width: ${vars.grid_7_7};
      }
    }

    .SiteSearchCurtain::after {
      content: '';
      position: fixed;
      z-index: -1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      background-color: ${color(colors.suld_0).alpha(0.9)};

      opacity: 0;
      visibility: hidden;
      transition: opacity 200ms ease-in, visibility 0ms 200ms;
    }
    .SiteSearchCurtain--focused::after {
      pointer-events: auto;
      transition-delay: 0ms;
      visibility: visible;
      opacity: 1;
    }
  }
`;
