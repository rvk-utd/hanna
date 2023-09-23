import './initHannaNamespace.js';

import React from 'react';
import ReactDOM from 'react-dom';
import q from '@hugsmidjan/qj/q';
import qq from '@hugsmidjan/qj/qq';
import {
  ContactBubble,
  ContactBubbleItem,
  ContactBubbleProps,
  ensureIcon,
} from '@reykjavik/hanna-react/ContactBubble';
import { notNully } from '@reykjavik/hanna-utils';

import { getLang } from './utils/_getLang.js';

const itemTypeRe = /(?:^| )ContactBubble__item--type--(.+?)(?: |$)/;

const getContactBubbleData = (elm: HTMLElement): ContactBubbleProps => {
  const alwaysShow = elm.dataset.alwaysShow === 'true';
  const lang = getLang(elm);
  const title = q('.ContactBubble__title', elm)?.textContent || undefined;
  const links: Array<ContactBubbleItem> = qq('.ContactBubble__item', elm)
    .map((itemElm, i): ContactBubbleItem | undefined => {
      const linkElm = q<HTMLAnchorElement>('.ContactBubble__link', itemElm);
      if (!linkElm) {
        return;
      }
      const smallElm = q('small', linkElm);
      smallElm?.remove();

      const label = linkElm.textContent || 'Link ' + (i + 1);
      const extraLabel = smallElm?.textContent || undefined;
      const href = linkElm.getAttribute('href') || '';
      const target = linkElm.target || undefined;
      const maybeIcon = (itemElm.className.match(itemTypeRe) || [])[1];

      return {
        icon: ensureIcon(maybeIcon),
        extraLabel,
        href,
        label,
        target,
      };
    })
    .filter(notNully);

  return {
    title,
    links,
    alwaysShow,
    lang,
  };
};

window.Hanna.makeSprinkle({
  name: 'ContactBubble',

  init: (elm: HTMLElement) => {
    const props = getContactBubbleData(elm);
    const root = document.createElement('div');

    ReactDOM.render(<ContactBubble {...props} ssr={false} />, root, () => {
      elm.replaceWith(root);
    });
  },
});
