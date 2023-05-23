import React from 'react';
import { getCssBundleUrl } from '@reykjavik/hanna-css';
import type { StoryContext } from '@storybook/react';

export const cssImportDecorator = (
  story: () => React.ReactNode,
  context: StoryContext
) => {
  const componentName = context.name;
  const cssTokens = `-basics,Layout,${componentName}`;
  const cssUrl = getCssBundleUrl(cssTokens);
  return (
    <>
      <link rel="stylesheet" href={cssUrl} />
      {story()}
    </>
  );
};
