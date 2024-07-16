import './_/initHannaNamespace.js';

import React from 'react';
import ReactDOM from 'react-dom';
import q from '@hugsmidjan/qj/q';
import { Carousel, CarouselProps } from '@reykjavik/hanna-react/Carousel';

import { autoSeenEffectsRefresh, autoSeenEffectWrapperProps } from './_/addSeenEffect.js';

const getCarouselData = (elm: HTMLElement): CarouselProps => {
  const itemElm = q<HTMLElement>('.Carousel__itemlist', elm);
  return {
    children: itemElm
      ? Array.from(itemElm.children).map((childElm, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: childElm.innerHTML }} />
        ))
      : '',
  };
};

window.Hanna.makeSprinkle({
  name: 'Carousel',

  init: (elm: HTMLElement) => {
    const props = getCarouselData(elm);
    const root = elm;
    elm.getAttributeNames().forEach((attrName) => {
      elm.removeAttribute(attrName);
    });

    ReactDOM.render(
      <Carousel {...props} ssr={false} wrapperProps={autoSeenEffectWrapperProps(elm)} />,
      root,
      () => autoSeenEffectsRefresh()
    );
    return root;
  },
  unmount: (elm: HTMLElement, root) => {
    ReactDOM.unmountComponentAtNode(root);
  },
});
