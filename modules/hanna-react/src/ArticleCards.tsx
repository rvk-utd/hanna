import React from 'react';

import { CardList, ImageCardListProps, ImageCardProps } from './_abstract/_CardList.js';

export type ArticleCardsItemProps = ImageCardProps;

/** @deprecated Use `ArticleCardsItemProps` instead (Remove in v0.11) */
export type ArticleCardProps = ArticleCardsItemProps;

export type ArticleCardsProps = Pick<ImageCardListProps, 'cards' | 'imgPlaceholder'>;

export const ArticleCards = (props: ArticleCardsProps) => (
  <CardList
    bemPrefix="ArticleCards"
    standalone
    cards={props.cards}
    imgPlaceholder={props.imgPlaceholder || true}
  />
);

export default ArticleCards;
