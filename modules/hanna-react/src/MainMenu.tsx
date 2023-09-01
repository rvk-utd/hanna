import React, { useEffect, useMemo, useRef, useState } from 'react';
import { modifiedClass, Modifiers } from '@hugsmidjan/qj/classUtils';
import { focusElm } from '@hugsmidjan/qj/focusElm';
import useShortState from '@hugsmidjan/react/hooks/useShortState';
import { Cleanup } from '@reykjavik/hanna-utils';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import { Link } from './_abstract/_Link.js';
import {
  AuxilaryPanelIllustration,
  AuxiliaryPanel,
  AuxiliaryPanelProps,
} from './MainMenu/_Auxiliary.js';
import {
  MegaMenuItem,
  MegaMenuItemList,
  MegaMenuPanel,
  PrimaryPanel,
  PrimaryPanelI18n,
} from './MainMenu/_PrimaryPanel.js';
import { useHannaUIState } from './utils/HannaUIState.js';
import { useFormatMonitor } from './utils/useFormatMonitor.js';
import { SSRSupportProps, useIsBrowserSide, WrapperElmProps } from './utils.js';

const findActivePanel = (megaPanels: ReadonlyArray<MegaMenuPanel>, activeId?: string) =>
  activeId ? megaPanels.find((panel) => activeId === panel.id) : undefined;

// ---------------------------------------------------------------------------

export type MainMenuI18n = Cleanup<
  { lang?: string; homeLabel?: string; title: string } & PrimaryPanelI18n
>;

export const defaultMainMenuTexts: DefaultTexts<Required<MainMenuI18n>> = {
  is: {
    lang: 'is',
    title: 'Aðalvalmynd',
    homeLabel: 'Forsíða',
    backToMenu: 'Loka',
    backToMenuLong: 'Til baka í valmynd',
  },
  en: {
    lang: 'en',
    title: 'Main Menu',
    homeLabel: 'Home page',
    backToMenu: 'Close',
    backToMenuLong: 'Close and return to menu',
  },
  pl: {
    lang: 'pl',
    title: 'Menu główne',
    homeLabel: 'Strona główna',
    backToMenu: 'Zamknij',
    backToMenuLong: 'Zamknij i wróć do menu',
  },
};

// ---------------------------------------------------------------------------

const _issueHomeLinkWarnings = (hasHomeItem: boolean, hasHomeLinkProp: boolean) => {
  const bothDefined = hasHomeItem && hasHomeLinkProp;
  const neitherDefined = !hasHomeItem && !hasHomeLinkProp;

  if (bothDefined) {
    console.warn(
      'Ignoring a redundant `MainMenuProps.homeLink` value. ' +
        '(As `MainMenuProps.items` already starts with a "Home" item.)'
    );
  } else if (neitherDefined) {
    console.warn(
      '`MainMenuProps.homeLink` is missing. Auto-inserting a generic "home link" with `href="/"`.'
    );
  }
};

