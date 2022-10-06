import { css, media } from 'es-in-css';

import { mq } from '../lib/breakpoints';
import { hannaVars as vars } from '../lib/hannavars';
import { WARNING__ } from '../lib/WARNING__';

export default css`
  @media screen {
    .Attention {
      margin: ${vars.baseVerticalMargin_2} 0;
      font: ${vars.font_bd_l};
      border-left: ${vars.space_1} solid ${vars.theme_color_primary};
      padding-left: ${vars.space_4};
      padding-right: ${vars.grid_column};
    }

    .Attention--small {
      font: ${vars.font_bd_s};
      padding-left: ${vars.space_3};
    }

    ${media(
      mq.phone_phablet,
      css`
        .Attention {
          padding-left: ${vars.space_2};
          padding-right: 0;
        }
      `
    )}

    .Attention--strong {
      ${WARNING__('Deprecated: `.Attention--strong` is no longer supported')}
    }

    .Attention:last-child {
      margin-bottom: 0;
    }
    .Attention:first-child {
      margin-top: 0;
    }
    .Attention p {
      margin-bottom: ${vars.baseVerticalMargin};
    }
    .Attention p:last-child {
      margin-bottom: 0;
    }

    .Attention h1,
    .Attention h2,
    .Attention h3,
    .Attention h4,
    .Attention ul,
    .Attention ol {
      ${WARNING__('Fancy rich text content is not supported')};
    }
  }
`;
