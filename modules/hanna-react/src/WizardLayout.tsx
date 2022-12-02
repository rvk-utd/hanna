import React, { ReactNode } from 'react';
import { SSRSupport, useIsBrowserSide } from '@hugsmidjan/react/hooks';
import { HannaColorTheme } from '@reykjavik/hanna-css';
import { getAssetUrl } from '@reykjavik/hanna-utils/assets';

import { Image } from './_abstract/_Image';
import { Link } from './_abstract/_Link';
import { useScrollbarWidthCSSVar } from './utils/useScrollbarWidthCSSVar';

type WizardLayoutProps = {
  wizardStepper?: ReactNode | false;
  wizardFooter?: ReactNode | false;
  colorTheme?: HannaColorTheme;
  siteName?: string;
  logoLink?: string;
  globalAlerts?: ReactNode;
  ssr?: SSRSupport;
  children?: ReactNode;
};

export const WizardLayout = (props: WizardLayoutProps) => {
  useScrollbarWidthCSSVar();
  const {
    // ssr,
    wizardStepper,
    wizardFooter,
    children,
    colorTheme,
    logoLink = '/',
    siteName = 'Reykjavík',
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
