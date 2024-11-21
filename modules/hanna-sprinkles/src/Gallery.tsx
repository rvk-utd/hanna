import './_/initHannaNamespace.js';

import React from 'react';
import ReactDOM from 'react-dom';
import q from '@hugsmidjan/qj/q';
import qq from '@hugsmidjan/qj/qq';
import { Gallery, GalleryItemProps, GalleryProps } from '@reykjavik/hanna-react/Gallery';

import { autoSeenEffectsRefresh, autoSeenEffectWrapperProps } from './_/addSeenEffect.js';
import { getLang } from './_/getLang.js';

const getGalleryData = (elm: HTMLElement) => {
  const lang = getLang(elm);
  const items: Array<GalleryItemProps> = qq('.GalleryItem', elm).map(
    (itemElm): GalleryItemProps => {
      const img = q<HTMLImageElement>('.GalleryItem__image img', itemElm);
      const caption = q('.GalleryItem__caption', itemElm)?.textContent || undefined;
      const description =
        q('.GalleryItem__description', itemElm)?.textContent || undefined;
      const largeImageSrc =
        q<HTMLAnchorElement>('a.GalleryItem__button', itemElm)?.href || undefined;

      return {
        altText: img ? img.alt : undefined,
        src: img ? img.src : undefined,
        caption,
        largeImageSrc,
        description,
      };
    }
  );

  return {
    props: { items, lang } satisfies GalleryProps,
    contextual: q('.Gallery__contextual', elm),
    itemsContextuals: qq('.GalleryItem', elm).map((itemElm) =>
      q('.GalleryItem__contextual', itemElm)
    ),
  };
};

window.Hanna.makeSprinkle({
  name: 'Gallery',

  init: (elm: HTMLElement) => {
    const { props, contextual, itemsContextuals } = getGalleryData(elm);
    const root = elm;
    elm.getAttributeNames().forEach((attrName) => {
      elm.removeAttribute(attrName);
    });

    ReactDOM.render(
      <Gallery {...props} ssr={false} wrapperProps={autoSeenEffectWrapperProps(elm)} />,
      root,
      () => autoSeenEffectsRefresh()
    );
    if (contextual) {
      q('.Gallery', root)!.insertAdjacentElement('afterbegin', contextual);
    }
    const galleryItems = qq<HTMLDivElement>('.GalleryItem', root);
    itemsContextuals.forEach((contextual, idx) => {
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
