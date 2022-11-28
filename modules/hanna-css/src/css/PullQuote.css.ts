import { css } from 'es-in-css';

import { between_phablet_netbook } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { hannaVars as vars } from '../lib/hannavars';
import { WARNING__ } from '../lib/WARNING__';

import {
  ButtonTertiaryStyle,
  ButtonTertiaryStyle__hoverFocus,
  ButtonTertiaryVariables,
} from './styles/buttons';
import { pullQuoteContainerStyle } from './utils/textContent';

const btVars = ButtonTertiaryVariables.vars;

export default css`
  .PullQuote {
    ${pullQuoteContainerStyle}
    padding-bottom: ${vars.space_5};
    margin-bottom: ${vars.space_3};

    @media ${mq.phablet_up} {
      margin-bottom: ${vars.space_5};
      --Quote--indent: ${vars.grid_0_1};
    }
  }

  .PullQuote__quote {
    border-left: var(--Quote--line);
    padding-left: ${vars.space_2};

    color: ${vars.color_suld_150};
    font-size: 20px;
    line-height: 1.5;

    @media ${mq.phablet_up} {
      font-size: ${between_phablet_netbook(20, 32)};
      padding-left: ${vars.grid_0_1};
    }
    @media ${mq.wide} {
      font-size: 32px;
    }
  }
  .PullQuote__quote::before {
    content: open-quote;
    float: left; // float before child <p/>s
  }
  .PullQuote__quote::after {
    content: close-quote;
  }

  .PullQuote__quote > *:last-child {
    margin-bottom: 0;
    display: inline; // make close-quote flow against last word
  }

  .PullQuote__quote > *:not(p) {
    ${WARNING__('Only <p> is allowed inside `.PullQuote`')};
  }

  .PullQuote__by {
    position: relative;
    top: ${vars.space_1};
    text-align: right;
    line-height: 1;

    @media ${mq.phablet_up} {
      margin-top: ${vars.space_1};
      margin-bottom: calc(-1 * ${btVars.height});
    }
  }

  .PullQuote__by > a,
  .PullQuote__by > span {
    ${ButtonTertiaryStyle(true)}
    margin: 0;
    margin-right: calc(-1 * (${btVars.hover__dashWidth} - ${btVars.dashWidth}));
  }
  .PullQuote__by > span {
    font-weight: ${vars.font_weight__normal};
    --ButtonTertiary--dashColor: ${vars.color_suld_150};
  }
  .PullQuote__by > a {
    ${ButtonTertiaryStyle__hoverFocus()};
  }

  .PullQuote__by > *:not(span):span(a) {
    ${WARNING__('Only <span> or <a href=""> is allowed inside `.PullQuote__by`')};
  }
`;
