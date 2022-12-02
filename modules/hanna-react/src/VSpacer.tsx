import React, { ReactNode } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
import { EitherObj } from '@reykjavik/hanna-utils';

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
>;

export const VSpacer = (props: VSpacerProps) => {
  const { size, top, bottom, children } = props;

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

  const className = getBemClass('VSpacer', [
    sizeVal,
    topVal && 'top--' + topVal,
    bottomVal && 'bottom--' + bottomVal,
  ]);

  return isWrapper ? (
    <div className={className}>{children}</div>
  ) : (
    <hr className={className} />
  );
};

export default VSpacer;
