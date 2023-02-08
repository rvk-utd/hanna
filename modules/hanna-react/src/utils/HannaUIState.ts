import { createContext, useContext } from 'react';

type HannaUIStateProps = {
  closeHamburgerMenu: () => void;
  isHamburgerMenuOpen: boolean | undefined;
};

const _HannaUIContext = createContext<HannaUIStateProps>({
  closeHamburgerMenu: () => undefined,
  isHamburgerMenuOpen: undefined,
});

export const HannaUIState = _HannaUIContext.Provider;

export const useHannaUIState = () => useContext(_HannaUIContext);
