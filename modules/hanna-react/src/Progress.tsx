import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

export type ProgressProps = {
  /** Custom class-name for the progress indicator element */
  className?: string;

  /**
   * Whether to render the progress indicator as a circular spinner or a line/bar.
   *
   * Default: `"bar"`
   */
  variant?: 'spinner' | 'bar';

  /**
   * The value of the progress bar from 0-100.
   * If `undefined` the progress will show an "indeterminate" state.
   */
  percent?: number;

  /** If the progress bar should display a "done" state */
  done?: boolean;

  ariaLabel?: string;
  ariaLabelledBy?: string;
  id?: string;
};

export const Progress = (props: ProgressProps) => {
  let { percent, done } = props;
  if (done) {
    percent = 100;
  }
  let steps;
  let valueNow;
  let valueText;
  if (percent != null) {
    steps = 10;
    percent = Math.max(0, Math.min(100, percent));
    valueNow = Math.round(percent / steps);
    valueText = `${percent}%`;
  }
  return (
    <span
      className={modifiedClass(
        'Progress',
        [props.variant === 'spinner' && 'spinner', done && 'done'],
        props.className
      )}
      role="progressbar"
      aria-valuemax={steps}
      aria-valuenow={valueNow} // NOTE: Progress is ndeterminate state is derived from this prop being absent
      aria-valuetext={valueText}
      aria-label={props.ariaLabel || undefined}
      aria-labelledby={props.ariaLabelledBy || undefined}
      id={props.id}
    >
      {valueText && <span className="Progress__value">{valueText}</span>}
    </span>
  );
};
