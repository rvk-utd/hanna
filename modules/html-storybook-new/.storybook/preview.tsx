import React from 'react';
import type { Preview } from '@storybook/react';
import { decorators } from '../src/utils/decorators';

const preview: Preview = {
  decorators: decorators,
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
