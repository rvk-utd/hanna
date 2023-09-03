import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters } from '@storybook/react';
// import { jsxDecorator } from 'storybook-addon-jsx';
import { withHTML } from '@whitespace/storybook-addon-html/react';

import { addSimpleLayout } from '../src/utils/addSimpleLayout.js';
import { cssImportDecorator } from '../src/utils/cssImportDecorator.js';
import { viewports } from '../src/utils/viewports.js';

addDecorator(withKnobs);
addDecorator(withHTML);

addDecorator(addSimpleLayout);
addDecorator(cssImportDecorator);

addParameters({
  viewport: {
    viewports,
    defaultViewport: 'wide',
  },
  knobs: { disabled: true },
  // jsx: {}, // Ack. Bad typing
});
