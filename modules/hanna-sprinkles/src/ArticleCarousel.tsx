import './_/initHannaNamespace.js';

import React from 'react';
import ReactDOM from 'react-dom';
import q from '@hugsmidjan/qj/q';
import qq from '@hugsmidjan/qj/qq';
import {
  ArticleCarousel,
  ArticleCarouselCardProps,
  ArticleCarouselImageProps,
  ArticleCarouselProps,
} from '@reykjavik/hanna-react/ArticleCarousel';

import { autoSeenEffectsRefresh, autoSeenEffectWrapperProps } from './_/addSeenEffect.js';

const getArticleCarouselData = (elm: HTMLElement) => {
  const moreLabel = q('.ArticleCarouselCard__morelink', elm)?.textContent || '';
  const title = q('.ArticleCarousel__title', elm)?.textContent || '';
  const items = qq<HTMLElement>('.ArticleCarouselCard', elm).map(
    (itemElm): ArticleCarouselCardProps => {
      const img = q<HTMLImageElement>('.ArticleCarouselCard__illustration img', itemElm);
      const photo = !!q('.ArticleCarouselCard__illustration--photo', itemElm);
      const image: ArticleCarouselImageProps | undefined = img && {
        src: img.src,
        altText: img.alt,
        photo,
      };
      const color = itemElm.dataset.color as ArticleCarouselCardProps['color'];
      const theme = !color
        ? (itemElm.dataset.colorTheme as ArticleCarouselCardProps['theme'])
        : undefined;
      const linkElm = q<HTMLAnchorElement>('.ArticleCarouselCard__link', itemElm);
      const href = linkElm?.href || '';
      const target = linkElm?.target || undefined;
      const title = q('.ArticleCarouselCard__title', itemElm)?.textContent || '';
      const date = q('.ArticleCarouselCard__date', itemElm)?.textContent || undefined;
      const summary = q('.ArticleCarouselCard__summary', itemElm)?.textContent || '';
      return { href, target, title, date, summary, image, color, theme };
    }
  );

  return {
    props: { title, items, moreLabel } satisfies ArticleCarouselProps,
    itemContextuals: qq('.ArticleCarouselCard', elm).map((itemElm) =>
      q('.ArticleCarouselCard__contextual', itemElm)
    ),
  };
};

window.Hanna.makeSprinkle({
  name: 'ArticleCarousel',

  init: (elm: HTMLElement) => {
    const { props, itemContextuals } = getArticleCarouselData(elm);
    const root = elm;
    elm.getAttributeNames().forEach((attrName) => {
      elm.removeAttribute(attrName);
    });

    ReactDOM.render(
      <ArticleCarousel
        {...props}
        ssr={false}
        wrapperProps={autoSeenEffectWrapperProps(elm)}
      />,
      root,
      () => autoSeenEffectsRefresh()
    );

    const galleryItems = qq<HTMLDivElement>('.ArticleCarouselCard', root);
    itemContextuals.forEach((contextual, idx) => {
      if (contextual) {
        galleryItems[idx]!.insertAdjacentElement('afterbegin', contextual);
      }
    });

    return root;
  },
  unmount: (elm: HTMLElement, root) => {
    ReactDOM.unmountComponentAtNode(root);
  },
});
