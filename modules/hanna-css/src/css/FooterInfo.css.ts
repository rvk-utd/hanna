import { css } from 'es-in-css';

import { mq } from '../lib/breakpoints';
import { hannaVars as vars } from '../lib/hannavars';
import { WARNING__ } from '../lib/WARNING__';

import { afterClear_css } from './utils/afterClear';
import { prem } from './utils/miscUtils';
import { logo_notext_url } from './vars/logo';

export default css`
  @media screen {
    .FooterInfo {
      flex-basis: 100%;
      padding-top: ${vars.space_4};

      @media ${mq.tablet_up} {
        ${afterClear_css}
        padding-top: calc(2 * ${vars.space_8});
        padding-left: ${vars.grid_1_1};
      }
    }
  }

  .FooterInfo::before {
    content: '';
    display: block;
    margin: 0 auto calc(2 * ${vars.space_6}) auto;
    background: url(${logo_notext_url}) 50% 50% no-repeat;
    background-size: auto 100%;
    width: ${prem(35)};
    height: ${prem(53)};

    @media ${mq.tablet_up} {
      position: absolute;
      left: 0;
      width: ${vars.grid_1};
      // margin-top: grid-units(-1);
    }
  }

  .FooterInfo__group {
    margin-bottom: ${vars.space_8};

    @media ${mq.tablet_up} {
      float: left;
      width: ${vars.grid_4};
      margin-left: ${vars.grid_gutter};
    }
    @media ${mq.netbook_up} {
      width: ${vars.grid_3};
    }
  }

  .FooterInfo__group[role='contactinfo'], /** @deprecated  invalid role value (Remove in v0.9) */
  .FooterInfo__group--main {
    background-color: ${vars.color_suld_25};
    padding: ${vars.space_8} ${vars.grid_gutter};

    @media ${mq.phone_phablet} {
      margin-left: ${vars.grid_margin__neg};
      margin-right: ${vars.grid_margin__right__neg};
      padding-left: ${vars.grid_margin};
      padding-right: ${vars.grid_margin__right};
    }

    @media ${mq.tablet_up} {
      margin-top: ${vars.space_8__neg};
      margin-left: 0;
      width: ${vars.grid_5};
    }
    @media ${mq.netbook} {
    }
    @media ${mq.wide} {
      width: ${vars.grid_4};
      margin-left: ${vars.grid_1_1};
    }
  }

  .FooterInfo__group--main ~ .FooterInfo__group--main {
    ${WARNING__('Multiple `--main` groups are not supported')};
  }

  .FooterInfo__grouptitle {
    font: ${vars.font_sh_s};
    margin-bottom: ${vars.space_3};
  }
  .FooterInfo__groupcontent {
  }

  .FooterInfo__groupcontent h4 {
    font: ${vars.font_sh_s};
    margin-bottom: ${vars.space_1};
  }
  .FooterInfo__groupcontent h4:not(:first-child) {
    margin-top: ${vars.space_3};
  }

  .FooterInfo__groupcontent p,
  .FooterInfo__groupcontent ul,
  .FooterInfo__groupcontent li {
    margin-bottom: ${vars.space_2};
    --current-link-color: ${vars.link_color};
  }

  .FooterInfo__groupcontent a[href^='tel:'] {
    --link-color: var(--current-link-color);
  }
  .FooterInfo__groupcontent a > small {
    font-size: 1em;
    display: block;
    font-weight: ${vars.font_weight__normal};
    text-decoration: none;
    color: ${vars.color_suld_150};
  }
`;
