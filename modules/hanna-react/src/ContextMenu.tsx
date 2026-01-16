import React, {
  CSSProperties,
  HTMLAttributeAnchorTarget,
  MouseEvent,
  MutableRefObject,
  ReactElement,
  useRef,
  useState,
} from 'react';
import { autoUpdate, flip, shift, useFloating } from '@floating-ui/react';
import { IconToken } from '@reykjavik/hanna-css';
import { ClassNameModifiers, EitherObj, modifiedClass } from '@reykjavik/hanna-utils';

import { IconName_old } from '../../hanna-css/src/lib/icons.js';

import { Button, ButtonVariantProps } from './_abstract/_Button.js';
import { useCallbackOnEsc } from './utils/useCallbackOnEsc.js';
import { useLaggedState } from './utils/useLaggedState.js';
import { useOnClickOutside } from './utils/useOnClickOutside.js';
import { FocusTrap } from './FocusTrap.js';
import { SSRSupportProps, useIsBrowserSide, WrapperElmProps } from './utils.js';

type Prefix<record extends Record<string, unknown>, prefix extends string> = {
  [K in keyof record as `${prefix}${Capitalize<string & K>}`]: record[K];
};

// ---------------------------------------------------------------------------

export type ContextMenuItem = {
  /** Visible label text */
  label: string | ReactElement;
  /** Un-abbreviated label set as `aria-label=""` */
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
  target?: HTMLAttributeAnchorTarget;

  /**
   * Adding `onClick` automatically results in a <button/> element being
   * rendered. If `href` is also passed, then a <a href/> element is rendered
   * during initial (server-side) render, which then gets replaced by a
   * <button/> element during the first client-side
   *
   * NOTE: Clicking a menu item will automatically close tghe menu
   * … unless the `onClick` function explicitly returns `false`.
   */
  onClick?: (item: ContextMenuItem) => void | boolean;
  /** Sets `aria-controls=""` on `<button/>`s with `onClick` */
  controlsId?: string;

  Content?: never; // To discrimiate bteween this and `ContextMenuCustomItem`

  /** Seldom used flag for buttons that do destruction */
  destructive?: boolean;

  // eslint-disable-next-line deprecation/deprecation
  icon?: IconToken | IconName_old;
};

type ContextMenuCustomItemFn = (props: { closeMenu: () => void }) => ReactElement;

export type ContextMenuCustomItem = Pick<ContextMenuItem, 'modifier' | 'current'> & {
  Content: ContextMenuCustomItemFn;
};

//

/** Renders a divider line between `ContextMenu*Item`s with an optional legend */
export type ContextMenuItemDivider = {
  divider: true;
  label?: string;
};

export type ContextMenuProps = {
  /** The items to display inside the dropdown menu */
  items: Array<ContextMenuItem | ContextMenuCustomItem | ContextMenuItemDivider>;
  /**
   * NOTE: Clicking a ContextMenu item will automatically close the drropdown
   * … unless the `onItemClick` function explicitly returns `false`.
   *
   * **NOTE:** Customm items will need to call `closeMenu()` themselves.
   */
  onItemClick?: (item: ContextMenuItem) => void | boolean;
} & EitherObj<
  {
    /** Label for the toggler */
    label: string | ReactElement;
    /** Longer accessible toggler label text */
    labelLong?: string;
    /** Default: `"secondary"` */
    togglerType?: 'primary' | 'secondary';
  } & Prefix<Omit<ButtonVariantProps, 'small'>, 'toggler'>,
  {
    /** Custom toggler rendering function component */
    Toggler: (props: { isOpen: boolean }) => ReactElement;
  }
> &
  WrapperElmProps<'details', 'open' | 'name'> &
  SSRSupportProps;

