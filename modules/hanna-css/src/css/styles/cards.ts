import { css } from 'es-in-css';

import { mq } from '../../lib/breakpoints.js';
import { hannaVars as vars } from '../../lib/hannavars.js';
import { prem } from '../utils/miscUtils.js';

import { LinkStyle_Reset } from './links.js';

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
  font: ${vars.font_hd_s};
`;

export const CardList_css = () => css`
  grid-area: list;
  display: grid;
  grid-auto-flow: row;
  gap: ${vars.grid_gutter};
  grid-template-columns: repeat(auto-fill, ${vars.grid_3});

  @media ${mq.phone} {
    grid-template-columns: 100%;
  }
  @media ${mq.phablet} {
    grid-template-columns: repeat(auto-fill, ${vars.grid_6});
  }
  @media ${mq.tablet} {
    grid-template-columns: repeat(auto-fill, ${vars.grid_4});
  }
`;

export const Card_css = () => css`
  ${LinkStyle_Reset}
  font: ${vars.font_bd_s};
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
    font: ${vars.font_bd_l};
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
