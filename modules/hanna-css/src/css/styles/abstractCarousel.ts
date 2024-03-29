import { css, px } from 'es-in-css';

import { grid } from '../../lib/grid.js';
import { hannaVars as vars } from '../../lib/hannavars.js';
import { iconStyle } from '../../lib/icons.js';
import { avoidCssnanoMerging } from '../utils/miscUtils.js';

const extend = (f = 1) => `calc(${f * 50}vw - ${f * 50}%)`;

export const carouselItemsScrollSnapStyles = () => css`
  & {
    display: flex;
    flex-flow: row;
    overflow-x: scroll;
    scroll-behavior: smooth;
    padding-left: ${extend};
    margin: 0 ${extend(-1)};
    scroll-padding-left: var(--Carousel--leftOffset, ${px(grid.margin__phone)});
    width: 100vw;
    ${
      ''
      // WARNING: Script-driven snap scrolling seems to go all wonky
      // in FF and Chrome (OSX) if \`position\` is not \`static\`
      // -- Már @ 2022-08-08
    }
    position: static;
  }

  /* hide scrollbars */
  & {
    -ms-overflow-style: none; /* Edge, Internet Explorer */
    scrollbar-width: none; /* Firefox */
  }
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  &-wrapper {
    position: relative;
  }
  &-goRight,
  &-goLeft {
    position: absolute;
    width: 3rem;
    ${avoidCssnanoMerging(css`
      width: max(${extend(0.4)}, calc(1.2 * ${vars.grid_margin}), 2rem);
    `)}
    top: -0.67rem;
    bottom: -0.67rem;
    cursor: pointer;
    background-image: linear-gradient(
      -90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.5) 67%,
      rgba(255, 255, 255, 0) 100%
    );
    display: none;
    opacity: 0;
    transition: opacity ${vars.link_transition};
    /* outline: 1px dashed rgba(255, 255, 255, 0.4); */
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
    ${iconStyle(vars.icon__chevron_right)}
    font-size: 2.5rem;
    margin-right: 0.5rem;
    color: ${vars.color_suld_150};
    text-shadow: 0 0 5px #fff, 0 0 5px #fff, 0 0 5px #fff;
  }

  &-goRight {
    cursor: e-resize;
    right: calc(${extend(-1)} + ${vars.browser_scrollbar_width});
  }
  &-goLeft {
    transform: rotate(180deg);
    cursor: w-resize;
    left: ${extend(-1)};
  }

  // Ensure that the last item can scroll all the way to the left edge.
  // Padding-right on the parent doesn't fully work in FF and Chrome.
  &::after {
    content: '';
    width: 90vw;
  }

  &[data-scroll-snapping] {
    scroll-snap-type: x mandatory;
  }
  & > * {
    scroll-snap-align: start;
  }
`;
