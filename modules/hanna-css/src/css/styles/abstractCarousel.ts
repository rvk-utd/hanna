import { css, px } from 'es-in-css';

import { grid } from '../../lib/grid';
import { hannaVars as vars } from '../../lib/hannavars';
import { avoidCssnanoMerging } from '../utils/miscUtils';

export const itemsScrollSnapStyles_css = () => css`
  & {
    display: flex;
    flex-flow: row;
    overflow-x: scroll;
    scroll-behavior: smooth;
    --paddingLeft: calc(50vw - 50%);
    padding-left: var(--paddingLeft);
    margin: 0 calc(-1 * var(--paddingLeft));
    scroll-padding-left: var(--Carousel--leftOffset, ${px(grid.margin__phone)});
    // hide scrollbars
    -ms-overflow-style: none; /* Edge, Internet Explorer */
    scrollbar-width: none; /* Firefox */
    width: 100vw;
    // WARNING: Script-driven snap scrolling seems to go all wonky
    // in FF and Chrome (OSX) if 'position' is not 'static'
    //  -- Már @ 2022-08-08
    // position: relative;
  }

  &-wrapper {
    position: relative;
    --paddingLeft: calc(50vw - 50%);
  }
  &-goRight,
  &-goLeft {
    position: absolute;
    width: 3rem;

    ${avoidCssnanoMerging(css`
      width: MAX(calc(0.4 * var(--paddingLeft)), calc(1.2 * ${vars.grid_margin}), 2rem);
    `)}

    top: -0.67rem;
    bottom: -0.67rem;
    cursor: pointer;
    background-image: linear-gradient(
      -90deg,
      rgba(#fff, 1) 0%,
      rgba(#fff, 0.5) 67%,
      rgba(#fff, 0) 100%
    );
    display: none;
    opacity: 0;
    transition: opacity ${vars.link_transition};
    // outline: 1px dashed rgba(black, 0.4);
  }
  :hover > &-goRight,
  :hover > &-goLeft {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    opacity: 0.0001;
  }
  &-goRight:hover,
  &-goLeft:hover {
    opacity: 1;
  }

  &-goRight::before,
  &-goLeft::before {
    @include icon();
    content: ${vars.icon__chevron_right};
    font-size: 2.5rem;
    margin-right: 0.5rem;
    color: ${vars.color_suld_150};
    text-shadow: 0 0 5px #fff, 0 0 5px #fff, 0 0 5px #fff;
  }

  &-goRight {
    cursor: e-resize;
    right: calc(-1 * var(--paddingLeft) + ${vars.browser_scrollbar_width});
  }
  &-goLeft {
    cursor: w-resize;
    transform: rotate(180deg);
    left: calc(-1 * var(--paddingLeft));
  }

  // Ensure that the last item can scroll all the way to the left edge.
  // Padding-right on the parent doesn't fully work in FF and Chrome.
  &::after {
    content: '';
    width: 90vw;
  }

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  &[data-scroll-snapping] {
    scroll-snap-type: x mandatory;
  }
  & > * {
    scroll-snap-align: start;
  }
`;
