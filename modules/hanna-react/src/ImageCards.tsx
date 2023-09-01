import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import {
  CardList,
  CardListSummaryProps,
  ImageCardListProps,
  ImageCardProps as _ImageCardProps,
} from './_abstract/_CardList.js';
import { SeenProp, useSeenEffect } from './utils/seenEffect.js';
import { WrapperElmProps } from './utils.js';

export type ImageCardsItemProps = _ImageCardProps;

/** @deprecated Use `ImageCardsItemProps` instead.  (Will be removed in v0.11) */
export type ImageCardProps = ImageCardsItemProps;

export type ImageCardsProps = ImageCardListProps &
  CardListSummaryProps & { background?: boolean } & WrapperElmProps &
  SeenProp;

export const ImageCards = (props: ImageCardsProps) => {
  const { background, startSeen, wrapperProps, ...cardListProps } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'ImageCards',
        background && 'background',
        (wrapperProps || {}).className
      )}
      ref={ref}
    >
      <CardList
        {...cardListProps}
        bemPrefix="ImageCards"
        imgPlaceholder={props.imgPlaceholder || true}
      />
    </div>
  );
};

export default ImageCards;
