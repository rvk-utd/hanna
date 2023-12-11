import { css } from 'es-in-css';

import { hannaVars as vars } from '../lib/hannavars.js';

import { carouselItemsScrollSnapStyles } from './styles/abstractCarousel.js';

import {
  CarouselStepper_css,
  carouselStepperBeforeSprinklingPadding,
} from './CarouselStepper.css.js';

export default css`
  .Carousel {
    ${carouselStepperBeforeSprinklingPadding}
  }
  .Carousel__itemlist {
    ${carouselItemsScrollSnapStyles};
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
