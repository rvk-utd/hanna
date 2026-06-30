import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

type EnumerateInternal<
  N extends number,
  Acc extends Array<number> = []
> = Acc['length'] extends N ? Acc[number] : EnumerateInternal<N, [...Acc, Acc['length']]>;

type PercentageValue = EnumerateInternal<101>;

type ProgressBarProps = {
  color: 'blue' | 'white';
  value: PercentageValue;
};

export const ProgressBar = ({ color = 'blue', value }: ProgressBarProps) => {
  const normalizedValue = Math.max(0, Math.min(100, value));

  return (
    <progress
      className={modifiedClass('ProgressBar', color)}
      max="100"
      value={normalizedValue}
    >
      {value}%
    </progress>
  );
};

export default ProgressBar;
