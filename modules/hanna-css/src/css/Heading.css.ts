import { css } from 'es-in-css';

import { between_phone_netbook } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars';
import { WARNING__ } from '../lib/WARNING__';

import { ComponentLayout } from './styles/componentLayout';

export default css`
  /*!@deps
    TextBlock
  */
`;

// inlined by TextBlock.css.ts
export const Heading_css = () => css`
  .Heading {
    ${ComponentLayout}

    font: ${vars.font_hd_m};
    margin-top: ${between_phone_netbook(40, 60)};
    margin-bottom: ${between_phone_netbook(24, 32)};

    @media ${mq.wide} {
      margin-top: 60px;
      margin-bottom: 32px;
    }
  }
  .Heading--large {
    font: ${vars.font_hd_l};
  }
  .Heading--small {
    font: ${vars.font_hd_s};
  }

  .Heading a {
    ${hannaVarOverride({
      link_color: '_inherit',
      link_underline: 'none',
      link_underline__hover: 'none',
    })}
  }

  h1.Heading:not([data-dev-forcedH1]) {
    ${WARNING__('Only use <H2/> or lower for .Heading')}
  }
`;
