import React, { ReactElement } from 'react';
import range from '@hugsmidjan/qj/range';
import { EitherObj, modifiedClass } from '@reykjavik/hanna-utils';

import { WrapperElmProps } from './utils.js';

/**
  Rounds the input number, caps it at max. If it's below min, returns undefined
*/
const minmax = (num: number | undefined, max: number, min: number) => {
  if (num == null || isNaN(num)) {
    return;
  }
  num = Math.round(num);
  return num > max ? max : num >= min ? num : undefined;
};

// ---------------------------------------------------------------------------

export type SkeletonProps = {
  /**
   * Set this to `true` to render "lines of text", instead of a whole block
   */
  text?: boolean;

  circle?: boolean;

  /**
   * Sets the height of the skeleton block or the number of lines of text.
   *
   *  Each unit is approximately one "standard line-height"
   *
   * Deafult: `1`  (except for "circle" mode where the minimum height is `2`)
   */
  // prettier-ignore
  height?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
  /**
   * Sets the space between multiple skeleton `items`, in units of
   * "standard line-height"
   *
   *  Default: `3` (except for "circle" mode where the default  `1`)
   */
  gap?: 1 | 2 | 3 | 4 | 5;
} & EitherObj<
  {
    /**
     * Optionally render mutiple skeletons, of the same `type` and `height`
     */
    // prettier-ignore
    items?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
  },
  WrapperElmProps
>;

/**
 * Renders a "skeleton" block (optionally styled as "lines of text"),
 * as a placeholder for content that is loading.
 */
// eslint-disable-next-line complexity
export const Skeleton = (props: SkeletonProps) => {
  const { wrapperProps, text, circle } = props;
  const height = minmax(props.height, 20, circle ? 3 : 2);

  const gap = minmax(props.gap, 5, 1);
  const items = minmax(props.items, 20, 2) || 1;

  if (process.env.NODE_ENV !== 'production') {
    if (text && circle) {
      console.warn(
        '<Skeleton />: Do not use both `text` and `circle` props at the same time'
      );
    }
    if (circle && items > 1) {
      console.warn('<Skeleton />: Do not use `items` prop with `circle` variant');
    }
    if (items > 1 && wrapperProps) {
      console.warn('<Skeleton />: Do not use `wrapperProps` prop with `circle` variant');
    }
  }

  const className = modifiedClass(
    'Skeleton',
    [
      circle && 'circle',
      text && !circle && 'text',
      height && `height--${height}`,
      gap && `gap--${gap}`,
    ],
    ((items === 1 && wrapperProps) || {}).className
  );

  if (items > 1 && !circle) {
    return (
      <>
        {range(1, items).map((key) => (
          <span key={key} className={className} />
        ))}
      </>
    );
  }
  return <span {...wrapperProps} className={className} />;
};

export default Skeleton;

// ---------------------------------------------------------------------------
// TS sugar to allow components to specify something like
// `string | SkeletonText` as their allowed input.
// ---------------------------------------------------------------------------

declare const _SkeletonBlock__Brand: unique symbol;
/**
 * The `<Skeleton height={X}/>` element returned by `Skeleton.block(X)`
 */
export type SkeletonBlock = ReactElement & { [_SkeletonBlock__Brand]: true };

/**
 * Returns a single `<Skeleton height={X} text={false} />` element of branded
 * type `SkeletonBlock`
 */
Skeleton.block = (height?: SkeletonProps['height']): SkeletonBlock =>
  (<Skeleton height={height} />) as SkeletonBlock;

declare const _SkeletonText__Brand: unique symbol;
/**
 * The `<Skeleton text height={X}/>` element returned by `Skeleton.text(X)`
 */
export type SkeletonText = ReactElement & { [_SkeletonText__Brand]: true };

/**
 * Returns a single `<Skeleton text height={X} />` element of branded
 * type `SkeletonText`
 */
Skeleton.text = (height?: SkeletonProps['height']): SkeletonText =>
  (<Skeleton text height={height} />) as SkeletonText;

declare const _SkeletonCircle__Brand: unique symbol;
/**
 * The `<Skeleton circle height={X}/>` element returned by `Skeleton.circle(X)`
 */
export type SkeletonCircle = ReactElement & { [_SkeletonCircle__Brand]: true };

/**
 * Returns a single `<Skeleto circlen height={X} />` element of branded
 * type `SkeletonCircle`
 */
Skeleton.circle = (height?: SkeletonProps['height']): SkeletonCircle =>
  (<Skeleton circle height={height} />) as SkeletonCircle;
