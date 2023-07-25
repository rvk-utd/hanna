import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

// ---------------------------------------------------------------------------

export type WizardStepperStep = {
  label: string;

  /**
   * Should the step be clickable?
   *
   * * `true` = The items becomes clickable as allowed by the `activeStep`,
   *    `disableBacktrack` and `allowForwardSkip` props.
   * * `false | undefined` =  Never clickable, regardless of `activeStep`.
   * * `"always"` = Always clickable regardless of `activeStep` or other props.
   */
  clickable?: boolean | 'always';

  /**
   * Flags the item as having a non-default done state
   *
   * * `undefined` = automatically set "done" on items before `activeStep`
   * * `true` = Always flag as "done", regardless of `activeStep`
   * * `false` = Never flag as "done", regardless of `activeStep`
   */
  done?: boolean;

  /**
   * Flags the step as not part of the numbering scheme
   */
  neutral?: boolean;
};

export type WizardStepperProps = {
  steps: ReadonlyArray<WizardStepperStep>;
  /** Zero-based index of the active (current) step */
  activeStep?: number;
  /** By default, clickable steps remain clickable once "done" */
  disableBacktrack?: boolean;
  /** By default, clickable steps after the active step are not immediately clickable */
  allowForwardSkip?: boolean;
  onClick: (clickedIndex: number) => void;
};

export const WizardStepper = (props: WizardStepperProps) => {
  const { steps, activeStep = -1, allowForwardSkip, disableBacktrack, onClick } = props;
  return (
    <div className={modifiedClass('WizardStepper', activeStep === -1 && 'preview')}>
      {steps.map((step, i) => {
        const { clickable, done, neutral } = step;
        const label = step.label || '…';
        const stepClass = modifiedClass('WizardStepper__step', [
          (done || (done == null && i < activeStep)) && 'done',
          neutral && 'neutral',
        ]);
        const isClickable =
          clickable === 'always' ||
          (clickable &&
            (activeStep === i ||
              (i > activeStep && allowForwardSkip) ||
              (i < activeStep && !disableBacktrack)));
        const ariaCurrent = activeStep === i ? 'step' : undefined;

        return (
          <React.Fragment key={i}>
            {isClickable ? (
              <button
                type="button"
                className={stepClass}
                onClick={() => onClick(i)}
                aria-current={ariaCurrent}
              >
                {label}
              </button>
            ) : (
              <span className={stepClass} aria-current={ariaCurrent}>
                {' '}
                {label}{' '}
              </span>
            )}{' '}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default WizardStepper;
