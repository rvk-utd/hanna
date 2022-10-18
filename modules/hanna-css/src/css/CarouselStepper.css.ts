import { css } from 'es-in-css';

import { buildVariables } from '../lib/cssutils';
import { hannaVars as vars } from '../lib/hannavars';

export const CarouselStepperVariables = buildVariables(['height'], 'CarouselStepper');
const csVars = CarouselStepperVariables.vars;

export const carouselStepperBeforeSprinklingPadding = () => css`
  html.before-sprinkling &:not([data-sprinkled]) {
    padding-bottom: ${csVars.height};
  }
`;

export default css`
  /*!@deps
    Carousel
  */
`;

export const CarouselStepper_css = () => css`
  :root {
    ${CarouselStepperVariables.declare({
      height: vars.space_4,
    })}
  }

  // ---------------------------------------------------------------------------

  .CarouselStepper {
    margin: 0 ${vars.space_0$5__neg};
    width: max-content;
    display: flex;
    align-items: flex-end;
    padding-top: ${vars.space_1};
    height: ${csVars.height};
  }

  .CarouselStepper__button {
    flex: none;

    position: relative;

    width: ${vars.space_1};
    height: 100%;

    margin: 0 ${vars.space_0$5};

    overflow: hidden;
    white-space: nowrap;
    text-indent: 150%;

    background: ${vars.theme_color_primary_50};

    transform: scaleY((16/24));
    transform-origin: bottom center;

    transition: transform 200ms ease-in;
  }

  .CarouselStepper__button:hover {
    background: ${vars.color_suld_150};
    transform: scaleY((20/24));
  }

  .CarouselStepper__button[aria-pressed='true'] {
    background: ${vars.theme_color_primary};
    transform: none;
  }
`;
