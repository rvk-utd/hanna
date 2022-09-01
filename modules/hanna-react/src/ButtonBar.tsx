import React, { ReactNode } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

export type ButtonBarProps = {
  align?: 'right';
  children: ReactNode;
};

export const ButtonBar = (props: ButtonBarProps) => {
  const { align, children } = props;
  return (
    <div className={getBemClass('ButtonBar', align === 'right' && 'align--right')}>
      {children}
    </div>
  );
};

/** A Splitter token to use directly inside <ButtonBar/> wrappers */
ButtonBar.Split = () => <span className="ButtonBar__split" />;

/**
 * @deprecated Prefer using `ButtonBar.Split` instead.
 *
 * (This export token is only to aid discovery.)
 */
export const ButtonBar__split = ButtonBar.Split;

export default ButtonBar;
