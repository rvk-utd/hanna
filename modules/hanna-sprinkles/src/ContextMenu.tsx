import './_/initHannaNamespace.js';

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import q from '@hugsmidjan/qj/q';
import qq from '@hugsmidjan/qj/qq';
import { ButtonSecondaryProps } from '@reykjavik/hanna-react/ButtonSecondary.jsx';
import {
  ContextMenu,
  ContextMenuCustomItem,
  ContextMenuProps,
} from '@reykjavik/hanna-react/ContextMenu';

import { InjectHTML } from './_/InjectHTML.js';

const getContextMenuData = (elm: HTMLElement): ContextMenuProps | undefined => {
  const items = qq<HTMLLIElement>('.ContextMenu__menu > .ContextMenu__item', elm).map(
    (itemElm): ContextMenuCustomItem => {
      const modifier = itemElm.className
        .match(/[a-zA-Z0-9]__item--(.+?)(?: |$)/g)
        ?.map((m) => m.slice(m.indexOf('--') + 2));
      const current = itemElm.getAttribute('aria-current') === 'true';

      const nodes = itemElm.childNodes;
      nodes.forEach((node) => node.remove());
      itemElm.classList.remove('ContextMenu__item');
      // Defensively turn all menu items into custom items,
      // to preserve onClick behaviors, etc...
      return {
        modifier,
        current,
        Content: () => {
          const ref = useRef<HTMLSpanElement>(null);
          useEffect(() => {
            const spanElm = ref.current;
            if (!spanElm) {
              return;
            }
            spanElm.parentNode!.append(...nodes);
            spanElm.remove();
          }, []);
          return <span ref={ref} />;
        },
      };
    }
  );

  const summmaryElm = q<HTMLElement>('.ContextMenu__toggler', elm);
  if (!summmaryElm || items.length === 0) {
    return;
  }
  // NOTE: We only support simple Buttton-based togglers for now
  const isStringLabel = summmaryElm.getElementsByTagName('*').length === 0;
  const label = isStringLabel ? (
    summmaryElm.textContent!.trim()
  ) : (
    <InjectHTML html={summmaryElm.innerHTML} />
  );
  return {
    items,
    label,
    labelLong: summmaryElm.getAttribute('aria-label') || undefined,
    togglerType: summmaryElm.classList.contains('ButtonPrimary')
      ? 'primary'
      : 'secondary',
    togglerIcon: summmaryElm.dataset.icon as ButtonSecondaryProps['icon'] | undefined,
    togglerSize: summmaryElm.className.match(/--(small|wide)(?: |$)/)?.[1] as
      | 'small'
      | 'wide'
      | undefined,
    togglerVariant: summmaryElm.className.match(/--(destuctive)(?: |$)/)?.[1] as
      | 'destructive'
      | undefined,
  };
};

window.Hanna.makeSprinkle({
  name: 'ContextMenu',

  init: (elm: HTMLElement) => {
    const props = getContextMenuData(elm);
    if (!props) {
      return;
    }

    const root = document.createElement('div');
    root.style.all = 'unset';
    elm.after(root);
    elm.remove();

    ReactDOM.render(
      <ContextMenu {...props} ssr={false} wrapperProps={{ 'data-sprinkled': '' }} />,
      root
    );

    return root;
  },
  unmount: (elm: HTMLElement, root) => {
    root && ReactDOM.unmountComponentAtNode(root);
  },
});
