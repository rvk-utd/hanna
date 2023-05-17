import React from 'react';
import { getCssBundleUrl } from '@reykjavik/hanna-css';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    (story, context) => {
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
    },
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
