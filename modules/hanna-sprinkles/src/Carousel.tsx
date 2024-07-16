import './_/initHannaNamespace.js';

import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom';
import qq from '@hugsmidjan/qj/qq';
import { Carousel, CarouselProps } from '@reykjavik/hanna-react/Carousel';

import { autoSeenEffectsRefresh, autoSeenEffectWrapperProps } from './_/addSeenEffect.js';

const getCarouselData = (elm: HTMLElement): CarouselProps => {
  const items = qq<HTMLElement>('.Carousel__itemlist', elm).map(
    (itemElm: HTMLElement): ReactNode => {
      const items = Array.from(itemElm.children).map((child) => {
        const childHTML = child.innerHTML;
        // eslint-disable-next-line react/jsx-key
        return <div dangerouslySetInnerHTML={{ __html: childHTML }} />;
      });

      return items;
    }
  );

  const children = items.flat();

  return { children };
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
