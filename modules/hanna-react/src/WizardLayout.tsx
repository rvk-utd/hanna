import React, { ReactNode } from 'react';
import type { HannaColorTheme } from '@reykjavik/hanna-css';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { renderLayoutHomeLink } from './_abstract/_Layouts.js';
import { useScrollbarWidthCSSVar } from './utils/useScrollbarWidthCSSVar.js';
import { SSRSupportProps, useIsBrowserSide, WrapperElmProps } from './utils.js';

type WizardLayoutProps = {
  wizardStepper?: ReactNode | false;
  wizardFooter?: ReactNode | false;
  colorTheme?: HannaColorTheme;
  siteName?: string;
  logoLink?: string;
  globalAlerts?: ReactNode;
  children?: ReactNode;
} & SSRSupportProps &
  WrapperElmProps;

export const WizardLayout = (props: WizardLayoutProps) => {
  useScrollbarWidthCSSVar();
  const {
    // ssr,
    wizardStepper,
    wizardFooter,
    children,
    colorTheme,
    logoLink = '/',
    siteName,
    globalAlerts,
    wrapperProps,
  } = props;

  const isBrowser = useIsBrowserSide(/* ssr */);

  return (
    <div
      {...wrapperProps}
      className={modifiedClass('WizardLayout', null, (wrapperProps || {}).className)}
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
          {renderLayoutHomeLink('WizardLayout', logoLink, siteName)}{' '}
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
