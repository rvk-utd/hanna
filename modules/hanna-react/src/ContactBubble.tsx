import React, { useEffect, useMemo, useRef, useState } from 'react';
import focusElm from '@hugsmidjan/qj/focusElm';
import { SSRSupport, useDomid, useIsBrowserSide } from '@hugsmidjan/react/hooks';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
import { getPageScrollElm } from '@reykjavik/hanna-utils';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import { Link } from './_abstract/_Link';

export type ContactBubbleI18n = {
  lang?: string;
  openBtn: string;
  openBtnLong?: string;
  closeBtn: string;
  closeBtnLong?: string;
};

export const defaultTexts: DefaultTexts<ContactBubbleI18n> = {
  is: {
    lang: 'is',
    openBtn: 'Hafa samband',
    closeBtn: 'Loka',
    closeBtnLong: 'Loka valmynd',
  },
  en: {
    lang: 'en',
    openBtn: 'Contact us',
    closeBtn: 'Close',
    closeBtnLong: 'Close bubble',
  },
};

// ---------------------------------------------------------------------------

const icons = {
  suggestions: 1,
  phone: 1,
  faq: 1,
  livechat: 1,
  other: 0,
} as const;

export type ContactBubbleIcon = keyof typeof icons;

export const ensureIcon = (
  maybeIcon: string | undefined
): ContactBubbleIcon | undefined =>
  maybeIcon && icons[maybeIcon as ContactBubbleIcon]
    ? (maybeIcon as ContactBubbleIcon)
    : undefined;

// ---------------------------------------------------------------------------

export type ContactBubbleItem = {
  label: string;
  extraLabel?: string;
  icon?: ContactBubbleIcon;
} & (
  | {
      href: string;
      /** Prevents default link behavior unless the handler function returns `true` */
      onClick?: () => void | boolean;
      target?: string;
    }
  | {
      onClick: () => void | boolean;
      href?: undefined;
      target?: undefined;
    }
);

// ---------------------------------------------------------------------------

export type ContactBubbleProps = {
  title?: string;
  links: Array<ContactBubbleItem>;
  /** By default the ContactBubble's toggler is hidden if the page
   * is scrolled to near the top or the bottom.
   *
   * This means that on short pages (with hardly any scrolling)
   * the ContactBubble **always** hidden.
   *
   * Set this prop to `true` if you want to disable this
   * magic and always show the bubble toggler
   */
  alwaysShow?: boolean;
  texts?: ContactBubbleI18n;
  lang?: string;
  ssr?: SSRSupport;
} & (
  | {
      open?: boolean;
      onToggle: (isOpen: boolean) => void;
    }
  | {
      open?: undefined;
      onToggle?: (isOpen: boolean) => void;
    }
);

