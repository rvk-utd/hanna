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
import { IconName } from '@reykjavik/hanna-css';
import { ClassNameModifiers, EitherObj, modifiedClass } from '@reykjavik/hanna-utils';

import { Button, ButtonVariantProps } from './_abstract/_Button.js';
import { useCallbackOnEsc } from './utils/useCallbackOnEsc.js';
import { useLaggedState } from './utils/useLaggedState.js';
import { useOnClickOutside } from './utils/useOnClickOutside.js';
import { FocusTrap } from './FocusTrap.js';
import { MainMenu2Item } from './MainMenu2.js';
import { SSRSupportProps, useIsBrowserSide, WrapperElmProps } from './utils.js';

type Prefix<record extends Record<string, unknown>, prefix extends string> = {
  [K in keyof record as `${prefix}${Capitalize<string & K>}`]: record[K];
};

// ---------------------------------------------------------------------------

export type DropdownButtonItem = {
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
  onClick?: (item: MainMenu2Item) => void | boolean;
  /** Sets `aria-controls=""` on `<button/>`s with `onClick` */
  controlsId?: string;

  Content?: never; // To discrimiate bteween this and `MainMenu2CustomItem`

  icon?: IconName;
};

type DropdownButtonCustomItemFn = (props: { closeMenu: () => void }) => ReactElement;

export type DropdownButtonCustomItem = Pick<
  DropdownButtonItem,
  'modifier' | 'current'
> & {
  Content: DropdownButtonCustomItemFn;
};

//

export type DropdownButtonProps = {
  /** The items to display inside the dropdown menu */
  items: Array<DropdownButtonItem | DropdownButtonCustomItem>;
  /**
   * NOTE: Clicking a DropdownButton item will automatically close the drropdown
   * … unless the `onItemClick` function explicitly returns `false`.
   */
  onItemClick?: (item: MainMenu2Item) => void | boolean;
} & EitherObj<
  {
    /** Label for the toggler button */
    label: string | ReactElement;
    /** Longer accessible toggler label text */
    labelLong?: string;
    /** Default: `"secondary"` */
    buttonType?: 'primary' | 'secondary';
  } & Prefix<Omit<ButtonVariantProps, 'small'>, 'button'>,
  {
    /** Custom toggler rendering function component */
    Toggler: (props: { isOpen: boolean }) => ReactElement;
  }
> &
  WrapperElmProps<'details', 'open' | 'name'> &
  SSRSupportProps;

export const DropdownButton = (props: DropdownButtonProps) => {
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
      className={modifiedClass(
        'DropdownButton',
        isOpen && 'open',
        wrapperProps.className
      )}
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
        refs.setReference(elm.querySelector('.DropdownButton__toggler'));
        refs.setFloating(elm.querySelector('.DropdownButton__menu'));
      }}
    >
      {props.Toggler ? (
        <summary className="DropdownButton__toggler" onClick={toggle}>
          <props.Toggler isOpen={isOpen} />
        </summary>
      ) : (
        <Button
          as="summary"
          className="DropdownButton__toggler"
          bem={props.buttonType === 'primary' ? 'ButtonPrimary' : 'ButtonSecondary'}
          icon={props.buttonIcon}
          size={props.buttonSize}
          variant={props.buttonVariant}
          aria-label={props.labelLong}
          onClick={toggle}
        >
          {props.label}
        </Button>
      )}
      <ul
        className="DropdownButton__menu"
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
                '--DropdownButton-pos-y': `${y}px`,
                '--DropdownButton-pos-x': `${x}px`,
              } as CSSProperties)
            : undefined
        }
      >
        {props.items.map((item, i) => {
          if (typeof item === 'function') {
            item = { Content: item };
          }

          const itemProps = {
            className: modifiedClass('DropdownButton__item', item.modifier),
            'aria-current': item.current || undefined,
          };

          if ('Content' in item && item.Content) {
            return (
              <li key={i} data-customitem="" {...itemProps}>
                <item.Content closeMenu={closeMenuStat} />
              </li>
            );
          }

          const { label, onClick, href } = item;

          const commonProps = {
            className: 'DropdownButton__itembutton',
            lang: item.lang,
            'data-icon': item.icon,
            'arial-label': item.labelLong,
          };

          const doRenderButton = isBrowser && (onClick || (onItemClick && href == null));

          // TypeScript type-narrowing helper for the onClick callbacks below — because
          // `item` is a variable and could hypothetically change before the click occurs
          const _item = item;

          return (
            <li
              key={i}
              className={modifiedClass('DropdownButton__item', item.modifier)}
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
        })}
        <FocusTrap Tag="li" depth={2} />
      </ul>
    </details>
  );
};
