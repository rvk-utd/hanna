import React, { RefObject } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { Modifiers } from '@hugsmidjan/react/types';
import { EitherObj } from '@reykjavik/hanna-utils';

import { Link } from '../_abstract/_Link.js';

export type PrimaryPanelI18n = {
  backToMenu: string;
  backToMenuLong?: string;
};

export type MegaMenuItem = {
  current?: boolean;
  /** Puts a modifier className on the menu item element. */
  modifier?: Modifiers;
} & EitherObj<
  {
    label: string;
    summary?: string;
    href: string;
    lang?: string;
    target?: React.HTMLAttributeAnchorTarget;
  },
  {
    Content: () => JSX.Element;
  }
>;

export type MegaMenuItemList = Array<MegaMenuItem>;

export type MegaMenuPanel = {
  title: string;
  items: MegaMenuItemList;
  id: string;
};

type PrimaryPanelProps = {
  setActivePanel: (panel: MegaMenuPanel | undefined, setFocus?: boolean) => void;
  isParent?: boolean;
  isActive?: boolean;
  panel: MegaMenuPanel;
  texts: PrimaryPanelI18n;
  activeRef: RefObject<HTMLLIElement>;
  isBrowser: true | undefined;
};

export const PrimaryPanel = (props: PrimaryPanelProps) => {
  const { setActivePanel, panel, isParent, isActive, isBrowser, texts } = props;
  const { items } = panel;
  return (
    <li
      ref={isActive ? props.activeRef : undefined}
      className={modifiedClass('PrimaryPanel', [
        isParent && 'parent',
        isActive && 'active',
        items.length > 5 && 'twocol', // TODO: allow setting twocol manually?
      ])}
      id={panel.id}
    >
      <h3 className="PrimaryPanel__title">
        {' '}
        {isBrowser && !isActive ? (
          <button
            className="MainMenu__mega__title-toggler"
            aria-controls={panel.id}
            onClick={() => setActivePanel(panel, false)}
            aria-pressed={isActive}
            type="button"
          >
            {panel.title}
          </button>
        ) : (
          panel.title
        )}
      </h3>
      <ul className="PrimaryPanel__items">
        {items.map((item, i) => (
          <li
            key={i}
            className={modifiedClass('PrimaryPanel__item', item.modifier)}
            aria-current={item.current || undefined}
          >
            {item.Content ? (
              <item.Content />
            ) : (
              <Link
                className="PrimaryPanel__link"
                href={item.href}
                target={item.target}
                lang={item.lang}
              >
                <span className="PrimaryPanel__linkTitle">{item.label}</span>{' '}
                <small className="PrimaryPanel__summary">{item.summary}</small>{' '}
              </Link>
            )}
          </li>
        ))}
      </ul>
      {isBrowser && isActive && (
        <button
          className="MainMenu__megapanel__backtomenu"
          aria-controls={panel.id}
          aria-label={texts.backToMenuLong}
          onClick={() => setActivePanel(undefined)}
          type="button"
        >
          {texts.backToMenu}
        </button>
      )}
    </li>
  );
};
