import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { ComponentLayoutProps } from './constants.js';
import { WrapperElmProps } from './utils.js';

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
} & ComponentLayoutProps &
  WrapperElmProps;

export const Heading = (props: HeadingProps) => {
  const { size = 'normal', align, wide, children, wrapperProps } = props;
  const Tag = props.Tag || (props.forceH1 ? 'h1' : 'h2');
  const suppressWarning =
    process.env.NODE_ENV !== 'production' && Tag === 'h1' ? true : undefined;

  return (
    <Tag
      {...wrapperProps}
      data-dev-forcedh1={suppressWarning}
      className={modifiedClass('Heading', [
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