export const ContextMenu = (props: ContextMenuProps) => {
  const [isOpen, setIsOpen] = useLaggedState(false, 10);
  const isBrowser = useIsBrowserSide(props.ssr);
  const [isHovering, setIsHovering] = useState(false);
  const wrapperRef = useRef<HTMLDetailsElement>(null);

  const closeMenuStat = () => setIsOpen(false, 0);

  useOnClickOutside(wrapperRef, isOpen && closeMenuStat);
  useCallbackOnEsc(isOpen && closeMenuStat);

  const { x, y, refs } = useFloating({
    placement: 'bottom-start',
    middleware: [flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { onItemClick, wrapperProps = {} } = props;

  const toggle = (e: MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen, 0);
  };

  return (
    <details
      {...wrapperProps}
      className={modifiedClass('ContextMenu', isOpen && 'open', wrapperProps.className)}
      open={isOpen}
      onBlur={(e) => {
        if (!isHovering) {
          setIsOpen(false, 300);
        }
        wrapperProps.onBlur?.(e);
      }}
      ref={(elm) => {
        if (!elm) {
          return;
        }
        (wrapperRef as MutableRefObject<HTMLDetailsElement>).current = elm;
        refs.setReference(elm.querySelector('.ContextMenu__toggler'));
        refs.setFloating(elm.querySelector('.ContextMenu__menu'));
      }}
    >
      {props.Toggler ? (
        <summary className="ContextMenu__toggler" onClick={toggle}>
          <props.Toggler isOpen={isOpen} />
        </summary>
      ) : (
        <Button
          as="summary"
          className="ContextMenu__toggler"
          bem={props.togglerType === 'primary' ? 'ButtonPrimary' : 'ButtonSecondary'}
          icon={props.togglerIcon}
          size={props.togglerSize}
          variant={props.togglerVariant}
          aria-label={props.labelLong}
          onClick={toggle}
        >
          {props.label}
        </Button>
      )}
      <ul
        className="ContextMenu__menu"
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
        onFocus={() => {
          setIsOpen(true, 0);
        }}
        style={
          x != null
            ? ({
                '--ContextMenu-pos-y': `${y}px`,
                '--ContextMenu-pos-x': `${x}px`,
              } as CSSProperties)
            : undefined
        }
      >
        {props.items.map(
          // eslint-disable-next-line complexity
          (item, i) => {
            if ('divider' in item) {
              if ((i === 0 && !item.label) || i === props.items.length - 1) {
                // Gracefully omit pointless dividers
                return null;
              }
              return (
                <li
                  key={i}
                  className={modifiedClass(
                    'ContextMenu__itemDivider',
                    item.label && 'labelled'
                  )}
                >
                  {item.label || false}
                </li>
              );
            }
            if (typeof item === 'function') {
              item = { Content: item };
            }

            const itemProps = {
              className: modifiedClass('ContextMenu__item', item.modifier),
              'aria-current': item.current || undefined,
            };

            if ('Content' in item && item.Content) {
              return (
                <li key={i} data-customitem="" {...itemProps}>
                  <item.Content closeMenu={closeMenuStat} />
                </li>
              );
            }

            const { label, onClick, href, destructive } = item;

            const commonProps = {
              className: modifiedClass(
                'ContextMenu__itembutton',
                destructive && 'destructive'
              ),
              lang: item.lang,
              'data-icon': item.icon,
              'arial-label': item.labelLong,
            };

            const doRenderButton =
              isBrowser && (onClick || (onItemClick && href == null));

            // TypeScript type-narrowing helper for the onClick callbacks below — because
            // `item` is a variable and could hypothetically change before the click occurs
            const _item = item;

            return (
              <li
                key={i}
                className={modifiedClass('ContextMenu__item', item.modifier)}
                aria-current={item.current || undefined}
              >
                {doRenderButton ? (
                  <button
                    {...commonProps}
                    type="button"
                    aria-controls={item.controlsId}
                    onClick={() => {
                      const keepOpen1 = onClick && onClick(_item) === false;
                      const keepOpen2 = onItemClick && onItemClick(_item) === false;
                      !(keepOpen1 || keepOpen2) && closeMenuStat();
                    }}
                  >
                    {label}
                  </button>
                ) : href != null ? (
                  <a
                    {...commonProps}
                    href={href}
                    hrefLang={item.hrefLang}
                    target={item.target}
                    onClick={() => {
                      const keepOpen = onItemClick && onItemClick(_item) === false;
                      !keepOpen && closeMenuStat();
                    }}
                  >
                    {label}
                  </a>
                ) : null}
              </li>
            );
          }
        )}
        <FocusTrap Tag="li" depth={2} />
      </ul>
    </details>
  );
};
