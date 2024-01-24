import React, { ReactNode } from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import type { HannaColorTheme } from '@reykjavik/hanna-css';
import { HannaLang } from '@reykjavik/hanna-utils/i18n';

import { BemModifierProps } from './utils/types.js';
import { useScrollbarWidthCSSVar, WrapperElmProps } from './utils.js';

export type IframedLayoutProps = {
  children: ReactNode;
  colorTheme?: HannaColorTheme;
  lang?: HannaLang;
} & WrapperElmProps<'div', 'data-color-theme'> &
  BemModifierProps;

export const IframedLayout = (props: IframedLayoutProps) => {
  useScrollbarWidthCSSVar();
  const { colorTheme, children, wrapperProps } = props;

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'IframedLayout',
        props.modifier,
        (wrapperProps || {}).className
      )}
      data-color-theme={colorTheme}
    >
      {children}
    </div>
  );
};
