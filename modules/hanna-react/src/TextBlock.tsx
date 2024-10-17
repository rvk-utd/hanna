import React, { ReactNode } from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { DeprecatedSeenProp } from './utils/seenEffect.js';
import { ComponentLayoutProps } from './constants.js';
import { WrapperElmProps } from './utils.js';

export type TextBlockProps = ComponentLayoutProps & {
  /** Make H2 headings float to the left
   *
   * Overrides the `align` and `wide` prop and automatically sets `align` to `right`
   */
  labelled?: boolean;
  /** Sets a smaller text-size */
  small?: boolean;
  children: ReactNode;
} & WrapperElmProps &
  DeprecatedSeenProp;

export const TextBlock = (props: TextBlockProps) => {
  const { children, align, labelled, wide, small, wrapperProps } = props;

  const rightAligned = align === 'right' || labelled;

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'TextBlock',
        [
          labelled && 'labelled',
          rightAligned && 'align--right',
          wide && !rightAligned && 'wide',
          small && !labelled && 'small',
        ],
        (wrapperProps || {}).className
      )}
    >
      {children}
    </div>
  );
};

export default TextBlock;
