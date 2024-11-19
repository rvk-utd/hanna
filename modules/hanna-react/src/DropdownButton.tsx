import React, { CSSProperties, MutableRefObject, useState } from 'react';
import { autoUpdate, flip, shift, useFloating } from '@floating-ui/react';
import { IconName } from '@reykjavik/hanna-css';
import { modifiedClass } from '@reykjavik/hanna-utils';

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

export type DropdownButtonItem = MainMenu2Item & { icon?: IconName };

export type DropdownButtonCustomItem = (props: {
  closeMenu: () => void;
}) => React.ReactElement;

//

export type DropdownButtonProps = Prefix<Omit<ButtonVariantProps, 'small'>, 'button'> & {
  label: string | NonNullable<React.ReactElement>;
  labelLong?: string;
  /** Default: `"seconcary"` */
  buttonType?: 'primary' | 'secondary';
  items: Array<DropdownButtonItem | DropdownButtonCustomItem>;
} & WrapperElmProps<'details', 'open' | 'name'> &
  SSRSupportProps;

export const DropdownButton = (props: DropdownButtonProps) => {
  const [isOpen, setIsOpen] = useLaggedState(false, 10);
  const isBrowser = useIsBrowserSide(props.ssr);
  const [isHovering, setIsHovering] = useState(false);
  const wrapperRef = React.useRef<HTMLDetailsElement>(null);

  const closeMenuStat = () => setIsOpen(false, 0);

  useOnClickOutside(wrapperRef, isOpen && closeMenuStat);
  useCallbackOnEsc(isOpen && closeMenuStat);

  const { x, y, refs } = useFloating({
    placement: 'bottom-start',
    middleware: [flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { wrapperProps = {} } = props;

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
      <Button
        as="summary"
        className="DropdownButton__toggler"
        bem={props.buttonType === 'primary' ? 'ButtonPrimary' : 'ButtonSecondary'}
        icon={props.buttonIcon}
        size={props.buttonSize}
        variant={props.buttonVariant}
        aria-label={props.labelLong}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen, 0);
        }}
      >
        {props.label}
      </Button>

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
            const Item = item;
            return (
              <li key={i} className="DropdownButton__item">
                <Item closeMenu={closeMenuStat} />
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
          return (
            <li key={i} className="DropdownButton__item">
              {isBrowser && onClick ? (
                <button
                  {...commonProps}
                  type="button"
                  aria-controls={item.controlsId}
                  onClick={(e) => {
                    onClick(item) !== false && closeMenuStat();
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
