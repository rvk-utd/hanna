import React, { RefObject } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { Link } from '../_abstract/_Link';
import { MainMenuI18n, MegaMenuPanel } from '../MainMenu';

type PrimaryPanelProps = {
  setActivePanel: (panel: MegaMenuPanel | undefined, setFocus?: boolean) => void;
  isParent?: boolean;
  isActive?: boolean;
  panel: MegaMenuPanel;
  texts: MainMenuI18n;
  activeRef: RefObject<HTMLLIElement>;
  isBrowser: true | undefined;
};

export const PrimaryPanel = (props: PrimaryPanelProps) => {
  const { setActivePanel, panel, isParent, isActive, isBrowser, texts } = props;
  const { items } = panel;
  return (
    <li
      ref={isActive ? props.activeRef : undefined}
      className={getBemClass('PrimaryPanel', [
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
            className="PrimaryPanel__item"
            aria-current={item.current || undefined}
          >
            <Link
              className="PrimaryPanel__link"
              href={item.href}
              target={item.target}
              lang={item.lang}
            >
              <span className="PrimaryPanel__linkTitle">{item.label}</span>{' '}
              <small className="PrimaryPanel__summary">{item.summary}</small>{' '}
            </Link>
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
