import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

export type ProgressProps = {
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

  /** If the progress bar should be display a "done" state */
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
  let bounds: { min?: number; max?: number } = {};
  if (percent != null) {
    bounds = { min: 0, max: 100 };
    percent = Math.max(0, Math.min(100, Math.round(percent)));
  }
  return (
    <span
      className={modifiedClass('Progress', [
        props.variant === 'spinner' && 'spinner',
        done && 'done',
      ])}
      role="progressbar"
      aria-valuemin={bounds.min}
      aria-valuemax={bounds.max}
      // NOTE: Progress is ndeterminate state is derived from this prop being absent
      aria-valuenow={percent}
      aria-label={props.ariaLabel || undefined}
      aria-labelledby={props.ariaLabelledBy || undefined}
      style={
        percent != null
          ? ({ '--Progress__value': `${percent}%` } as React.CSSProperties)
          : undefined
      }
      id={props.id}
    >
      {percent != null && <span className="Progress__value">{percent}%</span>}
    </span>
  );
};
