import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

type EnumerateInternal<
  N extends number,
  Acc extends Array<number> = []
> = Acc['length'] extends N ? Acc[number] : EnumerateInternal<N, [...Acc, Acc['length']]>;

type PercentageValue = EnumerateInternal<101>;

type ProgressBarProps = {
  barColor: 'blue' | 'white';
  value: PercentageValue;
};

export const ProgressBar = ({ barColor = 'blue', value }: ProgressBarProps) => {
  const normalizedValue = Math.max(0, Math.min(100, value));

  return (
    <progress
      className={modifiedClass('ProgressBar', barColor)}
      id="file"
      max="100"
      value={normalizedValue}
    >
      {value}%
    </progress>
  );
};

export default ProgressBar;
