import React from 'react';

import { AbstractCarousel, CarouselProps } from './_abstract/_AbstractCarousel.js';

export type { CarouselProps } from './_abstract/_AbstractCarousel.js';

export const Carousel = <
  I extends Record<string, unknown> = Record<string, never>,
  P extends Record<string, unknown> | undefined = Record<string, never>
>(
  props: CarouselProps<I, P>
) => (
  <AbstractCarousel {...props} bem={undefined} modifier={undefined} title={undefined} />
);

export default Carousel;
