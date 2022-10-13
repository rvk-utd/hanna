import { css } from 'es-in-css';

import { colors } from '../lib/colors';
import { hannaVars } from '../lib/hannavars';

export default css`
  /*!@deps
    Carousel
  */
`;

export const CarouselStepper_css = () => css`
  :root {
    --CarouselStepper--height: ${hannaVars.space_4};
  }

  // ---------------------------------------------------------------------------

  .CarouselStepper {
    margin: 0 ${hannaVars.space_0$5__neg};
    width: max-content;
    display: flex;
    align-items: flex-end;
    padding-top: ${hannaVars.space_1};
    height: var(--CarouselStepper--height);
  }

  .CarouselStepper__button {
    flex: none;

    position: relative;

    width: ${hannaVars.space_1};
    height: 100%;

    margin: 0 ${hannaVars.space_0$5};

    overflow: hidden;
    white-space: nowrap;
    text-indent: 150%;

    background: ${hannaVars.theme_color_primary_50};

    transform: scaleY((16/24));
    transform-origin: bottom center;

    transition: transform 200ms ease-in;
  }

  .CarouselStepper__button:hover {
    background: ${colors.suld_150};
    transform: scaleY((20/24));
  }

  .CarouselStepper__button[aria-pressed='true'] {
    background: ${hannaVars.theme_color_primary};
    transform: none;
  }
`;
