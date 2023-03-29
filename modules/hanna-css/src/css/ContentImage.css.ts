import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';

import { grid_units, resetImageChild } from './utils/miscUtils.js';

export default css`
  @media screen {
    .ContentImage {
      display: flex;
      flex-flow: column;
      margin-bottom: ${vars.baseVerticalMargin};
    }
    .ContentImage__caption {
      order: 1;
      font-size: ${vars.font_label_size};
      line-height: ${vars.font_label_leading};
      background-color: ${vars.color_suld_25};
      padding: ${grid_units(1)} ${grid_units(2)};
      display: flex;
      align-items: flex-start;
    }
    .ContentImage__text {
      flex-basis: auto;
      flex-shrink: 2; // the __credit content tends to be shorter so lets prioritize shrinking the __text
      min-width: 60%;
    }
    .ContentImage__credit {
      font-size: 1em;
      color: ${vars.color_suld_150};
      text-align: right;
      flex-basis: auto;
      margin-left: auto;
      flex-shrink: 1;
    }
    .ContentImage__image {
      ${resetImageChild};
    }
  }
`;
