import './_/initHannaNamespace.js';

import Selectybox from 'selectybox';

const log = (...args: Array<any>) => console.info('FormField sprinkle: ', ...args);

const initSelectybox = (elm: HTMLElement) => {
  const selectElm = elm.querySelector('select');
  if (!selectElm) {
    log('No <select/> found for', elm);
    return;
  }
  new Selectybox(selectElm, {
    templ: '<span class="FormField__input"><span class="selecty-button"/></span>',
    focusClass: 'FormField__input--focused',
    disabledClass: 'FormField__input--disabled',
    emptyClass: 'FormField__input--empty',
  });
};

const flag = (elm: HTMLElement, modifier: string, add: boolean): void => {
  elm.classList[add ? 'add' : 'remove']('FormField--' + modifier);
};

const setStateClasses = (elm: HTMLElement) => {
  const input = elm.querySelector<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >('select, input, textarea');

  if (!input || !input.closest('.FormField__input')) {
    log('No input/select field found for', elm);
    return;
  }

  flag(elm, 'disabled', input.disabled);
  flag(elm, 'readonly', 'readOnly' in input && input.readOnly);

  const noValue = !input.value;
  const noVisibleContent =
    noValue &&
    !(input instanceof HTMLSelectElement
      ? input.options[input.selectedIndex]!.text.trim()
      : input.placeholder.trim());

  flag(elm, 'filled', !noValue);
  flag(elm, 'empty', noVisibleContent);
};

const bindFocusEvents = (elm: HTMLElement) => {
  const inputWrap = elm.querySelector('.FormField__input');
  if (!inputWrap) {
    throw new Error('`FormField__input` not found');
  }
  inputWrap.addEventListener('focusin', () => {
    elm.classList.add('FormField--focused');
  });
  inputWrap.addEventListener('focusout', () => {
    elm.classList.remove('FormField--focused');
    setStateClasses(elm);
  });
  inputWrap.addEventListener('change', () => {
    setStateClasses(elm);
  });
  (elm as HTMLElement & { setStateClasses?: () => void }).setStateClasses = () =>
    setStateClasses(elm);
};

// ---------------------------------------------------------------------------

window.Hanna.makeSprinkle({
  name: 'FormField',
  selector: '.FormField',

  init: (elm: HTMLElement) => {
    if (!elm.querySelector('label.FormField__label')) {
      return;
    }
    if (elm.classList.contains('Selectbox')) {
      initSelectybox(elm);
    }
    bindFocusEvents(elm);
    setStateClasses(elm);
  },

  refresh: setStateClasses,
});
