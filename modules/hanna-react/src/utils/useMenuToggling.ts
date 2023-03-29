import { useRef, useState } from 'react';
import { focusElement } from '@reykjavik/hanna-utils';

import { useFormatMonitor } from './useFormatMonitor.js';

const htmlClass = (className: string, add: boolean) => {
  document.documentElement.classList[add ? 'add' : 'remove'](className);
};

const noop = () => undefined;

// ---------------------------------------------------------------------------

type MenuTogglingState = {
  isMenuActive: true | undefined;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

// ---------------------------------------------------------------------------

export const useMenuToggling = (doInitialize = true): MenuTogglingState => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState<true | undefined>();

  const _state = { isMenuOpen, isMenuActive };
  const stateRef = useRef(_state);
  stateRef.current = _state;

  const _openMenu = () => {
    if (!stateRef.current.isMenuOpen) {
      setIsMenuOpen(true);
      htmlClass('menu-is-open', true);
      htmlClass('menu-is-closed', false);
      focusElement('#pagenav');
    }
  };
  const _closeMenu = () => {
    if (stateRef.current.isMenuOpen) {
      setIsMenuOpen(false);
      htmlClass('menu-is-closed', true);
      htmlClass('menu-is-open', false);
      focusElement('.Layout__header__skiplink');
    }
  };

  useFormatMonitor(
    doInitialize
      ? (media) => {
          if (media.becameHamburger) {
            setIsMenuActive(true);
            htmlClass('menu-is-active', true);
            htmlClass('menu-is-closed', true);
          }
          if (media.leftHamburger) {
            _closeMenu();
            setIsMenuActive(undefined);
            htmlClass('menu-is-active', false);
            htmlClass('menu-is-closed', false);
          }
        }
      : noop
  );

  const { toggleMenu, closeMenu } = useRef(
    doInitialize
      ? {
          toggleMenu: () => {
            if (stateRef.current.isMenuActive) {
              stateRef.current.isMenuOpen ? _closeMenu() : _openMenu();
            }
          },
          closeMenu: _closeMenu,
        }
      : { toggleMenu: noop, closeMenu: noop }
  ).current;

  return {
    isMenuActive,
    isMenuOpen,
    toggleMenu,
    closeMenu,
  };
};
