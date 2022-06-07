import React from 'react';
import _CarouselStepper, { Props } from '@hugsmidjan/react/CarouselStepper';

type CarouselStepperProps = Omit<Props, 'bem' | 'modifier'>;

const CarouselStepper = (props: CarouselStepperProps) => (
  <_CarouselStepper {...props} bem={undefined} modifier={undefined} />
);

export default CarouselStepper;
