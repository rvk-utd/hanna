import React, { ReactElement } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { ButtonProps } from './_abstract/_Button.js';
import { SeenProp, useSeenEffect } from './utils/seenEffect.js';
import ButtonTertiary from './ButtonTertiary.js';
import { WrapperElmProps } from './utils.js';

export type LabeledTextBlockProps = {
  label: string;
  summary: string | ReactElement;
  wide?: boolean;
  buttons?: Array<ButtonProps>;
} & WrapperElmProps &
  SeenProp;

export const LabeledTextBlock = (props: LabeledTextBlockProps) => {
  const { label, summary, wide, buttons = [], startSeen, wrapperProps } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'LabeledTextBlock',
        wide && 'wide',
        (wrapperProps || {}).className
      )}
      ref={ref}
    >
      <h2 className="LabeledTextBlock__label">{label}</h2>
      <div className="LabeledTextBlock__summary">
        {summary}
        {buttons.map((button: ButtonProps, i) => (
          <ButtonTertiary key={i} {...button} />
        ))}
      </div>
    </div>
  );
};

export default LabeledTextBlock;
