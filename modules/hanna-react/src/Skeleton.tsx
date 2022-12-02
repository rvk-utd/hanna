import React, { ReactElement } from 'react';
import range from '@hugsmidjan/qj/range';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

const makeRenderSkeleton =
  (props: { height?: number; text?: boolean; gap?: number }) => (key?: number) =>
    (
      <span
        key={key}
        className={getBemClass('Skeleton', [
          props.text && 'text',
          props.height && 'height--' + props.height,
          props.gap && 'gap--' + props.gap,
        ])}
      />
    );

const minmax = (num = 0, max = 100, min = 1) => {
  num = Math.min(Math.max(Math.round(num), min), max);
  return num > min ? num : undefined;
};

// ---------------------------------------------------------------------------

export type SkeletonProps = {
  text?: boolean;
  /* prettier-ignore */
  height?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
  /* prettier-ignore */
  items?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
  gap?: 1 | 2 | 3 | 4 | 5;
};

export const Skeleton = (props: SkeletonProps) => {
  const height = minmax(props.height, 40);

  const renderSkeleton = makeRenderSkeleton({
    height,
    text: props.text,
    gap: minmax(props.gap, 5, 0),
  });

  const items = minmax(props.items, 20) || 1;
  if (items > 1) {
    return <>{range(1, items).map(renderSkeleton)}</>;
  }
  return renderSkeleton();
};

export default Skeleton;

// ---------------------------------------------------------------------------
// TS sugar to allow components to specify something like
// `string | SkeletonText` as their allowed input.
// ---------------------------------------------------------------------------

declare const _SkeletonBlock__Brand: unique symbol;
/** The `<Skeleton height={X}/>` element returned by `Skeleton.block(X)` */
export type SkeletonBlock = ReactElement & { [_SkeletonBlock__Brand]: true };

/** Returns a single `<Skeleton height={X}/>` element of branded type `SkeletonBlock` */
Skeleton.block = (height?: SkeletonProps['height']): SkeletonBlock =>
  (<Skeleton height={height} />) as SkeletonBlock;

declare const _SkeletonText__Brand: unique symbol;
/** The `<Skeleton text height={X}/>` element returned by `Skeleton.text(X)` */
export type SkeletonText = ReactElement & { [_SkeletonText__Brand]: true };

/** Returns a single `<Skeleton text height={X}/>` element of branded type `SkeletonText` */
Skeleton.text = (height?: SkeletonProps['height']): SkeletonText =>
  (<Skeleton text height={height} />) as SkeletonText;
