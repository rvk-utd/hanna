import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

type ProgressBarProps = {
  barColor: 'blue' | 'white';
};

export const ProgressBar = ({ barColor = 'blue' }: ProgressBarProps) => {
  return (
    <div>
      <progress
        className={modifiedClass('ProgressBar', barColor)}
        id="file"
        max="100"
        value="50"
      >
        70%
      </progress>
    </div>
  );
};

export default ProgressBar;
