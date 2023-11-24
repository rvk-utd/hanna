import React, { ReactNode } from 'react';
import { EitherObj } from '@reykjavik/hanna-utils';

const HTTag = 'hidden-tiger' as 'div';

type HiddenTigerProps = {
  htmlDemo?: ReactNode | (() => ReactNode);
} & EitherObj<{ visibleDemo: ReactNode | (() => ReactNode) }, { children: ReactNode }>;

export const HiddenTiger = (props: HiddenTigerProps) => {
  const { htmlDemo, visibleDemo, children } = props;
  const visibleContent =
    typeof visibleDemo === 'function' ? visibleDemo() : visibleDemo || children;
  const htmlContent = typeof htmlDemo === 'function' ? htmlDemo() : htmlDemo;
  return (
    <>
      {visibleContent && <HTTag>{visibleContent}</HTTag>}
      {htmlContent && <HTTag hidden>{htmlContent}</HTTag>}
    </>
  );
};
