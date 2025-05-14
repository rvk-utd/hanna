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
export const SubHeading_css = () => css`
  .SubHeading {
    ${ComponentLayout}

    font: ${vars.font_heading_m};
    margin-top: ${scale_phone_netbook(40, 50)};
    margin-bottom: ${scale_phone_netbook(20, 30)};

    @media ${mq.wide} {
      margin-top: 50px;
      margin-bottom: 30px;
    }
  }
  .SubHeading--small {
    font: ${vars.font_heading_s};
  }

  .SubHeading a {
    ${hannaVarOverride({
      link_color: '_inherit',
      link_underline: 'none',
      link_underline__hover: 'none',
    })}
  }

  h1.SubHeading {
    ${WARNING__('Only use <H2/> or lower for .SubHeading')}
  }
`;
