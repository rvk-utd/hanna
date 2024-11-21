import React, { ReactElement } from 'react';
import { getCssBundleUrl, setStyleServerUrl } from '@reykjavik/hanna-css';
import type { StoryContext } from '@storybook/react';

if (
  typeof document !== 'undefined' &&
  document.location.hostname.endsWith('.test.thon.is')
) {
  setStyleServerUrl('https://styles.test.thon.is');
}

const makeCssUrl = (module: string | Array<string> | undefined, noLayout?: boolean) => {
  const layout = noLayout ? '' : 'Layout,';
  return getCssBundleUrl(`-basics,${layout}${module}`);
};

export const cssImportDecorator = (story: () => ReactElement, context: StoryContext) => {
  const css = context.parameters.css || {};
  const componentName = context.name;
  const cssTokens = css.tokens || componentName;
  const cssUrl = makeCssUrl(cssTokens, css.noLayout);
  return (
    <>
      <link rel="stylesheet" href={cssUrl} />
      <div id="story-root">{story()}</div>
    </>
  );
};
