import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { DeprecatedSeenProp } from './utils/seenEffect.js';
import { ComponentLayoutProps } from './constants.js';
import { WrapperElmProps } from './utils.js';

export type SubHeadingProps = {
  Tag?: 'h2' | 'h3';
  small?: boolean;
  children: ReactNode;
} & ComponentLayoutProps &
  WrapperElmProps &
  DeprecatedSeenProp;

export const SubHeading = (props: SubHeadingProps) => {
  const { small, Tag = 'h2', children, align, wide, wrapperProps } = props;

  return (
    <Tag
      {...wrapperProps}
      className={modifiedClass(
        'SubHeading',
        [
          small && 'small',
          align === 'right' && 'align--' + align,
          !align && wide && 'wide',
        ],
        (wrapperProps || {}).className
      )}
    >
      {children}
    </Tag>
  );
};

export default SubHeading;
