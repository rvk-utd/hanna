import { css } from 'es-in-css';

import { mq } from '../lib/breakpoints';
import { hannaVars as vars } from '../lib/hannavars';

export default css`
  @media screen {
    .FooterBadges {
      --FooterBadges--indenting: ${vars.space_2__neg};
      min-width: 100%;
      clear: both;
      display: flex;
      flex-flow: row wrap;
      margin: 0 var(--FooterBadges--indenting);

      @media ${mq.netbook_up} {
        --FooterBadges--indenting: 0px;
      }
    }
    .FooterBadges::before {
      content: '';
      border-top: ${vars.border_default};
      width: calc(100% + 2 * var(--FooterBadges--indenting));
      margin: 0 auto;
    }

    .FooterBadges__badge {
      margin: ${vars.space_2};
    }
    .FooterBadges__badge img,
    .FooterBadges__badge svg {
      width: auto;
    }
  }
`;
