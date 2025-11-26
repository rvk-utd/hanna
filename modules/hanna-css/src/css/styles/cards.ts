import { css, pct } from 'es-in-css';

import { mq } from '../../lib/breakpoints.js';
import { buildVariables } from '../../lib/cssutils.js';
import { hannaVars as vars } from '../../lib/hannavars.js';
import { prem } from '../utils/miscUtils.js';

import { LinkStyle_Reset } from '../../lib/links.js';

export const CardListVariables = buildVariables(['card_width']);
export const cardListVars = CardListVariables.vars;

export const CardBlock_css = () => css`
  @media ${mq.tablet_up} {
    display: grid;
    column-gap: ${vars.grid_gutter};
    grid-template: 'title list' / ${vars.grid_3} ${vars.grid_9};
  }
  @media ${mq.tablet} {
    grid-template-columns: ${vars.grid_4} ${vars.grid_8};
  }
`;

export const CardListTitle_css = () => css`
  grid-area: title;
  margin-bottom: ${vars.baseVerticalMargin};
  font: ${vars.font_heading_m};
`;

export const CardList_css = () => css`
  grid-area: list;
  display: grid;
  grid-auto-flow: row;
  gap: ${vars.grid_gutter};
  grid-template-columns: repeat(auto-fill, var(--card-width));
  ${CardListVariables.declare({
    card_width: pct(100),
  })}

  @media ${mq.phablet} {
    ${CardListVariables.override({
      card_width: vars.grid_6,
    })};
  }
  @media ${mq.tablet} {
    ${CardListVariables.override({
      card_width: vars.grid_4,
    })};
  }
  @media ${mq.netbook_up} {
    ${CardListVariables.override({
      card_width: vars.grid_3,
    })};
  }
`;

export const Card_css = () => css`
  ${LinkStyle_Reset}
  font: ${vars.font_body_m};
  display: block;
  width: 100%;
  padding: ${prem(24)} ${prem(24)} ${prem(32)} ${prem(24)};
  min-height: ${prem(168)};
  height: 100%;

  &::after {
    content: '';
    display: block;
    width: ${vars.space_5};
    height: ${prem(2)};
    background: var(--Card-lineColor, currentColor);
    margin-top: ${vars.space_2};
    transition: width 200ms ease-in;
  }

  &:hover::after {
    width: 100%;
  }

  &__title,
  &__summary {
    display: block;
  }

  &__title {
    font: ${vars.font_heading_xs};
    font-weight: ${vars.font_weight__bold};
  }
  &__title:last-child {
    margin-bottom: ${vars.space_1};
  }

  &__meta {
    color: ${vars.color_suld_150};
    margin-top: ${vars.space_1};
  }

  &__summary {
    margin-top: ${vars.space_1};
  }
`;
