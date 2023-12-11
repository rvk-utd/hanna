import { createContext, useContext, useRef, useState } from 'react';
import { focusElement } from '@reykjavik/hanna-utils';

import { useFormatMonitor } from '../utils/useFormatMonitor.js';

const htmlClass = (className: string, add: boolean) => {
  document.documentElement.classList[add ? 'add' : 'remove'](className);
};

const noop = () => undefined;

const HamburgerMedias: Record<string, 1> = { phone: 1, phablet: 1, tablet: 1 };
// const TopmenuMedias: Record<string, 1> = { netbook: 1, wide: 1 };

// ---------------------------------------------------------------------------

type MenuTogglingState = {
  isMenuActive: true | undefined;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  uiState: MobileMenuTogglerState;
};

// ---------------------------------------------------------------------------

type Opts = {
  doInitialize?: boolean;
  togglerElm?: string | HTMLElement;
};

export const useMobileMenuToggling = (opts?: boolean | Opts): MenuTogglingState => {
  const { doInitialize, togglerElm = '.MainMenuToggler' } =
    typeof opts === 'boolean'
      ? ({ doInitialize: opts } satisfies Opts)
      : !opts
      ? ({ doInitialize: true } satisfies Opts)
      : opts;

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
    closeMenu: doInitialize ? () => _closeMenu() : noop,
  });

  const [{ isMenuOpen, isMenuActive, uiState }, setMenuState] = useState(
    (): {
      isMenuOpen: boolean;
      isMenuActive: true | undefined;
      uiState: MobileMenuTogglerState;
    } => ({
      isMenuOpen: false,
      isMenuActive: undefined,
      uiState: {
        closeHamburgerMenu: () => stateRef.current.closeMenu(),
        isHamburgerMenuOpen: false,
        isHamburgerMenuActive: false,
      },
    })
  );

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
      const toggler =
        typeof togglerElm === 'string' ? document.querySelector(togglerElm) : togglerElm;
      const menuElmId = toggler?.getAttribute('aria-controls');
      if (menuElmId) {
        focusElement(`#${menuElmId}`);
      }
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
      focusElement(togglerElm);
    }
  };

  useFormatMonitor(
    doInitialize
      ? (media) => {
          const becameHamburger =
            HamburgerMedias[media.is] && !HamburgerMedias[media.was || ''];
          const leftHamburger =
            !HamburgerMedias[media.is] && HamburgerMedias[media.was || ''];
          if (becameHamburger) {
            setMenuState((state) => ({
              ...state,
              isMenuActive: true,
              uiState: { ...state.uiState, isHamburgerMenuActive: true },
            }));
            htmlClass('menu-is-active', true);
            htmlClass('menu-is-closed', true);
          } else if (leftHamburger) {
            _closeMenu();
            setMenuState((state) => ({
              ...state,
              isMenuActive: undefined,
              uiState: { ...state.uiState, isHamburgerMenuActive: false },
            }));
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

// ===========================================================================

export type MobileMenuTogglerState = {
  closeHamburgerMenu: () => void;
  isHamburgerMenuOpen: boolean | undefined;
  isHamburgerMenuActive: boolean | undefined;
};

const _MobileMenuTogglerContext = createContext<MobileMenuTogglerState>({
  closeHamburgerMenu: () => undefined,
  isHamburgerMenuOpen: undefined,
  isHamburgerMenuActive: undefined,
});

export const MobileMenuStateProvider = _MobileMenuTogglerContext.Provider;

export const useMobileMenuTogglerState = () => useContext(_MobileMenuTogglerContext);
