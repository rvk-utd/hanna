import React from 'react';
import { getCssBundleUrl } from '@reykjavik/hanna-css';
import type { StoryContext } from '@storybook/react';

export const cssImportDecorator = (
  story: () => React.ReactNode,
  context: StoryContext
) => {
  console.log('story: ', story);
  console.log('context: ', context);
  const componentName = context.name;
  const cssTokens = `-basics,Layout,${componentName}`;
  const cssUrl = getCssBundleUrl(cssTokens);
  console.log('cssUrl: ', cssUrl);
  return (
    <>
      <link rel="stylesheet" href={cssUrl} />
      {story()}
    </>
  );
};