const normalizeMenuItems = (
  itemsProp: MainMenuProps['items'],
  megaPanels: NonNullable<MainMenuProps['megaPanels']>,
  homeLink: MainMenuProps['homeLink'],
  texts: NonNullable<MainMenuProps['texts']>
) => {
  type MenuItemNormalized =
    | (() => JSX.Element)
    | MainMenuSeparator
    | (MainMenuItem & {
        megaPanel?: MegaMenuPanel;
        controlsId?: string;
      });

  const items = itemsProp.map((item): MenuItemNormalized => {
    if (item === '---' || !('label' in item)) {
      return item;
    }
    const href = item.href;
    const controlsId =
      item.controlsId || (href && /^#/.test(href) && href.slice(1)) || undefined;
    const megaPanel = controlsId
      ? megaPanels.find((panel) => panel.id === controlsId)
      : undefined;
    return { ...item, controlsId, megaPanel };
  });

  const firstItem = items[0];
  if (firstItem) {
    // Prepend menu item list with a "home link", unless it's already there
    const hasHomeItem = typeof firstItem === 'object' && firstItem.modifier === 'home';

    if (process.env.NODE_ENV !== 'production') {
      _issueHomeLinkWarnings(hasHomeItem, !!homeLink);
    }

    if (!hasHomeItem) {
      if (!homeLink || typeof homeLink === 'string') {
        let label = texts.homeLabel;
        let lang: string | undefined;
        if (label == null) {
          const def =
            defaultMainMenuTexts[texts.lang || 'en'] ||
            defaultMainMenuTexts.en ||
            defaultMainMenuTexts.is;
          label = def.homeLabel;
          lang = def.lang;
        }
        homeLink = { href: homeLink || '/', label, lang };
      }
      items.unshift({ ...homeLink, modifier: 'home' });
    }
  }

  return items;
};

// ---------------------------------------------------------------------------

const emptyPanelList: Array<MegaMenuPanel> = [];

// ---------------------------------------------------------------------------

export type {
  AuxilaryPanelIllustration,
  AuxiliaryPanelProps,
  MegaMenuItem,
  MegaMenuItemList,
  MegaMenuPanel,
};

export type MainMenuItem = {
  label: string;
  labelLong?: string;
  lang?: string;
  /**
   * Puts a modifier className on the menu item element.
   *
   * Example:
   *
   * ```html
   * <li class="MainMenu__item MainMenu__item--${modifier}">
   * ```
   * */
  modifier?: Modifiers;
  current?: boolean;
  href?: string;
  /**
   * Adding `onClick` automatically results in a <button/> element being rendered.
   *
   * NOTE: Clicking a MainMenu item will automatically close HannaUIState's
   * "Hamburger menu" (a.k.a. "Mobile menu")
   * … unless the `onClick` function explicitly returns `false`.
   */
  onClick?: (index: number, item: MainMenuItem) => void | boolean;
  controlsId?: string;
  target?: React.HTMLAttributeAnchorTarget;
};
export type MainMenuSeparator = '---';
export type MainMenuItemList = Array<
  MainMenuItem | MainMenuSeparator | (() => JSX.Element)
>;

export type MainMenuProps = {
  /**
   * Top-level screen-reader headline/label for the whole menu.
   * Defaults to a translation of "Main Menu"
   */
  title?: string;
  items: MainMenuItemList;
  /**
   * Link for the homepage - defaults to `"/"` adding a
   * generic sounding "Home"/"Forsíða" label
   */
  homeLink?: string | Omit<MainMenuItem, 'modifier'>;
  megaPanels?: Array<MegaMenuPanel>;
  auxiliaryPanel?: AuxiliaryPanelProps;
  /**
   * NOTE: Clicking a MainMenu item will automatically close HannaUIState's
   * "Hamburger menu" (a.k.a. "Mobile menu")
   * … unless the `onItemClick` function explicitly returns `false`.
   */
  onItemClick?: (index: number, item: MainMenuItem) => void | boolean;
  activePanelId?: string;
  texts?: MainMenuI18n;
  lang?: string;
} & SSRSupportProps &
  WrapperElmProps<null, 'aria-label'>;

export const MainMenu = (props: MainMenuProps) => {
  const {
    megaPanels = emptyPanelList,
    onItemClick,
    ssr,
    auxiliaryPanel,
    wrapperProps = {},
  } = props;

  const texts = getTexts(props, defaultMainMenuTexts);
  const title = props.title || texts.title;

  const { closeHamburgerMenu } = useHannaUIState();

  const isBrowser = useIsBrowserSide(ssr);

  const _menuElmRef = useRef<HTMLElement>(null);
  const menuElmRef = wrapperProps.ref || _menuElmRef;
  const pressedLinkRef = useRef<HTMLButtonElement>(null);
  const activePanelRef = useRef<HTMLLIElement>(null);

  const [activePanel, _setActivePanel] = useState<MegaMenuPanel | undefined>(
    () => isBrowser && findActivePanel(megaPanels, props.activePanelId)
  );
  const [laggyActivePanel, setLaggyActivePanel] = useShortState<
    MegaMenuPanel | undefined
  >();

  const setActivePanel = useMemo(
    () =>
      isBrowser
        ? (newActive: MegaMenuPanel | undefined, setFocus = true) => {
            const htmlElm = document.documentElement;
            const htmlElmDataset = htmlElm.dataset;

            // const menuElm = menuElmRef.current as HTMLElement;
            _setActivePanel((activePanel) => {
              if (!newActive) {
                activePanel && setLaggyActivePanel(activePanel, 1000);
                htmlElm.scrollTop = parseInt(htmlElmDataset.scrollTop || '') || 0;
                delete htmlElmDataset.scrollTop;
                delete htmlElmDataset.megaPanelActive;
              } else {
                setLaggyActivePanel(undefined, 0);
                htmlElmDataset.scrollTop = String(htmlElm.scrollTop);
                htmlElm.scrollTop = 0;
                htmlElmDataset.megaPanelActive = '';
              }

              if (setFocus) {
                const pressedLinkElm = pressedLinkRef.current; // pressedLinkElm will be undefined when setTimeout fires
                setTimeout(() => {
                  if (!newActive) {
                    // const buttonElm = menuElm.querySelector<HTMLButtonElement>(
                    // 	'button.MainMenu__link[aria-pressed="true"]'
                    // );
                    focusElm(pressedLinkElm);
                  } else if (newActive !== activePanel) {
                    // const panelElm = menuElm.querySelector<HTMLButtonElement>(
                    // 	'.PrimaryPanel--active'
                    // );
                    focusElm(activePanelRef.current);
                  }
                }, 100);
              }
              return newActive;
            });
          }
        : () => undefined,
    [setLaggyActivePanel, isBrowser]
  );

  useFormatMonitor((media) => {
    if (media.leftTopmenu) {
      setActivePanel(undefined);
    }
  });

  const hasActivePanel = !!activePanel;

  const menuItems = useMemo(
    () => normalizeMenuItems(props.items, megaPanels, props.homeLink, texts),
    [props.items, props.homeLink, megaPanels, texts]
  );

  useEffect(() => {
    setActivePanel(findActivePanel(megaPanels, props.activePanelId));
  }, [props.activePanelId, megaPanels, setActivePanel]);

  useEffect(() => {
    const menuElm = menuElmRef.current;
    if (!isBrowser || !hasActivePanel || !menuElm) {
      return;
    }

    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePanel(undefined);
      }
    };
    const clickHandler = (e: MouseEvent) => {
      if (!menuElm.contains(e.target as HTMLElement | null)) {
        setActivePanel(undefined);
      }
    };
    document.addEventListener('keydown', escHandler);
    document.addEventListener('click', clickHandler, true);

    return () => {
      document.removeEventListener('keydown', escHandler);
      document.removeEventListener('click', clickHandler, true);
    };
  }, [hasActivePanel, setActivePanel, isBrowser]);

  if (menuItems.length === 0) {
    return null;
  }

  /** Close mega panels on clicks their links. */
  const handleMegaPanelClicks = (e: React.MouseEvent<HTMLElement>) => {
    if (
      // NOTE: We can NOT check for `e.defaultPrevented` because if the current
      // LinkRenderer is something like Next.js or Remix's <Link/> compponent
      // then default is ALWAYS prevented
      (e.target as HTMLElement).closest('a[href]')
    ) {
      setActivePanel(undefined);
      closeHamburgerMenu();
    }
  };

  return (
    <nav
      {...props.wrapperProps}
      className={modifiedClass('MainMenu', null, wrapperProps.className)}
      aria-label={title}
      data-sprinkled={isBrowser}
      ref={menuElmRef}
    >
      <h2 className="MainMenu__title">{title}</h2>
      <ul className="MainMenu__items">
        {menuItems.map((item, i) => {
          if (item === '---') {
            return <li key={i} className="MainMenu__separator" aria-hidden="true" />;
          }
          if (!('label' in item)) {
            const Item = item;
            return (
              <li key={i} className="MainMenu__item">
                <Item />
              </li>
            );
          }

          const { label, labelLong, lang, controlsId, onClick } = item;
          const pressed = (activePanel && controlsId === activePanel.id) || undefined;
          return (
            <li
              key={i}
              className={modifiedClass('MainMenu__item', item.modifier)}
              aria-current={item.current || undefined}
            >
              {
                onClick || (!!item.megaPanel && (isBrowser || !item.href)) ? (
                  // only print script-driven buttons in the browser
                  <button
                    className="MainMenu__link"
                    onClick={() => {
                      const keepOpen1 = onClick && onClick(i, item) === false;
                      const keepOpen2 = onItemClick && onItemClick(i, item) === false;
                      const { megaPanel } = item;
                      if (megaPanel) {
                        setActivePanel(megaPanel !== activePanel ? megaPanel : undefined);
                      } else {
                        !(keepOpen1 || keepOpen2) && closeHamburgerMenu();
                      }
                    }}
                    ref={pressed && pressedLinkRef}
                    aria-pressed={pressed}
                    aria-controls={controlsId}
                    aria-label={labelLong}
                    title={labelLong} // For auto-tooltips on desktop
                    lang={lang}
                    type="button"
                  >
                    {label}
                  </button>
                ) : item.href != null ? (
                  // always render links server-side
                  <Link
                    className="MainMenu__link"
                    href={item.href}
                    target={item.target}
                    aria-label={labelLong}
                    title={labelLong} // For auto-tooltips on desktop
                    onClick={() => {
                      const keepOpen = onItemClick && onItemClick(i, item) === false;
                      !keepOpen && closeHamburgerMenu();
                    }}
                    lang={lang}
                  >
                    {label}
                  </Link>
                ) : undefined // skip rendering non-link menu items server side
              }
            </li>
          );
        })}
      </ul>
      {'\n\n'}
      {megaPanels.length > 0 && (
        <div className={modifiedClass('MainMenu__panelsWrap', [activePanel && 'active'])}>
          <ul className="MainMenu__panels" onClick={handleMegaPanelClicks}>
            {megaPanels.map((panel, i) => {
              if (!panel.items.length) {
                return;
              }
              const isActive =
                activePanel === panel || laggyActivePanel === panel || undefined;
              const isParent = !!panel.items.find((item) => item.current);

              return (
                <PrimaryPanel
                  key={i}
                  isParent={isParent}
                  isActive={isActive}
                  panel={panel}
                  isBrowser={isBrowser}
                  setActivePanel={setActivePanel}
                  texts={texts}
                  activeRef={activePanelRef}
                />
              );
            })}
            {auxiliaryPanel && <AuxiliaryPanel {...auxiliaryPanel} />}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default MainMenu;
