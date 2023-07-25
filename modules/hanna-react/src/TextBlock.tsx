import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { SeenProp, useSeenEffect } from './utils/seenEffect.js';
import { ComponentLayoutProps } from './constants.js';

export type TextBlockProps = ComponentLayoutProps & {
  /** Make H2 headings float to the left
   *
   * Overrides the `align` and `wide` prop and automatically sets `align` to `right`
   */
  labelled?: boolean;
  /** Sets a smaller text-size */
  small?: boolean;
  children: ReactNode;
} & SeenProp;

export const TextBlock = (props: TextBlockProps) => {
  const { children, align, labelled, wide, small, startSeen } = props;

  const rightAligned = align === 'right' || labelled;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div
      className={modifiedClass('TextBlock', [
        labelled && 'labelled',
        rightAligned && 'align--right',
        wide && !rightAligned && 'wide',
        small && !labelled && 'small',
      ])}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default TextBlock;
