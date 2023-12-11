import './_/initHannaNamespace.js';

import domid from '@hugsmidjan/qj/domid';
import E from '@hugsmidjan/qj/E';
import { focusElm } from '@hugsmidjan/qj/focusElm';
import q from '@hugsmidjan/qj/q';
import qq from '@hugsmidjan/qj/qq';
import { defaultMainMenuTexts } from '@reykjavik/hanna-react/MainMenu';
import { defaultMobileMenuTogglerTexts } from '@reykjavik/hanna-react/MobileMenuToggler';
import { focusElement, getFormatMonitor, MediaFormat } from '@reykjavik/hanna-utils';
import { getTexts } from '@reykjavik/hanna-utils/i18n';

import { getLang } from './_/getLang.js';

const formatMonitor = getFormatMonitor();

type PanelData = {
  panelElm: HTMLElement;
  titleButton?: HTMLButtonElement;
  menuButton?: HTMLButtonElement;
};

type MegaData = {
  container: HTMLElement;
  activePanel?: PanelData;
  backToMenuButton: HTMLButtonElement;
  escHandler: (e: KeyboardEvent) => void;
  clickHandler: (e: MouseEvent) => void;
};

// ---------------------------------------------------------------------------

const HamburgerMedias: Record<string, 1> = { phone: 1, phablet: 1, tablet: 1 };
// const TopmenuMedias: Record<string, 1> = { netbook: 1, wide: 1 };

const htmlClass = document.documentElement.classList;

