import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { BemProps } from '../utils/types.js';

export type CarouselPagingProps = {
  current: number;
  itemCount: number;
  setCurrent: (idx: number) => void;
  'aria-controls'?: string;
  texts: Readonly<{
    next: string;
    prev: string;
    unit?: string;
  }>;
} & BemProps;

const CarouselPaging = (props: CarouselPagingProps) => {
  const { bem = 'CarouselPaging', modifier, current, itemCount, setCurrent } = props;
  const { next, prev, unit = '' } = props.texts;

  return (
    <div className={modifiedClass(bem, modifier)}>
      <button
        className={`${bem}__button ${bem}__button--next`}
        type="button"
        disabled={current >= itemCount - 1}
        onClick={() => setCurrent(current + 1)}
        aria-controls={props['aria-controls']}
        aria-label={`${next} ${unit}`}
        title={`${next} ${unit}`}
      >
        {next}
      </button>{' '}
      <button
        className={`${bem}__button ${bem}__button--prev`}
        type="button"
        disabled={current === 0}
        onClick={() => setCurrent(current - 1)}
        aria-controls={props['aria-controls']}
        aria-label={`${prev} ${unit}`}
        title={`${prev} ${unit}`}
      >
        {prev}
      </button>
    </div>
  );
};

export default CarouselPaging;
