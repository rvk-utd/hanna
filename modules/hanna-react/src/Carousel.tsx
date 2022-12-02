import React from 'react';

import { AbstractCarousel, CarouselProps } from './_abstract/_AbstractCarousel';

export type { CarouselProps } from './_abstract/_AbstractCarousel';

const Carousel = <
  I extends Record<string, unknown> = {},
  P extends Record<string, unknown> | undefined = {}
>(
  props: CarouselProps<I, P>
) => (
  <AbstractCarousel {...props} bem={undefined} modifier={undefined} title={undefined} />
);

export default Carousel;
