import './initHannaNamespace.js';

import E from '@hugsmidjan/qj/E';
import htmlLang from '@hugsmidjan/qj/htmlLang';
import q from '@hugsmidjan/qj/q';
import { defaultLayoutTexts } from '@reykjavik/hanna-react/Layout';
import { focusElement, getFormatMonitor, MediaFormat } from '@reykjavik/hanna-utils';
import { getTexts } from '@reykjavik/hanna-utils/i18n';

import { inlineSVG } from './utils/inlineSVG.js';

const formatMonitor = getFormatMonitor();

const htmlClass = document.documentElement.classList;

window.Hanna.makeSprinkle({
  name: 'Layout',

  init: (layoutElm: HTMLElement) => {
    const logoContainerElm = q<HTMLElement>('.Layout__header__logo', layoutElm);
    if (logoContainerElm) {
      inlineSVG('img', logoContainerElm);
    }

    const skipLink = q<HTMLAnchorElement>('a.Layout__header__skiplink[href^="#"]');
    const navElm = skipLink && q<HTMLElement>(skipLink.hash);
    if (!skipLink || !navElm) {
      return;
    }

    /* eslint-disable @typescript-eslint/no-use-before-define */
    const txt = getTexts({ lang: htmlLang(layoutElm) }, defaultLayoutTexts);
    const closeButton = E(
      'button',
      {
        className: 'Layout__nav__closebutton',
        lang: txt.lang,
        'aria-label': txt.closeMenuLabelLong,
        onClick: () => {
          closeMenu();
        },
      },
      txt.closeMenuLabel
    );

    let isOpen = false;
    let isActive = false;

    const activateMenu = () => {
      if (isActive) {
        return;
      }
      htmlClass.add('menu-is-active');
      htmlClass.add('menu-is-closed');
      skipLink.addEventListener('click', skipLinkHandler);
      navElm.append(closeButton);
      isActive = true;
    };

    const dectivateMenu = () => {
      if (!isActive) {
        return;
      }
      isOpen && closeMenu();
      htmlClass.remove('menu-is-closed');
      htmlClass.remove('menu-is-active');
      skipLink.removeEventListener('click', skipLinkHandler);
      closeButton.remove();
      isActive = false;
    };

    const openMenu = () => {
      htmlClass.add('menu-is-open');
      htmlClass.remove('menu-is-closed');
      focusElement(navElm);
      isOpen = true;
    };

    const closeMenu = () => {
      htmlClass.add('menu-is-closed');
      htmlClass.remove('menu-is-open');
      focusElement(skipLink);
      isOpen = false;
    };
    /* eslint-enable @typescript-eslint/no-use-before-define */

    const skipLinkHandler = (e: MouseEvent) => {
      if (isActive) {
        e.preventDefault();
        isOpen ? closeMenu() : openMenu();
      }
    };

    const onFormatChange = (media: MediaFormat) => {
      if (media.becameHamburger) {
        activateMenu();
      } else if (media.leftHamburger) {
        dectivateMenu();
      }
    };
    formatMonitor.subscribe(onFormatChange);

    return () => {
      formatMonitor.unsubscribe(onFormatChange);
      dectivateMenu();
    };
  },
  unmount: (layoutElm, teardown) => {
    teardown && teardown();
  },
});
