import React from 'react';
import type { Preview } from '@storybook/react';
import { decorators } from '../src/utils/decorators';
import { customViewports } from '../src/utils/customViewPorts';

const preview: Preview = {
  decorators: decorators,
  parameters: {
    backgrounds: {
      disable: true,
      grid: {
        disable: true,
      },
    },
    viewport: { viewports: customViewports, defaultViewport: 'wide' },
    actions: { argTypesRegex: '^on[A-Z].*' },
    html: {
      root: '#story-root',
      prettier: {
        tabWidth: 4,
        useTabs: false,
        printWidth: 140,
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
