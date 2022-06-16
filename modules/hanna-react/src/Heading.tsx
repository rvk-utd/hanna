import React, { ReactNode } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { ComponentLayoutProps } from './constants';

const sizes = {
  small: 'small',
  /** Default value */
  normal: '',
  large: 'large',
} as const;
type HeadingSize = keyof typeof sizes;

export type HeadingProps = {
  Tag?: 'h2' | 'h3';
  size?: HeadingSize;
  children: ReactNode;
} & ComponentLayoutProps;

const Heading = (props: HeadingProps) => {
  const { size = 'normal', Tag = 'h2', align, wide, children } = props;

  return (
    <Tag
      className={getBemClass('Heading', [
        sizes[size],
        align === 'right' && 'align--' + align,
        !align && wide && 'wide',
      ])}
    >
      {children}
    </Tag>
  );
};

export default Heading;
