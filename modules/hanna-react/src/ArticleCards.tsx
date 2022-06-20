import React from 'react';
import type { Resolve } from '@reykjavik/hanna-utils';

import { CardList, ImageCardListProps, ImageCardProps } from './_abstract/_CardList';

export type ArticleCardProps = ImageCardProps;
export type ArticleCardsProps = Resolve<
  Pick<ImageCardListProps, 'cards' | 'imgPlaceholder'>
>;

const ArticleCards = (props: ArticleCardsProps) => (
  <CardList
    bemPrefix="ArticleCards"
    standalone
    cards={props.cards}
    imgPlaceholder={props.imgPlaceholder || true}
  />
);

export default ArticleCards;
