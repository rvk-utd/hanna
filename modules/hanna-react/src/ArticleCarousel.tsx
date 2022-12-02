import React from 'react';
import { SSRSupport } from '@hugsmidjan/react/hooks';

import { AbstractCarousel } from './_abstract/_AbstractCarousel';
import {
  ArticleCarouselCard,
  ArticleCarouselCardProps,
  ArticleCarouselImageProps,
} from './ArticleCarousel/_ArticleCarouselCard';
import { SeenProp } from './utils/seenEffect';

export type ArticleCarouselProps = {
  items: Array<ArticleCarouselCardProps>;
  title?: string;
  moreLabel?: string;
  ssr?: SSRSupport;
} & SeenProp;

export type { ArticleCarouselCardProps, ArticleCarouselImageProps };

const ArticleCarousel = (props: ArticleCarouselProps) => {
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
