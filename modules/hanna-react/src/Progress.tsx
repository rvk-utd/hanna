import React from 'react';
import { EitherObj, modifiedClass, OpenRecord } from '@reykjavik/hanna-utils';

/** Maps "size" prop values to className modifiers */
const sizePropToModifier: OpenRecord<ProgressProps['size'], string | undefined> = {
  xsmall: 'size--xsmall',
  small: 'size--small',
  medium: undefined,
  large: 'size--large',
};

export type ProgressProps = {
  /** Custom class-name for the progress indicator element */
  className?: string;

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
} & EitherObj<
  {
    /**
     * Renders the progress indicator as a circular spinner.
     */
    spinner?: false;
  },
  {
    /**
     * Renders the progress indicator as a circular spinner.
     */
    spinner: true;

    /**
     * The size of the progress spinner
     *
     * Default: `medium`
     */
    size?: 'xsmall' | 'small' | 'medium' | 'large';
  }
>;

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
        [
          props.spinner && 'spinner',
          done && 'done',
          props.size && sizePropToModifier[props.size],
        ],
        props.className
      )}
      role="progressbar"
      aria-valuemax={steps}
      // NOTE: Progress' indeterminate state is derived from this prop being absent
      aria-valuenow={valueNow}
      aria-valuetext={valueText}
      aria-label={props.ariaLabel || undefined}
      aria-labelledby={props.ariaLabelledBy || undefined}
      id={props.id}
    >
      {valueText && <span className="Progress__value">{valueText}</span>}
    </span>
  );
};
