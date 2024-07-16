import './_/initHannaNamespace.js';

import React from 'react';
import ReactDOM from 'react-dom';
import q from '@hugsmidjan/qj/q';
import { Carousel, CarouselProps } from '@reykjavik/hanna-react/Carousel';

import { autoSeenEffectsRefresh, autoSeenEffectWrapperProps } from './_/addSeenEffect.js';

const getCarouselData = (elm: HTMLElement): CarouselProps | undefined => {
  const itemlistElm = q<HTMLElement>('.Carousel__itemlist', elm);
  if (!itemlistElm) {
    return;
  }
  return {
    childrenHTML: itemlistElm.innerHTML,
  };
};

window.Hanna.makeSprinkle({
  name: 'Carousel',

  init: (elm: HTMLElement) => {
    const props = getCarouselData(elm);
    if (!props) {
      return;
    }

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
    root && ReactDOM.unmountComponentAtNode(root);
  },
});
