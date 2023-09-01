import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { SeenProp, useSeenEffect } from './utils/seenEffect.js';
import { WrapperElmProps } from './utils.js';

export type PageHeadingProps = {
  Tag?: 'h1' | 'h2';
  align?: 'right';
  small?: boolean;
  children: ReactNode;
} & WrapperElmProps &
  SeenProp;

export const PageHeading = (props: PageHeadingProps) => {
  const { Tag = 'h1', align, small, children, startSeen, wrapperProps } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <Tag
      {...wrapperProps}
      className={modifiedClass(
        'PageHeading',
        [small && 'small', align === 'right' && 'align--' + align],
        (wrapperProps || {}).className
      )}
      ref={ref}
    >
      {children}
    </Tag>
  );
};

export default PageHeading;
