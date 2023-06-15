// .storybook/manager.js
// https://storybook.js.org/docs/react/configure/features-and-behavior

import { addons } from '@storybook/manager-api';
import theme from './theme';

addons.setConfig({
  theme: theme,
  toolbar: {
    zoom: { hidden: true },
    fullscreen: { hidden: true },
    measure: { hidden: true },
    remount: { hidden: true },
    outline: { hidden: true },
  },
});
