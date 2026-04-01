import React, { ReactNode } from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { WrapperElmProps } from './utils.js';

const colors = {
  none: undefined,
  blue: 'color--blue',
  green: 'color--green',
  yellow: 'color--yellow',
  red: 'color--red',
} as const;
export type StatusTagColor = keyof typeof colors;

export type StatusTagProps = {
  /** Label takes preference over `children` */
  label?: ReactNode;

  /** Default: 'none' (grey) */
  color?: StatusTagColor;

  /** Hides/removes the colored indicator light ball/bulp. */
  light?: 'off';

  /** Make the status tag larger. Defaults to false. */
  large?: boolean;

  children?: ReactNode;
} & WrapperElmProps<'span', 'children'>;

export const StatusTag = (props: StatusTagProps) => {
  const { children, label, color, light, large, wrapperProps } = props;

  return (
    <span
      {...wrapperProps}
      className={modifiedClass(
        'StatusTag',
        [colors[color || 'none'], large && 'large', light === 'off' && 'light--off'],
        (wrapperProps || {}).className
      )}
    >
      <span className="StatusTag__label">{label || children}</span>
    </span>
  );
};
