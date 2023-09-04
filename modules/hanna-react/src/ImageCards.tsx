import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

import {
  CardList,
  CardListSummaryProps,
  ImageCardListProps,
  ImageCardProps as _ImageCardProps,
} from './_abstract/_CardList.js';
import { DeprecatedSeenProp } from './utils/seenEffect.js';
import { WrapperElmProps } from './utils.js';

export type ImageCardsItemProps = _ImageCardProps;

/** @deprecated Use `ImageCardsItemProps` instead.  (Will be removed in v0.11) */
export type ImageCardProps = ImageCardsItemProps;

export type ImageCardsProps = ImageCardListProps &
  CardListSummaryProps & { background?: boolean } & WrapperElmProps &
  DeprecatedSeenProp;

export const ImageCards = (props: ImageCardsProps) => {
  const { background, wrapperProps, ...cardListProps } = props;

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'ImageCards',
        background && 'background',
        (wrapperProps || {}).className
      )}
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
