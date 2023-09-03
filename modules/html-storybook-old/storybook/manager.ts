import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'Reykjavík Design System',
});

const config: Record<string, any> = {
  theme: theme,
};

addons.setConfig(config);
