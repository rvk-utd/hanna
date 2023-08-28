import React from 'react';
import _CarouselStepper, { Props } from '@hugsmidjan/react/CarouselStepper';

import { MissingWrapperElmProps } from './utils.js';

type CarouselStepperProps = Omit<Props, 'bem' | 'modifier'> & MissingWrapperElmProps;

export const CarouselStepper = (props: CarouselStepperProps) => (
  <_CarouselStepper {...props} bem={undefined} modifier={undefined} />
);

export default CarouselStepper;
