import React, { ReactNode } from 'react';
import type { HannaColorTheme } from '@reykjavik/hanna-css';
import { EitherObj, modifiedClass } from '@reykjavik/hanna-utils';
import { DefaultTexts, getTexts, HannaLang } from '@reykjavik/hanna-utils/i18n';

import { issueSiteNameWarningInDev, renderLayoutHomeLink } from './_abstract/_Layouts.js';
import { handleAnchorLinkClick } from './utils/a11yHelpers.js';
import { BemModifierProps } from './utils/types.js';
import { SSRSupport, useScrollbarWidthCSSVar, WrapperElmProps } from './utils.js';

export type LayoutI18n = {
  skipLinkLabel: string;

  /** @deprecated Not used (Will be removed in v0.11) */
  closeMenuLabel?: string;
  /** @deprecated Not used (Will be removed in v0.11) */
  closeMenuLabelLong?: string;
  /** @deprecated Not used (Will be removed in v0.11) */
  lang?: string;
};

export const defaultLayoutTexts: DefaultTexts<LayoutI18n> = {
  is: { skipLinkLabel: 'Fara í leiðakerfi' },
  en: { skipLinkLabel: 'Skip to navigation' },
  pl: { skipLinkLabel: 'Przejdź do nawigacji' },
};

// ---------------------------------------------------------------------------

export type LayoutProps = {
  globalAlerts?: ReactNode;
  navChildren?: ReactNode;
  footerChildren?: ReactNode;
  colorTheme?: HannaColorTheme;
  logoLink?: string;
  siteName?: string;

  texts?: LayoutI18n;
  lang?: HannaLang;

  /** @deprecated Not used (Will be removed in v0.11) */
  ssr?: SSRSupport;
} & WrapperElmProps<'div', 'data-color-theme'> &
  BemModifierProps &
  EitherObj<{ mainChildren: ReactNode }, { children: ReactNode }>;

export const Layout = (props: LayoutProps) => {
  useScrollbarWidthCSSVar();
  const {
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
            <a
              className="Layout__header__navlink"
              href="#pagenav"
              onClick={(e) => handleAnchorLinkClick(e, true)}
              aria-label={txt.skipLinkLabel}
            >
              {txt.skipLinkLabel}
            </a>
          )}
        </div>
        <div className="Layout__main" role="main">
          {mainChildren || children}
        </div>
        {navChildren && (
          <div className="Layout__nav" id="pagenav" tabIndex={-1} role="navigation">
            {navChildren}
          </div>
        )}
        {footerChildren && (
          <div className="Layout__footer" role="complementary">
            {footerChildren}
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
