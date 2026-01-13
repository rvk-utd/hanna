import { css } from 'es-in-css';

import { srOnly } from '../lib/a11y.js';
import { hannaVars as vars } from '../lib/hannavars.js';

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
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      text-indent: 0;
      text-align: center;
      font-weight: bold;
      width: 100%;
      height: 1em;
      line-height: 1.1;
      margin-top: -0.5em;
    }

    .ShareButtons__item {
      margin-left: ${prem(16)};
      &:first-child {
        margin-left: 0;
      }
    }

    .ShareButtons__link--facebook::before,
    .ShareButtons__link--twitter::before {
      mask: url('i/icons/facebook.svg') 50% 50% / 1em auto no-repeat;
      background-color: currentColor;
    }
    .ShareButtons__link--twitter::before {
      mask-image: url('i/icons/twitter.svg');
    }
    .ShareButtons__link--linkedin::before {
      font-size: 20px;
      content: 'in';
    }
    .ShareButtons__link--email::before {
      font-size: 20px;
      content: '@';
      margin-top: -0.6em;
    }
  }
`;
