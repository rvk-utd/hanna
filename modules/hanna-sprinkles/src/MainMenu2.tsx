import './_/initHannaNamespace.js';

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import q from '@hugsmidjan/qj/q';
import qq from '@hugsmidjan/qj/qq';
import {
  MainMenu2,
  MainMenu2ButtonItem,
  MainMenu2I18n,
  MainMenu2Item,
  MainMenu2Props,
  MainMenu2SubMenu,
  MainMenu2SubMenuItem,
} from '@reykjavik/hanna-react/MainMenu2';
import { notNully } from '@reykjavik/hanna-utils';

// ---------------------------------------------------------------------------

const parseTextDataAttr = (elm: HTMLElement): MainMenu2I18n | undefined => {
  try {
    const texts = JSON.parse(elm.dataset.propsTexts || '{}') as Partial<MainMenu2I18n>;
    if (
      typeof texts.title === 'string' &&
      typeof texts.openMenu === 'string' &&
      typeof texts.closeMenu === 'string'
    ) {
      texts.openMenuLong = texts.openMenuLong || texts.openMenu;
      texts.closeMenuLong = texts.closeMenuLong || texts.closeMenu;
      texts.homeLink = texts.homeLink || '';
      return texts as MainMenu2I18n;
    }
  } catch (error) {}
  return;
};

// ---------------------------------------------------------------------------

/** Hack component to inject innerHTML without an element wrapper */
const InjectHTML = ({ html }: { html: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.outerHTML = ref.current.innerHTML;
  }, []);
  return <span ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
};

const isAriaCurrent = (elm: HTMLElement): boolean => {
  const ariaCurrent = elm.getAttribute('aria-current');
  return ariaCurrent === 'true' || ariaCurrent === 'page';
};

const parseItem = (
  itemElm: HTMLElement | undefined
):
  | (MainMenu2Item & MainMenu2ButtonItem & MainMenu2SubMenuItem & { href: string })
  | undefined => {
  if (!itemElm) {
    return;
  }
  const linkElm = q<HTMLAnchorElement>('a[href]', itemElm);
  if (!linkElm) {
    return;
  }
  const descrElm = q('.MainMenu2__main__sub__link__descr', itemElm);
  descrElm?.remove();
  const descr = descrElm?.textContent!.trim();
  const isStringLabel = linkElm.getElementsByTagName('*').length === 0;
  const label = isStringLabel ? (
    linkElm.textContent!.trim()
  ) : (
    <InjectHTML html={linkElm.innerHTML} />
  );
  const href = linkElm.getAttribute('href')!;
  const target = linkElm.getAttribute('target') || undefined;
  const lang = linkElm.getAttribute('lang') || undefined;
  const hrefLang = linkElm.getAttribute('hreflang') || undefined;
  const labelLong = linkElm.getAttribute('aria-label') || linkElm.title || undefined;
  const icon = linkElm.dataset.icon as MainMenu2ButtonItem['icon'] | undefined;

  const modifier = itemElm.className.match(/[a-zA-Z0-9]__item--(.+)(?: |$)/)?.[1];
  const current = isAriaCurrent(itemElm);

  return {
    label,
    labelLong,
    href,
    target,
    lang,
    hrefLang,
    modifier,
    current,
    descr,
    icon,
  };
};

// ---------------------------------------------------------------------------

const getPropsFromSSRMainMenu2 = (elm: HTMLElement): MainMenu2Props => {
  const items: MainMenu2Props['items'] = {
    main: qq<HTMLElement>('.MainMenu2__main__item:not(.MainMenu2__main__item--home)', elm)
      .map((elm) => {
        const subItemsElm = elm.nextElementSibling;
        if (!subItemsElm?.classList.contains('MainMenu2__main__sub__items')) {
          return parseItem(elm);
        }
        return {
          title: elm.textContent!.trim(),
          current: isAriaCurrent(elm),
          subItems: qq<HTMLElement>('.MainMenu2__main__sub__item', subItemsElm)
            .map(parseItem)
            .filter(notNully),
        } satisfies MainMenu2SubMenu;
      })
      .filter(notNully),
    hot: qq<HTMLElement>('.MainMenu2__hot__item', elm).map(parseItem).filter(notNully),
    extra: qq<HTMLElement>('.MainMenu2__extra__item', elm)
      .map(parseItem)
      .filter(notNully),
    relatedTitle: q<HTMLElement>('.MainMenu2__related__title', elm)?.textContent!.trim(),
    related: qq<HTMLElement>('.MainMenu2__related__item', elm)
      .map(parseItem)
      .filter(notNully),
  };

  const homeLink = parseItem(q<HTMLElement>('.MainMenu2__main__item--home', elm));
  if (homeLink) {
    delete homeLink.modifier;
    delete homeLink.controlsId;
    delete homeLink.descr;
  }

  // Read --menu-image CSS variable directly applied via style="" attribute to elm
  const imageUrl = elm.style
    .getPropertyValue('--menu-image')
    .trim()
    .replace(/^url\((.+)\)$/, '$1');

  // Parse `<div class="MainMenu2" data-props-texts="{ title: 'Huvudmeny', ... }">`
  const texts = parseTextDataAttr(elm);

  return { items, homeLink, imageUrl, texts };
};

// ---------------------------------------------------------------------------

window.Hanna.makeSprinkle({
  name: 'MainMenu2',

  init: (elm: HTMLElement) => {
    const props = getPropsFromSSRMainMenu2(elm);

    const root = elm;
    elm.getAttributeNames().forEach((attrName) => {
      elm.removeAttribute(attrName);
    });

    ReactDOM.render(<MainMenu2 {...props} ssr={false} />, root);

    return root;
  },
  unmount: (elm: HTMLElement, root) => {
    ReactDOM.unmountComponentAtNode(root);
  },
});
