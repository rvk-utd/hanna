import './_/initHannaNamespace.js';

import E from '@hugsmidjan/qj/E';
import q from '@hugsmidjan/qj/q';
import { defaultLayoutTexts } from '@reykjavik/hanna-react/Layout';
import { focusElement, getFormatMonitor, MediaFormat } from '@reykjavik/hanna-utils';
import { getTexts } from '@reykjavik/hanna-utils/i18n';

import { getLang } from './_/getLang.js';
import { inlineSVG } from './_/inlineSVG.js';

const formatMonitor = getFormatMonitor();

const HamburgerMedias: Record<string, 1> = { phone: 1, phablet: 1, tablet: 1 };
// const TopmenuMedias: Record<string, 1> = { netbook: 1, wide: 1 };

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
    const txt = getTexts({ lang: getLang(layoutElm) }, defaultLayoutTexts);
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
      const isHamburger = HamburgerMedias[media.is];
      const wasHamburger = HamburgerMedias[media.was || ''];

      if (isHamburger && !wasHamburger) {
        activateMenu();
      } else if (!isHamburger && wasHamburger) {
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
