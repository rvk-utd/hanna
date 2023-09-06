// .storybook/manager.js
// https://storybook.js.org/docs/react/configure/features-and-behavior

import { addons } from '@storybook/manager-api';
import theme from './theme';

addons.setConfig({
  theme: theme,
  enableShortcuts: false,
  selectedPanel: 'storybook/html/panel',
  toolbar: {
    zoom: { hidden: true },
    fullscreen: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    remount: { hidden: true },
  },
});
