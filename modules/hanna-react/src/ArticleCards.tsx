import React from 'react';
import type { Cleanup } from '@reykjavik/hanna-utils';

import { CardList, ImageCardListProps, ImageCardProps } from './_abstract/_CardList';

export type ArticleCardsItemProps = ImageCardProps;

/** @deprecated Use `ArticleCardsItemProps` instead (Remove in v0.11) */
export type ArticleCardProps = ArticleCardsItemProps;

export type ArticleCardsProps = Cleanup<
  Pick<ImageCardListProps, 'cards' | 'imgPlaceholder'>
>;

export const ArticleCards = (props: ArticleCardsProps) => (
  <CardList
    bemPrefix="ArticleCards"
    standalone
    cards={props.cards}
    imgPlaceholder={props.imgPlaceholder || true}
  />
);

export default ArticleCards;
