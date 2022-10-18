import { css, em, str } from 'es-in-css';

import { mq } from '../../lib/breakpoints';
import { buildVariables } from '../../lib/cssutils';
import { cols_px } from '../../lib/grid';
import { hannaVars as vars } from '../../lib/hannavars';
import { characters } from '../../lib/icons';

import { prem } from './miscUtils';

export const defaultULStyle = () => css`
  list-style: none;
  padding: 0;
  margin-bottom: ${vars.baseVerticalMargin};

  > li {
    margin-bottom: ${vars.space_2};
    position: relative;
    padding-left: ${vars.space_4};

    &::before {
      content: ' ';
      float: left;
      margin-left: ${vars.space_4__neg};
      left: 0;
      width: ${vars.space_2};
      border-top: ${prem(2)} solid ${vars.theme_color_primary__safeish};
      margin-top: ${prem(-1)};
      transform: translateY(50%);
    }
  }
`;

// ---------------------------------------------------------------------------

export const pullQuoteVars = buildVariables(['Quote__line', 'Quote__indent']);
const q = pullQuoteVars;

export const pullQuoteContainerStyle = () => css`
  ${q.declare({
    Quote__line: `2px solid ${vars.theme_color_primary}`,
    Quote__indent: 0,
  })}
  max-width: calc(${cols_px(8)} - ${q.vars.Quote__indent});
  padding-top: ${vars.space_5};
  margin-left: ${q.vars.Quote__indent};
  position: relative;

  &::before {
    content: ${str(characters.quotes.upper99)};
    color: ${vars.theme_color_primary};
    font-size: ${prem(72)};
    line-height: 1;
    position: absolute;
    top: 0;
    left: 2px;
    text-align: center;
    width: 0.6em;
    margin-left: -0.3em;
  }
`;

// ---------------------------------------------------------------------------

export const textContentVars = buildVariables([
  'h2__marginTop',
  'h2__marginBottom',
  'h3__marginTop',
]);
const t = textContentVars;

// reset <button> styles for easier custom styling
export const textContent = () => css`
  font: ${vars.font_bd_l};

  h2 {
    font: ${vars.font_hd_s};
    margin-bottom: ${t.vars.h2__marginBottom.or(vars.baseVerticalMargin)};
    clear: both;
  }
  * + h2 {
    margin-top: ${t.vars.h2__marginTop.or(em(1.5))};
  }
  h3 {
    font: ${vars.font_sh_l};
    margin-bottom: ${vars.baseVerticalMargin};
    clear: both;
  }
  * + h3 {
    margin-top: ${t.vars.h3__marginTop.or(em(1.25))};
  }
  h4 {
    font: ${vars.font_sh_s};
    margin-bottom: ${vars.baseVerticalMargin};
  }
  p {
    margin-bottom: ${vars.baseVerticalMargin};
  }
  ul {
    ${defaultULStyle}
  }
  ol {
    margin-bottom: ${vars.baseVerticalMargin};
  }
  li ol,
  li ul {
    margin-bottom: 0;
  }
  // blockquote:not([class]), // Too strict??
  blockquote:not(.BlockQuote__quote):not(.PullQuote__quote) {
    ${pullQuoteContainerStyle}

    font: ${vars.font_bd_s};
    position: relative;
    margin-bottom: ${vars.space_4};
    padding-left: calc(${vars.space_2} + 2px);

    @escape (without: media) {
      @media ${mq.phablet_up} {
        padding-left: calc(${vars.space_3} + 2px);
        ${q.override({
          Quote__indent: vars.space_2,
        })}
      }
    }
  }
  blockquote:not(.BlockQuote__quote):not(.PullQuote__quote)::after {
    content: '';
    position: absolute;
    border-left: ${q.vars.Quote__line};
    top: ${vars.space_5};
    bottom: 0;
    left: 0;
    width: 2px;
  }
  blockquote:not(.BlockQuote__quote):not(.PullQuote__quote) > *:last-child {
    margin-bottom: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
`;
