import { css } from 'es-in-css';

import { mq } from '../lib/breakpoints.js';
import { buildVariables } from '../lib/cssutils.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle, iconToken } from '../lib/icons.js';

import { DEPS } from './utils/miscUtils.js';

const AsSVariables = buildVariables(['action_icon'], 'AutosuggestSearch');
const asSVars = AsSVariables.vars;

export default css`
  ${DEPS('SearchInput')}

  @media screen {
    .AutosuggestSearch {
      position: relative;
    }
    .AutosuggestSearch--open {
      z-index: ${vars.zindex__overlay};
    }

    .AutosuggestSearch__container {
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

    .AutosuggestSearch__container--open {
      opacity: 1;
      max-height: 800px;
      padding: ${vars.space_1} 0;
    }

    .AutosuggestSearch__emptyMessage {
      padding: ${vars.space_2} ${vars.space_4};
    }
    .AutosuggestSearch__emptyMessage--loading {
      opacity: 0.5;
    }

    .AutosuggestSearch__list {
      ${AsSVariables.declare({ action_icon: 'none' })}
    }
    .AutosuggestSearch__list--action--search {
      ${AsSVariables.override({ action_icon: iconToken('search') })}
    }
    .AutosuggestSearch__list--action--go {
      ${AsSVariables.override({ action_icon: iconToken('arrow_forward') })}
    }

    .AutosuggestSearch__item {
      font: ${vars.font_body_l};
      padding: ${vars.space_2} ${vars.space_4};
      padding-right: ${vars.space_7};

      @media ${mq.phone_phablet} {
        padding-left: ${vars.space_2};
        padding-right: ${vars.space_4};
      }
    }

    .AutosuggestSearch__item--highlighted {
      position: relative;
      cursor: pointer;
      color: ${vars.color_faxafloi_100};
      background-color: ${vars.color_suld_25};
    }
    .AutosuggestSearch__item--highlighted::before {
      ${iconStyle(asSVars.action_icon)}
      color: ${vars.color_suld_100};
      float: right;
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