const addMenuToggler = (menuElm: HTMLElement, lang: string) => {
  menuElm.tabIndex = -1;
  const menuId = menuElm.id || domid();
  if (!menuElm.id) {
    menuElm.id = menuId;
  }

  const txt = getTexts({ lang }, defaultMobileMenuTogglerTexts);

  /* eslint-disable @typescript-eslint/no-use-before-define */
  const togglerButton = E(
    'button',
    {
      className: 'MobileMenuToggler',
      onClick: (e: MouseEvent) => {
        if (isActive) {
          e.preventDefault();
          isOpen ? closeMenu() : openMenu();
        }
      },
      'aria-controls': menuId,
      'aria-pressed': 'false',
      lang,
    },
    txt.togglerLabel
  );

  const closeButton = E(
    'button',
    {
      className: 'MobileMenuToggler__closebutton',
      'aria-label': txt.closeMenuLabelLong,
      onClick: () => closeMenu(),
      lang,
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
    menuElm.before(togglerButton);
    menuElm.append(closeButton);
    isActive = true;
  };

  const dectivateMenu = () => {
    if (!isActive) {
      return;
    }
    isOpen && closeMenu();
    htmlClass.remove('menu-is-closed');
    htmlClass.remove('menu-is-active');
    togglerButton.remove();
    closeButton.remove();
    isActive = false;
  };

  const openMenu = () => {
    htmlClass.add('menu-is-open');
    htmlClass.remove('menu-is-closed');
    isOpen = true;
    togglerButton.setAttribute('aria-pressed', `${isOpen}`);
    focusElement(menuElm);
  };

  const closeMenu = () => {
    htmlClass.add('menu-is-closed');
    htmlClass.remove('menu-is-open');
    isOpen = false;
    togglerButton.setAttribute('aria-pressed', `${isOpen}`);
    focusElement(togglerButton);
  };
  /* eslint-enable @typescript-eslint/no-use-before-define */

  const onFormatChange = (media: MediaFormat) => {
    const becameHamburger =
      HamburgerMedias[media.is] && !HamburgerMedias[media.was || ''];
    const leftHamburger = !HamburgerMedias[media.is] && HamburgerMedias[media.was || ''];

    if (becameHamburger) {
      activateMenu();
    } else if (leftHamburger) {
      dectivateMenu();
    }
  };
  formatMonitor.subscribe(onFormatChange);

  return () => {
    formatMonitor.unsubscribe(onFormatChange);
    dectivateMenu();
  };
};

// ---------------------------------------------------------------------------

let laggyRemoval: ReturnType<typeof setTimeout>;

const deactivatePanel = (
  { panelElm, titleButton, menuButton }: PanelData,
  instant?: boolean
) => {
  const remove = () => {
    panelElm.classList.remove('PrimaryPanel--active');
    titleButton && titleButton.removeAttribute('aria-pressed');
  };
  if (instant) {
    remove();
  } else {
    laggyRemoval = setTimeout(remove, 1000);
  }
  menuButton && menuButton.removeAttribute('aria-pressed');
};
const activatePanel = ({ panelElm, titleButton, menuButton }: PanelData) => {
  clearTimeout(laggyRemoval);
  panelElm.classList.add('PrimaryPanel--active');
  titleButton && titleButton.setAttribute('aria-pressed', 'true');
  menuButton && menuButton.setAttribute('aria-pressed', 'true');
};

// ---------------------------------------------------------------------------

const setDocumentEvents = ({ escHandler, clickHandler }: MegaData) => {
  document.addEventListener('keydown', escHandler);
  document.addEventListener('click', clickHandler, true);
};
const removeDocumentEvents = ({ escHandler, clickHandler }: MegaData) => {
  document.removeEventListener('keydown', escHandler);
  document.removeEventListener('click', clickHandler, true);
};

// ---------------------------------------------------------------------------

const getMenuUpdater = (data: MegaData) =>
  function updateMenu(newActive: PanelData | undefined, setFocus = true) {
    const { activePanel, backToMenuButton, container } = data;

    delete container.dataset.pristine;

    if (newActive === activePanel) {
      newActive = undefined;
    }

    const htmlElm = document.documentElement;
    const htmlElmDataset = htmlElm.dataset;

    // manage document events and close button
    if (!newActive) {
      backToMenuButton.remove();
      data.container.classList.remove('MainMenu__panelsWrap--active');
      removeDocumentEvents(data);
      htmlElm.scrollTop = parseInt(htmlElmDataset.scrollTop || '') || 0;
      delete htmlElmDataset.scrollTop;
      delete htmlElmDataset.megaPanelActive;
    } else {
      data.container.classList.add('MainMenu__panelsWrap--active');
      newActive.panelElm.append(backToMenuButton);
      if (!activePanel) {
        setDocumentEvents(data);
        htmlElmDataset.scrollTop = String(htmlElm.scrollTop);
        htmlElm.scrollTop = 0;
        htmlElmDataset.megaPanelActive = '';
      }
    }

    // deactivate old panel
    if (activePanel) {
      // NOTE: if `activeIdx === oldActiveIdx` then the user
      // clicked the already active panel which should toggle it off.
      deactivatePanel(activePanel, !!newActive);
      data.activePanel = undefined;
    }
    if (newActive) {
      activatePanel(newActive);
      data.activePanel = newActive;
    }

    if (setFocus) {
      setTimeout(() => {
        if (newActive) {
          focusElm(newActive.panelElm);
        } else if (activePanel) {
          focusElm(activePanel.menuButton);
        }
      }, 100);
    }
  };

const initMainMenu = (menuElm: HTMLElement, lang: string) => {
  const txt = getTexts({ lang }, defaultMainMenuTexts);

  const megaContainer = q<HTMLElement>('.MainMenu__panelsWrap', menuElm);
  if (!megaContainer) {
    return;
  }

  megaContainer.dataset.pristine = 'true';

  /* eslint-disable @typescript-eslint/no-use-before-define */
  qq<HTMLElement>('.PrimaryPanel', megaContainer).forEach((panelElm) => {
    const titleElm = q('.PrimaryPanel__title', panelElm);
    if (!titleElm) {
      return;
    }

    const menuLink =
      (panelElm.id && q(`a.MainMenu__link[href$="#${panelElm.id}"]`, menuElm)) ||
      undefined;

    const panelData: PanelData = {
      panelElm,

      titleButton: panelElm.id
        ? E(
            'button',
            {
              className: 'MainMenu__mega__title-toggler',
              onClick: () => updateMenu(panelData, false),
              'aria-controls': panelElm.id,
            },
            titleElm.textContent
          )
        : undefined,

      menuButton:
        menuLink &&
        E(
          'button',
          {
            className: 'MainMenu__link',
            onClick: () => updateMenu(panelData),
            'aria-controls': panelElm.id,
            'aria-label': menuLink.getAttribute('aria-label'),
          },
          menuLink.textContent
        ),
    };

    if (panelData.titleButton) {
      titleElm.textContent = '';
      titleElm.append(panelData.titleButton);
    }

    if (menuLink && panelData.menuButton) {
      menuLink.replaceWith(panelData.menuButton);
    }
  });

  const megaData: MegaData = {
    container: megaContainer,
    activePanel: undefined,
    backToMenuButton: E(
      'button',
      {
        className: 'MainMenu__megapanel__backtomenu',
        onClick: () => closeMenu(),
        'aria-label': txt.backToMenuLong,
      },
      txt.backToMenu
    ),
    escHandler: (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    },
    clickHandler(e) {
      if (!menuElm.contains(e.target as HTMLElement | null)) {
        closeMenu();
      }
    },
  };
  /* eslint-enable @typescript-eslint/no-use-before-define */

  const updateMenu = getMenuUpdater(megaData);
  const closeMenu = () => updateMenu(undefined);

  const onFormatChange = (media: MediaFormat) => {
    const lefTopMenu =
      !{ netbook: 1, wide: 1 }[media.is] && { netbook: 1, wide: 1 }[media.was || ''];
    if (lefTopMenu) {
      closeMenu();
    }
  };
  formatMonitor.subscribe(onFormatChange);

  return () => {
    formatMonitor.unsubscribe(onFormatChange);
    removeDocumentEvents(megaData);
  };
};

// ===========================================================================

// ===========================================================================

window.Hanna.makeSprinkle({
  name: 'MainMenu',

  init: (menuElm: HTMLElement) => {
    const lang = getLang(menuElm);
    const menuTogglerTeardown = addMenuToggler(menuElm, lang);
    const mainMenuTeardown = initMainMenu(menuElm, lang);

    return () => {
      menuTogglerTeardown();
      mainMenuTeardown && mainMenuTeardown();
    };
  },

  unmount: (menuElm, teardown) => {
    teardown();
  },
});
