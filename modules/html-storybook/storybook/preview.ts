import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters } from '@storybook/react';
// import { jsxDecorator } from 'storybook-addon-jsx';
import { withHTML } from '@whitespace/storybook-addon-html/react';

import { addSimpleLayout } from '../src/utils/addSimpleLayout';
import { cssImportDecorator } from '../src/utils/cssImportDecorator';
import { viewports } from '../src/utils/viewports';

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
