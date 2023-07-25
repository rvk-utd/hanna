import React, { ReactNode } from 'react';
import type { HannaColorTheme } from '@reykjavik/hanna-css';
import { getAssetUrl } from '@reykjavik/hanna-utils/assets';

import { Image } from './_abstract/_Image.js';
import { Link } from './_abstract/_Link.js';
import { useScrollbarWidthCSSVar } from './utils/useScrollbarWidthCSSVar.js';
import { SSRSupportProps, useIsBrowserSide } from './utils.js';

type WizardLayoutProps = {
  wizardStepper?: ReactNode | false;
  wizardFooter?: ReactNode | false;
  colorTheme?: HannaColorTheme;
  siteName?: string;
  logoLink?: string;
  globalAlerts?: ReactNode;
  children?: ReactNode;
} & SSRSupportProps;

export const WizardLayout = (props: WizardLayoutProps) => {
  useScrollbarWidthCSSVar();
  const {
    // ssr,
    wizardStepper,
    wizardFooter,
    children,
    colorTheme,
    logoLink = '/',
    siteName = '',
    globalAlerts,
  } = props;

  const isBrowser = useIsBrowserSide(/* ssr */);

  return (
    <div
      className="WizardLayout"
      data-sprinkled={isBrowser}
      data-color-theme={colorTheme}
    >
      {globalAlerts && (
        <div className="WizardLayout__alerts" role="alert">
          {globalAlerts}
        </div>
      )}
      <div className="WizardLayout__content">
        <div className="WizardLayout__header" role="banner">
          <Link className="WizardLayout__header__logo" href={logoLink}>
            {' '}
            <Image
              className={undefined}
              inline={true}
              src={getAssetUrl('reykjavik-logo.svg')}
              altText="Reykjavík"
            />{' '}
            {siteName}{' '}
          </Link>{' '}
        </div>
        <div className="WizardLayout__wrap">
          {wizardStepper && (
            <div className="WizardLayout__stepper" role="navigation">
              {wizardStepper}
            </div>
          )}
          <div className="WizardLayout__main" role="main">
            {children}
          </div>
          <div className="WizardLayout__deco WizardLayout__deco--geometry" />
        </div>
        <div className="WizardLayout__footer" role="complementary">
          {wizardFooter}
        </div>
      </div>
    </div>
  );
};

export default WizardLayout;
