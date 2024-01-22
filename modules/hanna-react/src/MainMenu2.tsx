import React, {
  CSSProperties,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { modifiedClass, Modifiers } from '@hugsmidjan/qj/classUtils';
import { IconName } from '@reykjavik/hanna-css';
import { Cleanup, EitherObj } from '@reykjavik/hanna-utils';
import { getIllustrationUrl, Illustration } from '@reykjavik/hanna-utils/assets';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import { ButtonIcon } from './_abstract/_Button.js';
import { Link } from './_abstract/_Link.js';
import { handleAnchorLinkClick } from './utils/a11yHelpers.js';
import { I18NProps } from './utils/types.js';
import ButtonPrimary from './ButtonPrimary.js';
import ButtonSecondary from './ButtonSecondary.js';
import { FocusTrap } from './FocusTrap.js';
import {
  HTMLProps,
  SSRSupportProps,
  useDomid,
  useIsBrowserSide,
  WrapperElmProps,
} from './utils.js';

const htmlCl =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  ((typeof document !== 'undefined') as true) && document.documentElement.classList;

const globalClasses = {
  // menuIsActive: '.menu-is-active',
  menuIsOpen: 'menu-is-open',
  menuIsClosed: 'menu-is-closed',
};

// ---------------------------------------------------------------------------

export type MainMenu2I18n = {
  title: string;
  homeLink: string;
  openMenu: string;
  openMenuLong: string;
  closeMenu: string;
  closeMenuLong: string;
};

export const defaultMainMenu2Texts: DefaultTexts<MainMenu2I18n> = {
  is: {
    title: 'Aðalvalmynd',
    homeLink: 'Forsíða',
    openMenu: 'Valmynd',
    openMenuLong: 'Opna Aðalvalmynd',
    closeMenu: 'Loka',
    closeMenuLong: 'Loka Aðalvalmynd',
  },
  en: {
    title: 'Main Menu',
    homeLink: 'Home page',
    openMenu: 'Menu',
    openMenuLong: 'Open main menu',
    closeMenu: 'Close',
    closeMenuLong: 'Close main menu',
  },
  pl: {
    title: 'Menu główne',
    homeLink: 'Strona główna',
    openMenu: 'Menu',
    openMenuLong: 'Otwórz menu główne',
    closeMenu: 'Zamknij',
    closeMenuLong: 'Zamknij menu główne',
  },
};

// ---------------------------------------------------------------------------

export type MainMenu2Item = {
  /** Visible label text */
  label: string;
  /** Un-abbreviated label set as `title=""` and `aria-label=""` */
  labelLong?: string;
  /** Language of the link label */
  lang?: string;
  /** Languge of the linked resource */
  hrefLang?: string;

  /**
   * Puts a modifier className for the menu __item <li/> element.
   * */
  modifier?: Modifiers;
  /** Signifies if the menu item is part of the page's breadcrumb trail */
  current?: boolean;

  /**
   * The URL the link points to.
   *
   * If neither `href` nor `onClick` is passed, then the item is not rendered
   * at all.
   */
  href?: string;
  /** Sets `target=""` on anchor tags with a `href` attribute. */
  target?: React.HTMLAttributeAnchorTarget;

  /**
   * Adding `onClick` automatically results in a <button/> element being
   * rendered. If `href` is also passed, then a <a href/> element is rendered
   * during initial (server-side) render, which then gets replaced by a
   * <button/> element during the first client-side
   *
   * NOTE: Clicking a menu item will automatically close HannaUIState's
   * "Hamburger menu" (a.k.a. "Mobile menu")
   * … unless the `onClick` function explicitly returns `false`.
   */
  onClick?: (item: MainMenu2Item) => void | boolean;
  /** Sets `aria-controls=""` on `<button/>`s with `onClick` */
  controlsId?: string;
};

export type MainMenu2ButtonItem = MainMenu2Item & {
  icon?: 'search' | 'user' | 'alert' | 'globe';
};

export type MainMenu2CustomItem = (props: { closeMenu: () => void }) => ReactElement;

export type MainMenu2SubMenuItem = MainMenu2Item & { descr?: string };

export type MainMenu2SubMenu = {
  title: string;
  current?: boolean;
  subItems: Array<MainMenu2SubMenuItem | MainMenu2CustomItem>;
};

export type MainMenu2ItemList = Array<MainMenu2Item | MainMenu2CustomItem>;
export type MainMenu2ButtonItemList = Array<MainMenu2ButtonItem | MainMenu2CustomItem>;
export type MainMenu2SubMenuItemList = Array<MainMenu2SubMenuItem | MainMenu2CustomItem>;

// ---------------------------------------------------------------------------

const iconMap: Record<NonNullable<MainMenu2ButtonItem['icon']>, ButtonIcon> = {
  alert: 'info',
  globe: undefined,
  search: 'search',
  user: 'user',
  // NOTE: We're temporarily coerceing `IconName` to `ButtonIcon`
  // TODO: Remove this once Hanna icons (and `ButtonIcons` sperifically)
  // have been expanded better standardised.
} satisfies Record<
  NonNullable<MainMenu2ButtonItem['icon']>,
  IconName | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> as any;

/**
 * Function that turns menu item props/objects into HTML
 * rendering <a/> or <button/> elements depending on the context,
 * Whether we're rendering the menu on the server or in the browser, etc.
 */
const getRenderers = (props: {
  onItemClick: MainMenu2Props['onItemClick'];
  closeMenu: () => void;
  isBrowser?: true;
}) => {
  const { onItemClick, closeMenu, isBrowser } = props;
  type AnyMenuItem =
    | (MainMenu2Item & MainMenu2ButtonItem & MainMenu2SubMenuItem)
    | MainMenu2CustomItem;

  const renderItem = (
    classPrefix: string,
    item: AnyMenuItem,
    opts: {
      key?: number;
      Tag?: 'li' | 'div';
      button?: boolean;
    } = {}
  ) => {
    const { key, Tag = 'li', button } = opts;
    if (typeof item === 'function') {
      const Item = item;
      return (
        <li key={key} className={`${classPrefix}item`}>
          <Item closeMenu={closeMenu} />
        </li>
      );
    }
    const linkClassName = `${classPrefix}link`;
    const { label, labelLong, href, target, lang, controlsId, onClick, descr, icon } =
      item;

    const itemDescr = descr && (
      <>
        {' '}
        <small className={`${linkClassName}__descr`}>{descr}</small>
      </>
    );

    const ButtonTag = button ? ButtonSecondary : 'button';
    const LinkTag = button ? ButtonSecondary : Link;
    const buttonCompProps = button
      ? {
          size: 'small' as const,
          'data-icon': icon && iconMap[icon],
        }
      : undefined;

    return (
      <Tag
        key={key}
        className={modifiedClass(`${classPrefix}item`, item.modifier)}
        aria-current={item.current || undefined}
      >
        {isBrowser && (onClick || !href) ? (
          <ButtonTag
            className={linkClassName}
            type="button"
            onClick={() => {
              const keepOpen1 = onClick && onClick(item) === false;
              const keepOpen2 = onItemClick && onItemClick(item) === false;
              !(keepOpen1 || keepOpen2) && closeMenu();
            }}
            aria-controls={controlsId}
            aria-label={labelLong}
            title={labelLong} // For auto-tooltips on desktop
            lang={lang}
            {...buttonCompProps}
          >
            {label} {itemDescr}
          </ButtonTag>
        ) : href ? (
          <LinkTag
            className={linkClassName}
            href={href}
            target={target}
            aria-label={labelLong}
            title={labelLong} // For auto-tooltips on desktop
            onClick={() => {
              const keepOpen = onItemClick && onItemClick(item) === false;
              !keepOpen && closeMenu();
            }}
            lang={lang}
            hrefLang={item.hrefLang}
            {...buttonCompProps}
          >
            {label} {itemDescr}
          </LinkTag>
        ) : null}
      </Tag>
    );
  };

  const renderList = (
    classSuffix: string,
    items?: Array<AnyMenuItem>,
    opts: { listProps?: HTMLProps<'ul'>; buttons?: boolean } = {}
  ) => {
    if (!items || !items.length) {
      return null;
    }
    return (
      <ul className={`${classSuffix}items`} {...opts.listProps}>
        {items.map((listItem, i) =>
          renderItem(classSuffix, listItem, { key: i, button: opts.buttons })
        )}
      </ul>
    );
  };

  return { renderList, renderItem };
};

// ---------------------------------------------------------------------------

export type MainMenu2Props = {
  /**
   * URL for the mandatory (usually screen-reader-only) homepage Link.
   *
   * Default: `"/"`
   *
   * NOTE: The link's label is by default "Forsíða"/"Home Page"/"Strona główna"
   * (depending on your page language) but it can be custom-translated via the
   * `props.texts` translation prop.
   */
  homeLink?:
    | string
    | Cleanup<Omit<MainMenu2Item, 'modifier' | 'controlsId'> & { href: string }>;

  items: {
    /**
     * The "Main" menu items that appear once the menu is open.
     *
     * Each of these items normally contains a list of `subItems` and a title,
     * but it can also be a direct link/button (or even a custom component).
     */
    main?: Array<MainMenu2SubMenu | MainMenu2Item | MainMenu2CustomItem>;

    /**
     * The always-visible items that appear at the top of the page next the
     * "Open Menu" button. Make sure to only use 2–3 items, and remember that
     * they may be hidden on smaller screens.
     */
    hot?: MainMenu2ButtonItemList;
    extra?: MainMenu2ButtonItemList;

    relatedTitle?: string;
    related?: MainMenu2ItemList;
  };

  /**
   * NOTE: Clicking a MainMenu2 item will automatically close HannaUIState's
   * "Hamburger menu" (a.k.a. "Mobile menu")
   * … unless the `onItemClick` function explicitly returns `false`.
   */
  onItemClick?: (item: MainMenu2Item) => void | boolean;
} & EitherObj<{ illustration?: Illustration }, { imageUrl?: string }> &
  WrapperElmProps &
  I18NProps<MainMenu2I18n> &
  SSRSupportProps;

// eslint-disable-next-line complexity
export const MainMenu2 = (props: MainMenu2Props) => {
  const {
    homeLink = '/',

    items,
    onItemClick,
    illustration,
    imageUrl,
    wrapperProps = {},
  } = props;
  const domid = useDomid(wrapperProps.id);
  const isBrowser = useIsBrowserSide(props.ssr);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const _wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperRef = wrapperProps.ref || _wrapperRef;

  const escHandler = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    (e: KeyboardEvent) => e.key === 'Escape' && closeMenu(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const openMenu = () => {
    htmlCl.add(globalClasses.menuIsOpen);
    htmlCl.remove(globalClasses.menuIsClosed);
    setIsMenuOpen(true);
    document.addEventListener('keydown', escHandler);
  };
  const closeMenu = () => {
    htmlCl.remove(globalClasses.menuIsOpen);
    htmlCl.add(globalClasses.menuIsClosed);
    setIsMenuOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setActiveSubmenu(defaultActive);
    wrapperRef.current!.scrollTo(0, 0);
    document.removeEventListener('keydown', escHandler);
  };

  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    htmlCl.add(globalClasses.menuIsClosed);
    return () => {
      closeMenu();
      htmlCl.remove(globalClasses.menuIsClosed);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBrowser]);

  const { mainItems, defaultActive } = useMemo(() => {
    if (!items.main || !items.main.length) {
      return { mainItems: undefined, defaultActive: -1 };
    }
    const mainItems = items.main.map((item) => {
      if (!('title' in item) || 'current' in item) {
        return item;
      }
      const current = item.subItems.find(
        (subItem): subItem is MainMenu2Item => 'current' in subItem && !!subItem.current
      )?.current;
      return { ...item, current };
    });

    let defaultActive = mainItems.findIndex((item) => 'current' in item && item.current);

    // Fall back to setting the first item as active, if the first item
    // has subItems.  If the first item is just a link/button, then we
    // just render everything equally not active.
    if (defaultActive < 0 && 'subItems' in (mainItems[0] || {})) {
      defaultActive = 0;
    }

    return { mainItems, defaultActive };
  }, [items.main]);

  const [activeSubmenu, setActiveSubmenu] = useState(defaultActive);
  // Insta-reset activeSubmenu when defaultActive changes (i.e. when the
  // menu-items updated) because we otherwise retain the menu's
  // activeSubmenu state between open/close cycles.
  const lastDefaultActive = useRef(defaultActive);
  if (defaultActive !== lastDefaultActive.current) {
    lastDefaultActive.current = defaultActive;
    setActiveSubmenu(defaultActive);
  }

  const txt = getTexts(props, defaultMainMenu2Texts);

  const { renderItem, renderList } = getRenderers({
    onItemClick,
    closeMenu,
    isBrowser,
  });

  const homeLinkItem = {
    ...(typeof homeLink === 'string'
      ? { href: homeLink, label: txt.homeLink }
      : homeLink),
    modifier: 'home',
  } satisfies MainMenu2Item;

  const menuImageUrl = imageUrl || (illustration && getIllustrationUrl(illustration));

  const menuId = `${domid}-menu`;

  return (
    <nav
      {...props.wrapperProps}
      className={modifiedClass(
        'MainMenu2',
        isBrowser && (isMenuOpen ? 'open' : 'closed'),
        wrapperProps.className
      )}
      style={
        menuImageUrl
          ? ({
              ...wrapperProps.style,
              '--menu-image': `url(${menuImageUrl})`,
            } as CSSProperties)
          : wrapperProps.style
      }
      ref={wrapperRef}
      aria-label={txt.title}
      data-sprinkled={isBrowser}
      id={menuId}
    >
      {isMenuOpen && <FocusTrap atTop />}
      <div className="MainMenu2__content">
        <h2 className="MainMenu2__title">{txt.title}</h2>
        {isBrowser ? (
          <ButtonPrimary
            className="MainMenu2__toggler"
            size="small"
            type="button"
            aria-pressed={isMenuOpen}
            aria-controls={menuId}
            {...(isMenuOpen
              ? {
                  onClick: closeMenu,
                  'aria-label': txt.closeMenuLong,
                  title: txt.closeMenuLong,
                  children: txt.closeMenu,
                }
              : {
                  onClick: openMenu,
                  'aria-label': txt.openMenuLong,
                  title: txt.openMenuLong,
                  children: txt.openMenu,
                })}
          />
        ) : (
          <ButtonPrimary
            className="MainMenu2__toggler"
            size="small"
            href={`#${menuId}`}
            onClick={handleAnchorLinkClick}
            aria-hidden="true"
          >
            {txt.title}
          </ButtonPrimary>
        )}

        {mainItems && (
          <div
            className={modifiedClass(
              'MainMenu2__main',
              activeSubmenu < 0 && 'noneActive'
            )}
          >
            {renderItem('MainMenu2__main__', homeLinkItem, { Tag: 'div' })}
            {mainItems.map((mainItem, i) => {
              if ('title' in mainItem) {
                const submenuId = `${domid}-submenu-${i}`;
                const isActive = i === activeSubmenu;

                return (
                  <Fragment key={i}>
                    <div
                      className="MainMenu2__main__item"
                      aria-current={mainItem.current || undefined}
                    >
                      {isBrowser ? (
                        <button
                          className="MainMenu2__main__link"
                          type="button"
                          onClick={() => setActiveSubmenu(i)}
                          aria-controls={submenuId}
                          aria-pressed={isActive}
                        >
                          {mainItem.title}
                        </button>
                      ) : (
                        <strong className="MainMenu2__main__link">
                          {mainItem.title}
                        </strong>
                      )}
                    </div>
                    {renderList(
                      'MainMenu2__main__sub__',
                      mainItem.subItems,
                      isBrowser && {
                        listProps: {
                          id: submenuId,
                          hidden: !isActive,
                        },
                      }
                    )}
                  </Fragment>
                );
              }
              return renderItem('MainMenu2__main__', mainItem, { key: i, Tag: 'div' });
            })}
          </div>
        )}

        {renderList('MainMenu2__hot__', items.hot, { buttons: true })}
        {renderList('MainMenu2__extra__', items.extra, { buttons: true })}

        {items.related && items.related.length > 0 && (
          <div className="MainMenu2__related">
            {items.relatedTitle && (
              <h3 className="MainMenu2__related__title">{items.relatedTitle}</h3>
            )}
            {renderList('MainMenu2__related__', items.related)}
          </div>
        )}
      </div>
      {isMenuOpen && <FocusTrap />}
    </nav>
  );
};
