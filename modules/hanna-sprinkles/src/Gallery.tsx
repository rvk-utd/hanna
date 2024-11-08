import './_/initHannaNamespace.js';

import React from 'react';
import ReactDOM from 'react-dom';
import q from '@hugsmidjan/qj/q';
import qq from '@hugsmidjan/qj/qq';
import { Gallery, GalleryItemProps, GalleryProps } from '@reykjavik/hanna-react/Gallery';

import { autoSeenEffectsRefresh, autoSeenEffectWrapperProps } from './_/addSeenEffect.js';
import { getLang } from './_/getLang.js';

const getGalleryData = (elm: HTMLElement): GalleryProps => {
  const lang = getLang(elm);
  const contextual = q<HTMLDivElement>('.Gallery__contextual', elm)?.innerHTML;
  const items: Array<GalleryItemProps> = qq('.GalleryItem', elm).map(
    (itemElm): GalleryItemProps => {
      const contextual = q<HTMLDivElement>('.GalleryItem__contextual', itemElm);
      const contextualChildren = contextual?.innerHTML;
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
        contextual: contextualChildren,
      };
    }
  );

  return { items, lang, contextual };
};

window.Hanna.makeSprinkle({
  name: 'Gallery',

  init: (elm: HTMLElement) => {
    const props = getGalleryData(elm);
    const root = elm;
    elm.getAttributeNames().forEach((attrName) => {
      elm.removeAttribute(attrName);
    });

    ReactDOM.render(
      <Gallery {...props} ssr={false} wrapperProps={autoSeenEffectWrapperProps(elm)} />,
      root,
      () => autoSeenEffectsRefresh()
    );

    return root;
  },
  unmount: (elm: HTMLElement, root) => {
    ReactDOM.unmountComponentAtNode(root);
  },
});
