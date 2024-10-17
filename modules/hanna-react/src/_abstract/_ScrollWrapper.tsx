import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

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

export const ScrollWrapper = (props: ScrollWrapperProps & { innerWrap?: true }) => {
  const {
    innerWrap,
    children,
    modifier,
    bem = 'ScrollWrapper',
    wrapperProps = {},
  } = props;
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
      ref={!innerWrap ? scrollerRef : undefined}
    >
      {isBrowser && innerWrap ? (
        <div className={`${bem}__scroller`} ref={scrollerRef}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};
