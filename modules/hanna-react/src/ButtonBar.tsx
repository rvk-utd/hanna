import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { WrapperElmProps } from './utils.js';

export type ButtonBarProps = {
  align?: 'right';
  children: ReactNode;
} & WrapperElmProps;

export const ButtonBar = (props: ButtonBarProps) => {
  const { align, children, wrapperProps } = props;
  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'ButtonBar',
        align === 'right' && 'align--right',
        (wrapperProps || {}).className
      )}
    >
      {children}
    </div>
  );
};

/** A Splitter token to use directly inside <ButtonBar/> wrappers */
ButtonBar.Split = ({ wrapperProps }: WrapperElmProps) => (
  <span
    {...wrapperProps}
    className={modifiedClass('ButtonBar__split', null, (wrapperProps || {}).className)}
  />
);

/**
 * @deprecated Prefer using `ButtonBar.Split` instead.
 *
 * (This export token is only to aid discovery.)
 */
export const ButtonBar__split = ButtonBar.Split;

export default ButtonBar;
