import './_/initHannaNamespace.js';

import q from '@hugsmidjan/qj/q';

import { inlineSVG } from './_/inlineSVG.js';

window.Hanna.makeSprinkle({
  name: 'WizardLayout',

  init: (layoutElm: HTMLElement) => {
    const logoContainerElm = q<HTMLElement>('.Layout__header__logo', layoutElm);
    if (logoContainerElm) {
      inlineSVG('img', logoContainerElm);
    }
  },
});
