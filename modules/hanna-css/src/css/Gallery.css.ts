import { css, em } from 'es-in-css';

import { between_cols } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { hannaVars as vars } from '../lib/hannavars';
import { WARNING__ } from '../lib/WARNING__';

import { carouselItemsScrollSnapStyles } from './styles/abstractCarousel';
import { LinkStyle_Reset } from './styles/links';
import { SeenEffect__fadeup } from './utils/seenEffects';
import { GalleryModal_css, GalleryModalItem_css } from './_GalleryModal';

import { carouselStepperBeforeSprinklingPadding } from './CarouselStepper.css';

export default css`
  /*!@deps
    Carousel
  */

  @media screen {
    .Gallery {
      ${carouselStepperBeforeSprinklingPadding}
      ${SeenEffect__fadeup};
      margin-bottom: ${between_cols(32, 130)};
    }
    .Gallery__itemlist {
      ${carouselItemsScrollSnapStyles};
    }

    // @deprecated  (Remove in v0.9)
    .Gallery__items {
      display: flex;
      margin-left: calc(-0.5 * ${vars.grid_gutter});
      margin-right: calc(-0.5 * ${vars.grid_gutter});

      will-change: transform;

      transition: transform 200ms ease-in;
    }
    // @deprecated  (Remove in v0.9)
    .Gallery:not([data-sprinkled]) .Gallery__items {
      overflow: auto;
    }
    // @deprecated  (Remove in v0.9)
    .Gallery__items > .GalleryItem {
      padding: 0 calc(0.5 * ${vars.grid_gutter});
    }
    // @deprecated  (Remove in v0.9)
    .Gallerty__track {
      ${WARNING__('Unsupported: use `.Gallery__items` instead')};
    }

    // ---------------------------------------------------------------------------
    // _GalleryItem
    // ---------------------------------------------------------------------------

    .GalleryItem {
      // <figure>
      display: flex;
      flex-flow: column-reverse;

      padding-right: ${vars.grid_gutter};

      --GalleryItem__image--max-width: 280px;
      --GalleryItem__image--max-height: 240px;

      @media ${mq.tablet_up} {
        --GalleryItem__image--max-width: ${vars.grid_5};
        // min-width: $ {vars.grid_3};
        --GalleryItem__image--max-height: ${vars.grid_4};
      }
    }

    .GalleryItem__button {
      ${LinkStyle_Reset(true)};
    }

    .GalleryItem__button,
	// Image has no __button (link)
	.GalleryItem > .GalleryItem__image {
      display: flex;
      flex-flow: column;
      justify-content: flex-end;
      height: var(--GalleryItem__image--max-height);
    }

    .GalleryItem__image > img {
      display: block;
      margin-top: auto;
      max-width: var(--GalleryItem__image--max-width);
      max-height: var(--GalleryItem__image--max-height);
    }

    .GalleryItem__caption {
      --leading: ${em(1.25)};
      font-size: ${vars.font_bd_l_size};
      line-height: var(--leading);

      width: 0;
      min-width: 100%;
      max-height: calc(3 * var(--leading));

      margin-top: ${vars.space_1};
      margin-bottom: auto;
    }

    .GalleryItem__description {
      display: none;
    }
  }

  // Inline in order to not expose as standalone component styles
  ${GalleryModal_css}
  ${GalleryModalItem_css}
`;
