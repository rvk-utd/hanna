import React, { ReactNode } from 'react';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import {
  MobileMenuStateProvider,
  useMobileMenuToggling,
} from './MobileMenuToggler/_useMobileMenuToggling.js';
import { I18NProps } from './utils/types.js';
import { SSRSupportProps } from './utils.js';

export type MobileMenuTogglerI18n = {
  togglerLabel: string;
  closeMenuLabel: string;
  closeMenuLabelLong?: string;
};

export const defaultMobileMenuTogglerTexts: DefaultTexts<MobileMenuTogglerI18n> = {
  is: {
    togglerLabel: 'Opna/loka Aðalvalmynd',
    closeMenuLabel: 'Loka',
    closeMenuLabelLong: 'Loka aðalvalmynd',
  },
  en: {
    togglerLabel: 'Toggle Main Menu',
    closeMenuLabel: 'Close',
    closeMenuLabelLong: 'Close main menu',
  },
  pl: {
    togglerLabel: 'Otwórz/zamknij menu główne',
    closeMenuLabel: 'Zamknij',
    closeMenuLabelLong: 'Zamknij menu główne',
  },
};

// ---------------------------------------------------------------------------

export type MobileMenuTogglerProps = {
  /** The DOM id of the menu that is being toggled */
  controlsId: string;
  children: NonNullable<ReactNode>;
} & I18NProps<MobileMenuTogglerI18n> &
  SSRSupportProps;

/**
 * A wrapper component that handles conditional hiding/toggling
 * behavior, similar to the one `MainMenu` uses.
 */
export const MobileMenuToggler = (props: MobileMenuTogglerProps) => {
  const { isMenuActive, isMenuOpen, uiState, closeMenu, toggleMenu } =
    useMobileMenuToggling({
      doInitialize: props.ssr !== 'ssr-only',
    });
  const txt = getTexts(props, defaultMobileMenuTogglerTexts);

  // const isBrowser = useIsBrowserSide()
  return (
    <>
      {isMenuActive && (
        <button
          className="MobileMenuToggler"
          onClick={toggleMenu}
          aria-controls={props.controlsId}
          aria-pressed={isMenuOpen}
        >
          {txt.togglerLabel}
        </button>
      )}
      <MobileMenuStateProvider value={uiState}>{props.children}</MobileMenuStateProvider>
      {isMenuActive && (
        <button
          className="MobileMenuToggler__closebutton"
          onClick={closeMenu}
          aria-label={txt.closeMenuLabelLong}
          type="button"
        >
          {txt.closeMenuLabel}
        </button>
      )}
    </>
  );
};

// ---------------------------------------------------------------------------

export {
  type MobileMenuTogglerState,
  useMobileMenuTogglerState,
} from './MobileMenuToggler/_useMobileMenuToggling.js';
