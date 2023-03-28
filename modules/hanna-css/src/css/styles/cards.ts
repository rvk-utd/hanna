import { css } from 'es-in-css';

import { mq } from '../../lib/breakpoints';
import { hannaVars as vars } from '../../lib/hannavars';
import { grid_units, prem } from '../utils/miscUtils';

import { LinkStyle_Reset } from './links';

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
  display: block;
  width: 100%;
  padding: ${prem(24)} ${prem(24)} ${prem(32)} ${prem(24)};
  min-height: ${prem(168)};
  height: 100%;

  &::after {
    content: '';
    display: block;
    width: ${grid_units(5)};
    height: ${prem(2)};
    background: var(--Card-lineColor, currentColor);
    margin-top: ${grid_units(2)};
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
    font-weight: 700;
    margin-bottom: ${prem(8)};
  }

  &__summary {
    font: ${vars.font_bd_s};
  }
`;
