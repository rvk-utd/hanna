import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars';

import { itemsScrollSnapStyles_css } from './styles/abstractCarousel';

import { CarouselStepper_css } from './CarouselStepper.css';

export default css`
  html.before-sprinkling .Carousel:not([data-sprinkled]) {
    padding-bottom: var(--CarouselStepper--height);
  }
  .Carousel__itemlist {
    ${itemsScrollSnapStyles_css}
  }

  .Carousel__itemlist > * {
    margin-right: ${vars.space_3};
  }

  // @deprecated  (Remove in v0.9)
  .Carousel__items {
    display: flex;
    flex-flow: row;
  }
  // @deprecated  (Remove in v0.9)
  .Carousel__items > * {
    margin-right: ${vars.space_3};
  }

  // ---------------------------------------------------------------------------

  ${CarouselStepper_css}
`;
