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
      transform: (code) =>
        code
          .replace(/<hidden-tiger hidden(?:="true")?>(.*?)<\/hidden-tiger>/g, '$1')
          .replace(/<hidden-tiger>.*?<\/hidden-tiger>/g, ''),
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
