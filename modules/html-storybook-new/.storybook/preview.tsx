import type { Preview } from '@storybook/react';

import { cssImportDecorator } from '../src/utils/cssImportDecorator.js';
import { layoutDecorator } from '../src/utils/layoutDecorator.js';
import { viewports } from '../src/utils/viewports.js';

const preview: Preview = {
  decorators: [cssImportDecorator, layoutDecorator],
  parameters: {
    backgrounds: {
      disable: true,
      grid: {
        disable: true,
      },
    },
    viewport: {
      viewports: viewports,
      defaultViewport: 'wide',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    html: {
      root: '#story-root',
      prettier: {
        tabWidth: 2,
        useTabs: false,
        printWidth: 80,
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
