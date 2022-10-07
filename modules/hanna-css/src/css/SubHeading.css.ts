import { css } from 'es-in-css';

import { between_phone_netbook } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { hannaVarOverride, hannaVars as vars } from '../lib/hannavars';
import { WARNING__ } from '../lib/WARNING__';

import { ComponentLayout } from './styles/componentLayout';
import { SeenEffect__disallowNesting, SeenEffect__fadeup } from './utils/seenEffects';

export default css`
  /*!@deps
    TextBlock
  */
`;

// inlined by TextBlock.css.ts
export const SubHeading_css = () => css`
  .SubHeading {
    ${SeenEffect__fadeup}
    ${SeenEffect__disallowNesting}
    ${ComponentLayout}

    font: ${vars.font_sh_l};
    margin-top: ${between_phone_netbook(40, 50)};
    margin-bottom: ${between_phone_netbook(20, 30)};

    @media ${mq.wide} {
      margin-top: 50px;
      margin-bottom: 30px;
    }
  }
  .SubHeading--small {
    font: ${vars.font_sh_s};
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
