import cssImportDecorator from '../src/utils/cssImportDecorator';
import addSimpleLayout from '../src/utils/addSimpleLayout';

import { addDecorator, addParameters } from '@storybook/react';

import { withKnobs } from '@storybook/addon-knobs';
import { withHTML } from '@whitespace/storybook-addon-html/react';
// import { jsxDecorator } from 'storybook-addon-jsx';

import viewports from '../src/utils/viewports';

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
