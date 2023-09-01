import { useRef, useState } from 'react';
import { focusElement } from '@reykjavik/hanna-utils';

import { HannaUIStateState } from './HannaUIState.js';
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
  uiState: HannaUIStateState;
};

// ---------------------------------------------------------------------------

export const useMenuToggling = (doInitialize = true): MenuTogglingState => {
  const stateRef = useRef({
    isMenuOpen: false,
    isMenuActive: undefined as true | undefined,
    toggleMenu: doInitialize
      ? () => {
          if (stateRef.current.isMenuActive) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            stateRef.current.isMenuOpen ? _closeMenu() : _openMenu();
          }
        }
      : noop,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    closeMenu: () => doInitialize && _closeMenu(),
  });

  const [{ isMenuOpen, isMenuActive, uiState }, setMenuState] = useState<{
    isMenuOpen: boolean;
    isMenuActive: true | undefined;
    uiState: HannaUIStateState;
  }>({
    isMenuOpen: false,
    isMenuActive: undefined,
    uiState: {
      closeHamburgerMenu: () => stateRef.current.closeMenu(),
      isHamburgerMenuOpen: false,
    },
  });

  stateRef.current.isMenuOpen = isMenuOpen;
  stateRef.current.isMenuActive = isMenuActive;

  const _openMenu = () => {
    if (!stateRef.current.isMenuOpen) {
      setMenuState((state) => ({
        ...state,
        isMenuOpen: true,
        uiState: { ...state.uiState, isHamburgerMenuOpen: true },
      }));
      htmlClass('menu-is-open', true);
      htmlClass('menu-is-closed', false);
      focusElement('#pagenav');
    }
  };
  const _closeMenu = () => {
    if (stateRef.current.isMenuOpen) {
      setMenuState((state) => ({
        ...state,
        isMenuOpen: false,
        uiState: { ...state.uiState, isHamburgerMenuOpen: false },
      }));
      htmlClass('menu-is-closed', true);
      htmlClass('menu-is-open', false);
      focusElement('.Layout__header__skiplink');
    }
  };

  useFormatMonitor(
    doInitialize
      ? (media) => {
          if (media.becameHamburger) {
            setMenuState((state) => ({ ...state, isMenuActive: true }));
            htmlClass('menu-is-active', true);
            htmlClass('menu-is-closed', true);
          }
          if (media.leftHamburger) {
            _closeMenu();
            setMenuState((state) => ({ ...state, isMenuActive: undefined }));
            htmlClass('menu-is-active', false);
            htmlClass('menu-is-closed', false);
          }
        }
      : noop
  );

  return {
    isMenuActive,
    isMenuOpen,
    toggleMenu: stateRef.current.toggleMenu,
    closeMenu: stateRef.current.closeMenu,
    uiState,
  };
};
