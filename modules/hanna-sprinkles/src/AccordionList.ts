import './_/initHannaNamespace.js';

import aquireId from '@hugsmidjan/qj/aquireId';
import E from '@hugsmidjan/qj/E';
import q from '@hugsmidjan/qj/q';
import qq from '@hugsmidjan/qj/qq';

// # TODO: Add either a ...
// - Refresh handler that detects updates to `.AccordionList__button[disabled]` state
//   and toggles the `.AccordionList__item--disabled` class accordingly
// - Utility method .setDisabled(itemElm: HTMLDivElement, disabled: boolean);

const getItems = (elm: Element) => qq<HTMLElement>('.AccordionList__item', elm);

const initializeItem = (itemElm: HTMLElement) => {
  const titleElm = q<HTMLElement>('.AccordionList__title', itemElm);
  const contentElm = q<HTMLElement>('.AccordionList__content', itemElm);
  if (titleElm && contentElm) {
    let open = itemElm.dataset.startOpen === 'true';
    aquireId(contentElm);
    contentElm.hidden = !open;
    itemElm.dataset.sprinkled = 'true';

    const disabled = itemElm.classList.contains('AccordionList__item--disabled');
    const buttonElm = E(
      'button',
      {
        className: 'AccordionList__button',
        'aria-controls': contentElm.id,
        'aria-expanded': open || undefined,
        disabled,
        onClick: () => {
          open = !disabled && !open;
          if (open) {
            buttonElm.setAttribute('aria-expanded', 'true');
          } else {
            buttonElm.removeAttribute('aria-expanded');
          }
          contentElm.hidden = !open;
        },
      },
      titleElm.childNodes
    );
    titleElm.textContent = '';
    titleElm.append(buttonElm);
  }
};

window.Hanna.makeSprinkle({
  name: 'AccordionList',

  init: (elm: HTMLElement) => {
    getItems(elm).forEach(initializeItem);
  },

  refresh: (elm) => {
    const newItems = getItems(elm).filter((elm) => !elm.dataset.sprinkled);
    newItems.forEach(initializeItem);
  },
});
