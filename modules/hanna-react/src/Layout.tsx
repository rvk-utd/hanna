import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import type { HannaColorTheme } from '@reykjavik/hanna-css';
import { EitherObj } from '@reykjavik/hanna-utils';
import { DefaultTexts, getTexts, HannaLang } from '@reykjavik/hanna-utils/i18n';

import { issueSiteNameWarningInDev, renderLayoutHomeLink } from './_abstract/_Layouts.js';
import { Link } from './_abstract/_Link.js';
import { BemModifierProps } from './utils/types.js';
import { useMenuToggling } from './utils/useMenuToggling.js';
import {
  HannaUIState,
  SSRSupportProps,
  useScrollbarWidthCSSVar,
  WrapperElmProps,
} from './utils.js';

export type LayoutI18n = {
  skipLinkLabel: string;
  closeMenuLabel: string;
  closeMenuLabelLong?: string;
  /** @deprecated Not used (Will be removed in v0.11) */
  lang?: string;
};

export const defaultLayoutTexts: DefaultTexts<LayoutI18n> = {
  is: {
    skipLinkLabel: 'Valmynd',
    closeMenuLabel: 'Loka',
    closeMenuLabelLong: 'Loka valmynd',
  },
  en: {
    skipLinkLabel: 'Skip to navigation',
    closeMenuLabel: 'Close',
    closeMenuLabelLong: 'Close menu',
  },
  pl: {
    skipLinkLabel: 'Przejdź do nawigacji',
    closeMenuLabel: 'Zamknij',
    closeMenuLabelLong: 'Zamknij menu',
  },
};

// ---------------------------------------------------------------------------

type LayoutProps = {
  globalAlerts?: ReactNode;
  navChildren?: ReactNode;
  footerChildren?: ReactNode;
  colorTheme?: HannaColorTheme;
  logoLink?: string;
  siteName?: string;

  texts?: LayoutI18n;
  lang?: HannaLang;
} & SSRSupportProps &
  WrapperElmProps &
  BemModifierProps &
  EitherObj<{ mainChildren: ReactNode }, { children: ReactNode }>;

export const Layout = (props: LayoutProps) => {
  useScrollbarWidthCSSVar();
  const {
    ssr,
    globalAlerts,
    mainChildren,
    navChildren,
    footerChildren,
    colorTheme,
    children,
    siteName,
    logoLink = '/',
    wrapperProps,
  } = props;

  issueSiteNameWarningInDev(props);

  const { isMenuActive, uiState, closeMenu, toggleMenu } = useMenuToggling(
    ssr !== 'ssr-only'
  );

  const txt = getTexts(props, defaultLayoutTexts);

  return (
    <div
      {...wrapperProps}
      className={modifiedClass('Layout', props.modifier, (wrapperProps || {}).className)}
      data-color-theme={colorTheme}
    >
      {globalAlerts && (
        <div className="Layout__alerts" role="alert">
          {globalAlerts}
        </div>
      )}
      <div className="Layout__content">
        <div className="Layout__header" role="banner">
          {renderLayoutHomeLink('Layout', logoLink, siteName)}{' '}
          {/* {renderLegacyLayoutHomeLink('Layout', logoLink, siteName)}{' '} */}
          {navChildren && (
            <Link
              className="Layout__header__skiplink"
              href="#pagenav"
              onClick={
                isMenuActive &&
                ((e) => {
                  e.preventDefault();
                  toggleMenu();
                })
              }
              aria-label={txt.skipLinkLabel}
            >
              {txt.skipLinkLabel}
            </Link>
          )}
        </div>
        <div className="Layout__main" role="main">
          {mainChildren || children}
        </div>
        {navChildren && (
          <div className="Layout__nav" id="pagenav" role="navigation">
            <HannaUIState value={uiState}>{navChildren}</HannaUIState>
            {isMenuActive && (
              <button
                className="Layout__nav__closebutton"
                onClick={closeMenu}
                aria-label={txt.closeMenuLabelLong}
                type="button"
              >
                {txt.closeMenuLabel}
              </button>
            )}
          </div>
        )}
        <div className="Layout__footer" role="complementary">
          {footerChildren}
        </div>
      </div>
    </div>
  );
};

export default Layout;
