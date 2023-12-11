import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { DeprecatedSeenProp } from './utils/seenEffect.js';
import { WrapperElmProps } from './utils.js';

export type PageHeadingProps = {
  Tag?: 'h1' | 'h2';
  align?: 'right';
  small?: boolean;
  children: ReactNode;
} & WrapperElmProps &
  DeprecatedSeenProp;

export const PageHeading = (props: PageHeadingProps) => {
  const { Tag = 'h1', align, small, children, wrapperProps } = props;

  return (
    <Tag
      {...wrapperProps}
      className={modifiedClass(
        'PageHeading',
        [small && 'small', align === 'right' && `align--${align}`],
        (wrapperProps || {}).className
      )}
    >
      {children}
    </Tag>
  );
};

export default PageHeading;
