import React from 'react';
import type { Preview } from '@storybook/react';
import { decorators } from '../src/utils/decorators';
import { viewports } from '../src/utils/viewports';

const preview: Preview = {
  decorators: decorators,
  parameters: {
    backgrounds: {
      disable: true,
      grid: {
        disable: true,
      },
    },
    viewport: { viewports: viewports, defaultViewport: 'wide' },
    actions: { argTypesRegex: '^on[A-Z].*' },
    html: {
      root: '#story-root',
      prettier: {
        tabWidth: 3,
        useTabs: false,
        printWidth: 75,
        htmlWhitespaceSensitivity: 'ignore',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
