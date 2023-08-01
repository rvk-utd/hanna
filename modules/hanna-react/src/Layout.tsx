import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import type { HannaColorTheme } from '@reykjavik/hanna-css';
import { EitherObj } from '@reykjavik/hanna-utils';
import { getAssetUrl } from '@reykjavik/hanna-utils/assets';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import { Image } from './_abstract/_Image.js';
import { Link } from './_abstract/_Link.js';
import { BemModifierProps } from './utils/types.js';
import {
  HannaUIState,
  SSRSupportProps,
  useMenuToggling,
  useScrollbarWidthCSSVar,
} from './utils.js';

export type LayoutI18n = {
  lang?: string;
  skipLinkLabel: string;
  closeMenuLabel: string;
  closeMenuLabelLong?: string;
};

export const defaultLayoutTexts: DefaultTexts<LayoutI18n> = {
  is: {
    lang: 'is',
    skipLinkLabel: 'Valmynd',
    closeMenuLabel: 'Loka',
    closeMenuLabelLong: 'Loka valmynd',
  },
  en: {
    lang: 'en',
    skipLinkLabel: 'Skip to navigation',
    closeMenuLabel: 'Close',
    closeMenuLabelLong: 'Close menu',
  },
  pl: {
    lang: 'pl',
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
  lang?: string;
} & SSRSupportProps &
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
    siteName = '',
    logoLink = '/',
  } = props;

  const { isMenuActive, uiState, closeMenu, toggleMenu } = useMenuToggling(
    ssr !== 'ssr-only'
  );

  const txt = getTexts(props, defaultLayoutTexts);

  return (
    <div
      className={modifiedClass('Layout', props.modifier)}
      data-color-theme={colorTheme}
    >
      {globalAlerts && (
        <div className="Layout__alerts" role="alert">
          {globalAlerts}
        </div>
      )}
      <div className="Layout__content">
        <div className="Layout__header" role="banner">
          <Link className="Layout__header__logo" href={logoLink}>
            {' '}
            <Image
              className={undefined}
              inline={true}
              src={getAssetUrl('reykjavik-logo.svg')}
              altText="Reykjavík"
            />{' '}
            {siteName}{' '}
          </Link>{' '}
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
