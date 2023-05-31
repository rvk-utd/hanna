import './initHannaNamespace.js';

import E from '@hugsmidjan/qj/E';
import { focusElm } from '@hugsmidjan/qj/focusElm';
import htmlLang from '@hugsmidjan/qj/htmlLang';
import q from '@hugsmidjan/qj/q';
import qq from '@hugsmidjan/qj/qq';
import { defaultMainMenuTexts } from '@reykjavik/hanna-react/MainMenu';
import { getFormatMonitor, getPageScrollElm, MediaFormat } from '@reykjavik/hanna-utils';
import { getTexts } from '@reykjavik/hanna-utils/i18n';

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

    const htmlElmDataset = document.documentElement.dataset;
    const scrollElm = getPageScrollElm();

    // manage document events and close button
    if (!newActive) {
      backToMenuButton.remove();
      data.container.classList.remove('MainMenu__panelsWrap--active');
      removeDocumentEvents(data);
      scrollElm.scrollTop = parseInt(htmlElmDataset.scrollTop || '') || 0;
      delete htmlElmDataset.scrollTop;
      delete htmlElmDataset.megaPanelActive;
    } else {
      data.container.classList.add('MainMenu__panelsWrap--active');
      newActive.panelElm.append(backToMenuButton);
      if (!activePanel) {
        setDocumentEvents(data);
        htmlElmDataset.scrollTop = String(scrollElm.scrollTop);
        scrollElm.scrollTop = 0;
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

// ===========================================================================

window.Hanna.makeSprinkle({
  name: 'MainMenu',

  init: (menuElm: HTMLElement) => {
    const txt = getTexts({ lang: htmlLang(menuElm) }, defaultMainMenuTexts);

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
        (panelElm.id && q('a.MainMenu__link[href$="#' + panelElm.id + '"]', menuElm)) ||
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
          lang: txt.lang,
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
      if (media.leftTopmenu) {
        closeMenu();
      }
    };
    formatMonitor.subscribe(onFormatChange);

    const teardown = () => {
      formatMonitor.unsubscribe(onFormatChange);
      removeDocumentEvents(megaData);
    };
    return teardown;
  },

  unmount: (menuElm, teardown) => {
    teardown && teardown();
  },
});
