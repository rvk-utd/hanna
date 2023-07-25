import { createContext, useContext } from 'react';

export type HannaUIStateState = {
  closeHamburgerMenu: () => void;
  isHamburgerMenuOpen: boolean | undefined;
};

const _HannaUIContext = createContext<HannaUIStateState>({
  closeHamburgerMenu: () => undefined,
  isHamburgerMenuOpen: undefined,
});

export const HannaUIState = _HannaUIContext.Provider;

export const useHannaUIState = () => useContext(_HannaUIContext);
