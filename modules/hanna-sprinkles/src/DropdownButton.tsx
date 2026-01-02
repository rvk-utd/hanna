import './_/initHannaNamespace.js';

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import q from '@hugsmidjan/qj/q';
import qq from '@hugsmidjan/qj/qq';
import { ButtonSecondaryProps } from '@reykjavik/hanna-react/ButtonSecondary.jsx';
import {
  DropdownButton,
  DropdownButtonCustomItem,
  DropdownButtonProps,
} from '@reykjavik/hanna-react/DropdownButton';

import { InjectHTML } from './_/InjectHTML.jsx';

const getDropdownButtonData = (elm: HTMLElement): DropdownButtonProps | undefined => {
  const items = qq<HTMLLIElement>(
    '.DropdownButton__menu > .DropdownButton__item',
    elm
  ).map((itemElm): DropdownButtonCustomItem => {
    const modifier = itemElm.className
      .match(/[a-zA-Z0-9]__item--(.+?)(?: |$)/g)
      ?.map((m) => m.slice(m.indexOf('--') + 2));
    const current = itemElm.getAttribute('aria-current') === 'true';

    const nodes = itemElm.childNodes;
    nodes.forEach((node) => node.remove());
    itemElm.classList.remove('DropdownButton__item');
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
  });

  const summmaryElm = q<HTMLElement>('.DropdownButton__toggler', elm);
  if (!summmaryElm || items.length === 0) {
    return;
  }
  // only support simple Buttton-based togglers for now
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
    buttonType: summmaryElm.classList.contains('ButtonPrimary') ? 'primary' : 'secondary',
    buttonIcon: summmaryElm.dataset.icon as ButtonSecondaryProps['icon'] | undefined,
    buttonSize: summmaryElm.className.match(/--(small|wide)(?: |$)/)?.[1] as
      | 'small'
      | 'wide'
      | undefined,
    buttonVariant: summmaryElm.className.match(/--(destuctive)(?: |$)/)?.[1] as
      | 'destructive'
      | undefined,
  };
};

window.Hanna.makeSprinkle({
  name: 'DropdownButton',

  init: (elm: HTMLElement) => {
    const props = getDropdownButtonData(elm);
    if (!props) {
      return;
    }

    const root = document.createElement('div');
    root.style.all = 'unset';
    elm.after(root);
    elm.remove();

    ReactDOM.render(
      <DropdownButton {...props} ssr={false} wrapperProps={{ 'data-sprinkled': '' }} />,
      root
    );

    return root;
  },
  unmount: (elm: HTMLElement, root) => {
    root && ReactDOM.unmountComponentAtNode(root);
  },
});
