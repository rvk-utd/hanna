import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';

import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('TextBlock')}
`;

// inlined by TextBlock.css.ts
export const ArticleMeta_css = () => css`
  @media screen {
    .ArticleMeta {
      font: ${vars.font_bd_s};
      color: ${vars.color_suld_150};
      margin-bottom: ${vars.space_1};
    }
    .ArticleMeta--small {
      font: ${vars.font_label};
    }
    .ArticleMeta__item {
      display: inline-block;
    }
    .ArticleMeta__item:not(:last-child)::after {
      content: ' | ';
      margin: 0 0.25em;
      text-decoration: none;
      color: ${vars.color_suld_150};
    }

    .ArticleMeta + .Heading {
      margin-top: 0;
    }
  }
`;
