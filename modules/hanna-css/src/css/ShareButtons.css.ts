import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';

import { sr_only } from './utils/a11y';
import { prem } from './utils/miscUtils';
import { hideText_css } from './utils/scssutils/hideText';

export default css`
  @media screen {
    .ShareButtons__list {
      display: flex;
      font-size: ${prem(15)};
    }

    .ShareButtons__label {
      ${sr_only}
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
      ${iconStyle('')}
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      text-indent: 0;
      text-align: center;
      line-height: 35px;
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
      content: 'LI';
    }
    .ShareButtons__link--email::before {
      content: 'E';
    }
  }
`;
