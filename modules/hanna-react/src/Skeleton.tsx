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
   * Adds rounded corners to block-thpe skeletons
   *
   * (Has no effect on `text` or `circle` variants)
   */
  rounded?: boolean;

  /**
   * Flag to switch to a negative rendering mode optimized for dark backgrounds
   */
  negative?: boolean;

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
  const { wrapperProps, text, circle, rounded, negative } = props;
  const height = minmax(props.height, 20, circle ? 3 : 2);

  const gap = minmax(props.gap, 5, 1);
  const items = minmax(props.items, 20, 2) || 1;

  if (process.env.NODE_ENV !== 'production') {
    if (text && circle) {
      console.warn(
        '<Skeleton />: Do not use both `text` and `circle` props at the same time'
      );
    }
    if (rounded && (text || circle)) {
      console.warn(
        '<Skeleton />: The `roundeed` prop has no effect on `text` and `circle` variants'
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
      negative && 'negative',
      circle && 'circle',
      text && !circle && 'text',
      rounded && !(circle || text) && 'rounded',
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
 * The `<Skeleton {...props} />` element returned by `Skeleton.block(props)`
 */
export type SkeletonBlock = ReactElement & { [_SkeletonBlock__Brand]: true };

/**
 * Returns a single `<Skeleton {...props} />` element of branded
 * type `SkeletonBlock`
 */
Skeleton.block = (
  /** A bare height prop, or a limited subset of SkeletonProps */
  props?: SkeletonProps['height'] | Pick<SkeletonProps, 'height' | 'negative' | 'rounded'>
): SkeletonBlock => {
  if (typeof props === 'number') {
    props = { height: props };
  }
  return (<Skeleton {...props} />) as SkeletonBlock;
};

declare const _SkeletonText__Brand: unique symbol;
/**
 * The `<Skeleton {...props} text />` element returned by `Skeleton.text(props)`
 */
export type SkeletonText = ReactElement & { [_SkeletonText__Brand]: true };

/**
 * Returns a single `<Skeleton {...props} text />` element of branded
 * type `SkeletonText`
 */
Skeleton.text = (
  /** A bare height prop, or a limited subset of SkeletonProps */
  props?: SkeletonProps['height'] | Pick<SkeletonProps, 'height' | 'negative'>
): SkeletonText => {
  if (typeof props === 'number') {
    props = { height: props };
  }
  return (<Skeleton {...props} text />) as SkeletonText;
};

declare const _SkeletonCircle__Brand: unique symbol;
/**
 * The `<Skeleton {...props} circle />` element returned by `Skeleton.circle(props)`
 */
export type SkeletonCircle = ReactElement & { [_SkeletonCircle__Brand]: true };

/**
 * Returns a single `<Skeleton {...props} circle />` element of branded
 * type `SkeletonCircle`
 */
Skeleton.circle = (
  /** A bare height prop, or a limited subset of SkeletonProps */
  props?: SkeletonProps['height'] | Pick<SkeletonProps, 'height' | 'negative'>
): SkeletonCircle => {
  if (typeof props === 'number') {
    props = { height: props };
  }
  return (<Skeleton {...props} circle />) as SkeletonCircle;
};
