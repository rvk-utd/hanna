import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { WrapperElmProps } from './utils.js';

const defaultTexts = {
  prefix: '',
};

type CarouselStepperProps = {
  current: number;
  itemCount: number;
  setCurrent: (idx: number) => void;
  'aria-controls'?: string;
  texts?: Readonly<{
    prefix: string;
  }>;
} & WrapperElmProps;

const array = new Array(50).join(' ').split('');

export const CarouselStepper = (props: CarouselStepperProps) => {
  const { current, itemCount, setCurrent, texts = defaultTexts, wrapperProps } = props;

  const labelPrefix = texts.prefix ? texts.prefix + ' ' : '';

  return (
    <div
      {...wrapperProps}
      className={modifiedClass('CarouselStepper', null, (wrapperProps || {}).className)}
    >
      {array.slice(0, itemCount).map((_, i) => {
        const isCurrent = current === i || undefined;
        const label = labelPrefix + (i + 1);
        return (
          <button
            key={i}
            className={'CarouselStepper__button'}
            type="button"
            disabled={isCurrent}
            aria-pressed={isCurrent}
            aria-controls={props['aria-controls']}
            onClick={() => setCurrent(i)}
            aria-label={label}
            title={label}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default CarouselStepper;
