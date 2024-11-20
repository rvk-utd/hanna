import './_/initHannaNamespace.js';

import q from '@hugsmidjan/qj/q';
import { focusElement } from '@reykjavik/hanna-utils';

import { inlineSVG } from './_/inlineSVG.js';

const updateSkipLink = () => {
  const oldnavlinkCl = q<HTMLAnchorElement>('a.Layout__header__skiplink')?.classList;
  if (oldnavlinkCl) {
    oldnavlinkCl.remove('Layout__header__skiplink');
    oldnavlinkCl.add('Layout__header__navlink');
  }
  q('.Layout');
};

window.Hanna.makeSprinkle({
  name: 'Layout',

  init: (layoutElm: HTMLElement) => {
    const logoContainerElm = q<HTMLElement>('.Layout__header__logo', layoutElm);
    if (logoContainerElm) {
      inlineSVG('img', logoContainerElm);
    }

    updateSkipLink();

    const navLink = q<HTMLAnchorElement>('a.Layout__header__navlink[href^="#"]');
    const navElm = navLink && q<HTMLElement>(navLink.hash);
    if (!navLink || !navElm) {
      return;
    }

    navLink.addEventListener('click', (e) => {
      e.preventDefault();
      focusElement(navElm, true);
    });
  },
});
