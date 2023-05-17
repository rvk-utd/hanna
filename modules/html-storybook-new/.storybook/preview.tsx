import React from 'react';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    (Story) => {
      return (
        <>
          <link
            rel="stylesheet"
            href="https://styles.reykjavik.is/bundle/v0.8?m=-basics,Layout,Tooltip"
          />
          {Story()}
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
