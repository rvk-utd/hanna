import { css } from 'es-in-css';

import { scale_phone_netbook } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars.js';
import { WARNING__ } from '../lib/WARNING__.js';

import { ComponentLayout } from './styles/componentLayout.js';
import { DEPS } from './utils/miscUtils.js';

export default css`
  ${DEPS('TextBlock')}
`;

// inlined by TextBlock.css.ts
export const Heading_css = () => css`
  .Heading {
    ${ComponentLayout}

    font: ${vars.font_heading_l};
    margin-top: ${scale_phone_netbook(40, 60)};
    margin-bottom: ${scale_phone_netbook(24, 32)};

    @media ${mq.wide} {
      margin-top: 60px;
      margin-bottom: 32px;
    }
  }
  .Heading--large {
    font: ${vars.font_heading_xl};
  }
  .Heading--small {
    font: ${vars.font_heading_m};
  }

  .Heading a {
    ${hannaVarOverride({
      link_color: '_inherit',
      link_underline: 'none',
      link_underline__hover: 'none',
    })}
  }

  h1.Heading:not([data-dev-forcedh1]) {
    ${WARNING__('Only use <H2/> or lower for .Heading')}
  }
`;
