import React, { ReactElement } from 'react';
import { getCssBundleUrl } from '@reykjavik/hanna-css';
import type { StoryContext } from '@storybook/react';

import { StoryParameters } from './storytypes.js';

const makeCssUrl = (module: string | undefined, noLayout?: boolean) => {
  const layout = noLayout ? '' : 'Layout,';
  return getCssBundleUrl('-basics,' + layout + module);
};

export const cssImportDecorator = (story: () => ReactElement, context: StoryContext) => {
  const css = (context.parameters as StoryParameters).css || {};
  const componentName = context.name;
  const cssTokens = css.tokens || componentName;
  const cssUrl = makeCssUrl(cssTokens, css.noLayout);
  return (
    <>
      <link rel="stylesheet" href={cssUrl} />
      {story()}
    </>
  );
};
