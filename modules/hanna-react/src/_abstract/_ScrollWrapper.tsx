import React, { FC } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import { useIsBrowserSide, WrapperElmProps } from '../utils.js';
import { BemProps } from '../utils/types.js';
import {
  ScrollEdgeDetectOptions,
  useScrollEdgeDetect,
} from '../utils/useScrollEdgeDetect.js';

const scrollOptions: ScrollEdgeDetectOptions = {
  axis: 'horizontal',
};

type ScrollWrapperProps = {
  children: React.ReactNode;
} & BemProps &
  WrapperElmProps;

export const ScrollWrapper: FC<ScrollWrapperProps> = ({
  children,
  modifier,
  bem = 'ScrollWrapper',
  wrapperProps = {},
}) => {
  const isBrowser = useIsBrowserSide();
  const [scrollerRef, scrollAt] = useScrollEdgeDetect<HTMLDivElement>(
    scrollOptions,
    wrapperProps.ref
  );

  const modifiers = isBrowser
    ? [modifier, 'at', scrollAt.start && 'at--start', scrollAt.end && 'at--end']
    : modifier;

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(bem, modifiers, wrapperProps.className)}
      ref={scrollerRef}
    >
      {children}
    </div>
  );
};
