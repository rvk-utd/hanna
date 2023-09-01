import { css } from 'es-in-css';

import { srOnly } from '../lib/a11y.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconStyle } from '../lib/icons.js';

import { hideText_css } from './utils/hideText.js';
import { prem } from './utils/miscUtils.js';

export default css`
  @media screen {
    .ShareButtons__list {
      display: flex;
      font-size: ${prem(15)};
    }

    .ShareButtons__label {
      ${srOnly}
    }

    .ShareButtons__link {
      ${hideText_css}
      width: 35px;
      height: 35px;
      line-height: 35px;
      border-radius: 50%;
      background-color: ${vars.theme_color_primary};
      color: ${vars.theme_color_primary__text};
      position: relative;
      display: inline-block;
    }
    .ShareButtons__link:hover,
    .ShareButtons__link:active {
      background-color: ${vars.theme_color_primary__dark};
      color: ${vars.color_suld_0};
    }

    .ShareButtons__link::before {
      ${iconStyle('')}
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      text-indent: 0;
      text-align: center;
    }

    .ShareButtons__item {
      margin-left: ${prem(16)};
      &:first-child {
        margin-left: 0;
      }
    }

    .ShareButtons__link--facebook::before {
      content: ${vars.icon__facebook};
    }
    .ShareButtons__link--twitter::before {
      content: ${vars.icon__twitter};
    }
    .ShareButtons__link--linkedin::before {
      content: 'Li';
      font-weight: bold;
      line-height: 31px;
    }
    .ShareButtons__link--email::before {
      content: '@';
      font-weight: bold;
      line-height: 28px;
    }
  }
`;
