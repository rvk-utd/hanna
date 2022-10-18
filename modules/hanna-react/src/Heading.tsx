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
  /**
   * Make an exception and render a `<h1/>` element.
   *
   * This prop is ignore if the `Tag` prop is defined.
   */
  forceH1?: boolean;
} & ComponentLayoutProps;

const Heading = (props: HeadingProps) => {
  const { size = 'normal', align, wide, children } = props;
  const Tag = props.Tag || (props.forceH1 ? 'h1' : 'h2');
  const suppressWarning =
    process.env.NODE_ENV !== 'production' && Tag === 'h1' ? true : undefined;
  return (
    <Tag
      data-dev-forcedH1={suppressWarning}
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
