import React from 'react';

import { AbstractCarousel } from './_abstract/_AbstractCarousel.js';
import {
  ArticleCarouselCard,
  ArticleCarouselCardProps,
  ArticleCarouselImageProps,
} from './ArticleCarousel/_ArticleCarouselCard.js';
import { SeenProp } from './utils/seenEffect.js';
import { SSRSupport } from './utils.js';

export type ArticleCarouselProps = {
  items: Array<ArticleCarouselCardProps>;
  title?: string;
  moreLabel?: string;
  ssr?: SSRSupport;
} & SeenProp;

export type { ArticleCarouselCardProps, ArticleCarouselImageProps };

export const ArticleCarousel = (props: ArticleCarouselProps) => {
  const { title, items, moreLabel, ssr, startSeen } = props;
  return (
    <AbstractCarousel
      bem="ArticleCarousel"
      title={title}
      items={items}
      Component={ArticleCarouselCard}
      ComponentProps={{ moreLabel }}
      ssr={ssr}
      startSeen={startSeen}
    />
  );
};

export default ArticleCarousel;
