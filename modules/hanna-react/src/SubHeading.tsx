import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { SeenProp, useSeenEffect } from './utils/seenEffect.js';
import { ComponentLayoutProps } from './constants.js';

export type SubHeadingProps = {
  Tag?: 'h2' | 'h3';
  small?: boolean;
  children: ReactNode;
} & ComponentLayoutProps &
  SeenProp;

export const SubHeading = (props: SubHeadingProps) => {
  const { small, Tag = 'h2', children, align, wide, startSeen } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <Tag
      className={modifiedClass('SubHeading', [
        small && 'small',
        align === 'right' && 'align--' + align,
        !align && wide && 'wide',
      ])}
      ref={ref}
    >
      {children}
    </Tag>
  );
};

export default SubHeading;
