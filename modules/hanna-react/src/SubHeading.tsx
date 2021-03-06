import React, { ReactNode } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { SeenProp, useSeenEffect } from './utils/seenEffect';
import { ComponentLayoutProps } from './constants';

export type SubHeadingProps = {
  Tag?: 'h2' | 'h3';
  small?: boolean;
  children: ReactNode;
} & ComponentLayoutProps &
  SeenProp;

const SubHeading = (props: SubHeadingProps) => {
  const { small, Tag = 'h2', children, align, wide, startSeen } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <Tag
      className={getBemClass('SubHeading', [
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
