// .storybook/manager.js
// https://storybook.js.org/docs/react/configure/features-and-behavior

import { addons, API } from '@storybook/manager-api';

addons.setConfig({
  toolbar: {
    zoom: { hidden: true },
  },
});
