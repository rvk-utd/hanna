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
import { IconName } from '@reykjavik/hanna-css';
import {
  ClassNameModifiers,
  Cleanup,
  EitherObj,
  modifiedClass,
} from '@reykjavik/hanna-utils';
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

type Falseish = undefined | null | false;

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
  label: string | ReactElement;
  /** Un-abbreviated label set as `title=""` and `aria-label=""` */
  labelLong?: string;
  /** Language of the link label */
  lang?: string;
  /** Languge of the linked resource */
  hrefLang?: string;

  /**
   * Puts a modifier className for the menu __item <li/> element.
   * */
  modifier?: ClassNameModifiers;
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
   * NOTE: Clicking a menu item will automatically close tghe menu
   * … unless the `onClick` function explicitly returns `false`.
   */
  onClick?: (item: MainMenu2Item) => void | boolean;
  /** Sets `aria-controls=""` on `<button/>`s with `onClick` */
  controlsId?: string;

  Content?: never; // To discrimiate bteween this and MainMenu2CustomItem
};

export type MainMenu2ButtonItem = MainMenu2Item & {
  icon?: 'search' | 'user' | 'alert' | 'globe';
};

type MainMenu2CustomItemFn = (props: {
  closeMenu: () => void;
  openMenu: () => void;
}) => ReactElement;

export type MainMenu2CustomItem = Pick<MainMenu2Item, 'modifier' | 'current'> & {
  Content: MainMenu2CustomItemFn;
};

export type MainMenu2SubMenuItem = MainMenu2Item & { descr?: string };

export type MainMenu2SubMenu = {
  title: string;
  current?: boolean;
  subItems: Array<
    MainMenu2SubMenuItem | MainMenu2CustomItem | MainMenu2CustomItemFn | Falseish
  >;
};

export type MainMenu2ItemList = Array<
  MainMenu2Item | MainMenu2CustomItem | MainMenu2CustomItemFn | Falseish
>;
export type MainMenu2ButtonItemList<Extra = unknown> = Array<
  | (MainMenu2ButtonItem & Extra)
  | (MainMenu2CustomItem & Extra)
  | MainMenu2CustomItemFn
  | Falseish
>;
export type MainMenu2SubMenuItemList = Array<
  MainMenu2SubMenuItem | MainMenu2CustomItem | MainMenu2CustomItemFn | Falseish
>;

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
  openMenu: () => void;
  isBrowser?: true;
}) => {
  const { onItemClick, closeMenu, openMenu, isBrowser } = props;
  type AnyMenuItem =
    | (MainMenu2Item & MainMenu2ButtonItem & MainMenu2SubMenuItem)
    | MainMenu2CustomItem
    | MainMenu2CustomItemFn
    | Falseish;

  // eslint-disable-next-line complexity
  const renderItem = (
    classPrefix: string,
    item: AnyMenuItem,
    opts: {
      key?: number;
      Tag?: 'li' | 'div';
      button?: boolean;
    } = {}
  ) => {
    if (!item) {
      return;
    }
    const { key, Tag = 'li', button } = opts;
    if (typeof item === 'function') {
      item = { Content: item };
    }

    const itemProps = {
      key,
      className: modifiedClass(`${classPrefix}item`, item.modifier),
      'aria-current': item.current || undefined,
    };

    if ('Content' in item) {
      return (
        <Tag data-customitem="" {...itemProps}>
          <item.Content closeMenu={closeMenu} openMenu={openMenu} />
        </Tag>
      );
    }
    const linkClassName = `${classPrefix}link`;
    const { label, labelLong, href, target, lang, controlsId, onClick, descr, icon } =
      item;

    // TypeScript type-narrowing helper for the onClick callbacks below — because
    // `item` is a variable and could hypothetically change before the click occurs
    const _item = item;

    const itemDescr = descr && (
      <>
        {' '}
        <small className={`${linkClassName}__descr`}>{descr}</small>
      </>
    );

    const ButtonTag = button ? ButtonSecondary : 'button';
    const LinkTag = button ? ButtonSecondary : Link;

    const commonProps = {
      className: linkClassName,
      'data-icon': icon ? iconMap[icon] : undefined,
      'arial-label': labelLong,
      title: labelLong, // For auto-tooltips on desktop
      lang,
    };
    const buttonCompProps = button
      ? {
          size: 'small' as const,
        }
      : undefined;

    const doRenderButton = isBrowser && (onClick || (onItemClick && href == null));

    return (
      <Tag
        key={key}
        className={modifiedClass(`${classPrefix}item`, item.modifier)}
        aria-current={item.current || undefined}
      >
        {doRenderButton ? (
          <ButtonTag
            {...commonProps}
            type="button"
            aria-controls={controlsId}
            onClick={() => {
              const keepOpen1 = onClick && onClick(_item) === false;
              const keepOpen2 = onItemClick && onItemClick(_item) === false;
              !(keepOpen1 || keepOpen2) && closeMenu();
            }}
            {...buttonCompProps}
          >
            {label} {itemDescr}
          </ButtonTag>
        ) : href != null ? (
          <LinkTag
            {...commonProps}
            href={href}
            hrefLang={item.hrefLang}
            target={target}
            onClick={() => {
              const keepOpen = onItemClick && onItemClick(_item) === false;
              !keepOpen && closeMenu();
            }}
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
    items?: Array<AnyMenuItem | Falseish>,
    opts: { listProps?: HTMLProps<'ul'>; buttons?: boolean } = {}
  ) => {
    if (!items || !items.length) {
      return null;
    }
    return (
      <ul className={`${classSuffix}items`} {...opts.listProps}>
        {items.map(
          (listItem, i) =>
            listItem &&
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
    hot?: MainMenu2ButtonItemList<{ redhot?: true }>;
    extra?: MainMenu2ButtonItemList;

    relatedTitle?: string;
    related?: MainMenu2ButtonItemList;
  };

  /** Visual type */
  variant?: 'default' | 'light';

  /**
   * NOTE: Clicking a `MainMenu2` item will automatically close the menu
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
    variant,
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
    // closeMenu is called on umount, and then the ref might be null
    wrapperRef.current?.scrollTo(0, 0);
    document.removeEventListener('keydown', escHandler);
  };

  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    htmlCl.add(globalClasses.menuIsClosed);
    return () => {
      htmlCl.remove(globalClasses.menuIsClosed);
      closeMenu();
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
        (subItem): subItem is MainMenu2Item =>
          !!(subItem && 'current' in subItem && !!subItem.current)
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
    openMenu,
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
        [
          isBrowser && (isMenuOpen ? 'open' : 'closed'),
          variant && variant !== 'default' ? `variant--${variant}` : undefined,
        ],
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

        {renderList(
          'MainMenu2__hot__',
          items.hot?.map((i) => {
            if (i && 'redhot' in i) {
              return {
                ...i,
                modifier: i.modifier ? [i.modifier, 'redhot'] : 'redhot',
              };
            }
            return i;
          }),
          { buttons: true }
        )}
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
