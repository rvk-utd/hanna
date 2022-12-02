import React, { ReactElement } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { ButtonProps } from './_abstract/_Button';
import { SeenProp, useSeenEffect } from './utils/seenEffect';
import ButtonTertiary from './ButtonTertiary';

export type LabeledTextBlockProps = {
  label: string;
  summary: string | ReactElement;
  wide?: boolean;
  buttons?: Array<ButtonProps>;
} & SeenProp;

export const LabeledTextBlock = (props: LabeledTextBlockProps) => {
  const { label, summary, wide, buttons = [], startSeen } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div className={getBemClass('LabeledTextBlock', wide && 'wide')} ref={ref}>
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
