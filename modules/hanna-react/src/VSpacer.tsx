import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { EitherObj } from '@reykjavik/hanna-utils';

import { HTMLProps, WrapperElmProps } from './utils.js';

const sizes = {
  none: 'none',
  small: 'small',
  default: '',
  medium: '',
  large: 'large',
  xlarge: 'xlarge',
} as const;
type VSpacerSize = keyof typeof sizes;

type VSpacerSizePos = Exclude<VSpacerSize, 'none'>;

const hasChildren = (children?: ReactNode): true | undefined =>
  (children && !(Array.isArray(children) && !children.length)) || undefined;

const normalizeProp = (value: VSpacerSize | undefined, exclude?: string) =>
  value && value !== exclude ? sizes[value] : undefined;

export type VSpacerProps = EitherObj<
  {
    size?: VSpacerSizePos;
  },
  {
    children: ReactNode;
    size?: VSpacerSizePos;
    top?: VSpacerSize;
    bottom?: VSpacerSize;
  }
> &
  WrapperElmProps;

export const VSpacer = (props: VSpacerProps) => {
  const { size, top, bottom, children, wrapperProps } = props;

  const isWrapper = hasChildren(children);

  let topVal = normalizeProp(isWrapper && top);
  let bottomVal = normalizeProp(isWrapper && bottom);
  let sizeVal = !(topVal && bottomVal) && normalizeProp(size, 'none');

  // collapse effectively-duplicate class modifiers
  if (!sizeVal && topVal === bottomVal && topVal !== 'none') {
    sizeVal = topVal;
    topVal = bottomVal = undefined;
  } else if (sizeVal) {
    if (sizeVal === topVal) {
      sizeVal = topVal;
      topVal = undefined;
    }
    if (sizeVal === bottomVal) {
      sizeVal = bottomVal;
      bottomVal = undefined;
    }
  }

  const className = modifiedClass(
    'VSpacer',
    [sizeVal, topVal && `top--${topVal}`, bottomVal && `bottom--${bottomVal}`],
    (wrapperProps || {}).className
  );

  return isWrapper ? (
    <div {...wrapperProps} className={className}>
      {children}
    </div>
  ) : (
    <hr {...(wrapperProps as HTMLProps<'hr'>)} className={className} />
  );
};

export default VSpacer;
