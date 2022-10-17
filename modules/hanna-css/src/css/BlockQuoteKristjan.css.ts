import { css } from 'es-in-css';

import { mq } from '../lib/breakpoints';
import { hannaVars as vars } from '../lib/hannavars';
import { WARNING__ } from '../lib/WARNING__';

import { ButtonTertiaryStyle, ButtonTertiaryStyle__hoverFocus } from './styles/buttons';
import { pullQuoteContainerStyle, textContent } from './utils/textContent';

export default css`
  .BlockQuote {
    ${pullQuoteContainerStyle}
    padding-bottom: ${vars.space_3};
    margin-bottom: ${vars.space_3};

    @media ${mq.phablet_up} {
      --Quote--indent: ${vars.space_2};
    }
  }

  .BlockQuote__quote {
    ${textContent}
    font: ${vars.font_bd_s};
    border-left: var(--Quote--line);
    padding-left: ${vars.space_2};

    @media ${mq.phablet_up} {
      padding-left: ${vars.space_3};
    }
  }

  .BlockQuote__quote > *:last-child {
    margin-bottom: 0;
  }

  .BlockQuote__by {
    position: relative;
    top: ${vars.space_1__neg};
    margin-top: ${vars.space_2};
    text-align: right;
    line-height: 1;

    @media ${mq.phablet_up} {
      // TODO: FIND var--ButtonTertiary--height
      // margin-bottom: calc(-1 * #{$var--ButtonTertiary--height});
    }
  }

  .BlockQuote__by > a,
  .BlockQuote__by > span {
    ${ButtonTertiaryStyle(true)}
    margin: 0;
    // TODO: Find vars below
    /*
      margin-right: calc(
        -1 * (#{$var--ButtonTertiary--hover--dashWidth} - #{$var--ButtonTertiary--dashWidth})
      );
    */
  }
  .BlockQuote__by > span {
    font-weight: ${vars.font_weight__normal};
    --ButtonTertiary--dashColor: ${vars.color_suld_150};
  }
  .BlockQuote__by > a {
    ${ButtonTertiaryStyle__hoverFocus}
  }

  .BlockQuote__by > *:not(span):span(a) {
    ${WARNING__('Only <span> or <a href=""> is allowed inside `.BlockQuote__by`')};
  }
`;
