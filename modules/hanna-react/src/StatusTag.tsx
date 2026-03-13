import React, { ReactNode } from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { WrapperElmProps } from './utils.js';

const colors = {
  normal: '',
  grey: 'color--grey',
  green: 'color--green',
  yellow: 'color--yellow',
  red: 'color--red',
} as const;
export type StatusTagColor = keyof typeof colors;

export type StatusTagProps = {
  /** Not allowed */
  className?: never;
  children?: ReactNode;
  /** Label takes preference over `children` */
  label?: ReactNode;
  color?: StatusTagColor;
  /** Show the colored indicator light. Defaults to true. */
  light?: boolean;
  /** Make the status tag larger. Defaults to false. */
  large?: boolean;
} & WrapperElmProps<'span', 'children'>;

export const StatusTag = (props: StatusTagProps) => {
  const {
    children,
    label = children,
    color = 'normal',
    light = true,
    large,
    wrapperProps,
  } = props;

  return (
    <span
      {...wrapperProps}
      className={modifiedClass(
        'StatusTag',
        [colors[color], large && 'large'],
        (wrapperProps || {}).className
      )}
    >
      {light && <span className="StatusTag__light" aria-hidden="true" />}
      <span className="StatusTag__label">{label}</span>
    </span>
  );
};

export default StatusTag;