const ContactBubble = (props: ContactBubbleProps) => {
  const { title, links, onToggle, alwaysShow } = props;
  const txt = getTexts(props, defaultTexts);

  const useLocalState = props.open == null;
  const [localOpen, setLocalOpen] = useState(false);

  const open = useLocalState ? localOpen : props.open;

  const isBrowser = useIsBrowserSide(props.ssr);
  const domid = useDomid();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { openBubble, closeBubble } = useMemo(
    () => ({
      openBubble: () => {
        useLocalState && setLocalOpen(true);
        onToggle && onToggle(true);
      },
      closeBubble: (setFocus?: boolean) => {
        useLocalState && setLocalOpen(false);
        onToggle && onToggle(false);
        setFocus !== false && focusElm(wrapperRef.current);
      },
    }),
    [useLocalState, onToggle]
  );

  useEffect(() => {
    const wrapperElm = wrapperRef.current;
    if (!wrapperElm) {
      return;
    }
    if (alwaysShow) {
      wrapperElm.dataset.show = 'true';
      return;
    }
    const scrollElm = getPageScrollElm();
    let pending = 0;
    const checkScroll = () => {
      if (!pending) {
        pending = requestAnimationFrame(() => {
          const { scrollTop, scrollHeight, clientHeight } = scrollElm;
          const scrollLength = scrollHeight - clientHeight;
          // const f = scrollLength > 600 ? 1 : (scrollLength - 200) / 600;
          const f = 1;
          const show = scrollTop > f * 150 && scrollLength - scrollTop > f * 250;

          wrapperElm.dataset.show = String(show);
          !show && closeBubble(false);
          pending = 0;
        });
      }
    };

    checkScroll();

    // Set scroll-listeners on both the ´document` and the `scrollElm`
    // because mobile browsers seem to handle CSS height and overflow
    // rules on <html> and <body> differently from desktop browsers.
    // Only one of these two handlers seems to trigger though,
    // (as Element scroll events don't bubble)
    // and even if they did, the rAF throttling prevents that from
    // becoming a problem.
    document.addEventListener('scroll', checkScroll);
    scrollElm.addEventListener('scroll', checkScroll);
    return () => {
      document.removeEventListener('scroll', checkScroll);
      scrollElm.removeEventListener('scroll', checkScroll);
    };
  }, [isBrowser, alwaysShow, closeBubble]);

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => e.key === 'Escape' && closeBubble();

    const outsideClickHandler = (e: MouseEvent) => {
      if (open && !wrapperRef.current?.contains(e.target as Element | null)) {
        closeBubble(false);
      }
    };
    document.addEventListener('keydown', escHandler);
    document.addEventListener('click', outsideClickHandler, true);
    const htmlDataset = document.documentElement.dataset;
    if (open) {
      htmlDataset.contactBubble = 'true';
    } else {
      delete htmlDataset.contactBubble;
    }

    return () => {
      delete htmlDataset.contactBubble;
      document.removeEventListener('keydown', escHandler);
      document.removeEventListener('click', outsideClickHandler, true);
    };
  }, [open, closeBubble]);

  if (links.length === 0) {
    return null;
  }

  const menu = (
    <div
      className="ContactBubble"
      id={isBrowser && domid}
      hidden={isBrowser && !open}
      data-always-show={alwaysShow || undefined}
      data-sprinkled={isBrowser}
    >
      <h2 className="ContactBubble__title">{title || txt.openBtn}</h2>
      <ul className="ContactBubble__list">
        {links.map((linkInfo, i) => {
          const { href, label, extraLabel, target, onClick } = linkInfo;
          const icon = ensureIcon(linkInfo.icon);
          const itemClass = getBemClass('ContactBubble__item', icon && 'type--' + icon);
          const onClickHandler =
            onClick &&
            ((e: React.MouseEvent) => {
              if (!onClick()) {
                e.preventDefault();
                closeBubble(false);
              }
            });

          const content = [
            ' ',
            label,
            '\n',
            extraLabel && <small key="🤡">{extraLabel}</small>,
            '\n',
          ];

          return (
            <li key={i} className={itemClass}>
              {href && href !== '#' ? (
                <Link
                  className="ContactBubble__link"
                  href={href}
                  onClick={onClickHandler}
                  target={target}
                >
                  {content}
                </Link>
              ) : (
                <button
                  className="ContactBubble__link"
                  onClick={onClickHandler}
                  type="button"
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {'\n\n'}
      {isBrowser && (
        <button
          className="ContactBubble__closebtn"
          aria-controls={domid}
          aria-label={txt.closeBtnLong}
          onClick={() => closeBubble()}
          type="button"
        >
          {txt.closeBtn}
        </button>
      )}
    </div>
  );

  return isBrowser ? (
    <div className="ContactBubble__wrapper" ref={wrapperRef}>
      <button
        className="ContactBubble__openbtn"
        aria-controls={domid}
        aria-expanded={open}
        aria-label={txt.openBtnLong}
        onClick={open ? () => closeBubble() : openBubble}
        type="button"
      >
        {txt.openBtn}
      </button>
      {'\n\n'}
      {menu}
    </div>
  ) : (
    menu
  );
};

export default ContactBubble;
