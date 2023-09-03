import { HannaColorTheme } from '@reykjavik/hanna-css';

import { ViewportNames } from './viewports.js';

declare module '@storybook/react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Parameters {
    viewport?: {
      disabled?: boolean;
      defaultViewport: ViewportNames | 'responsive';
    };
    layout?: {
      disabled?: boolean;
      theme?: HannaColorTheme;
      modifier?: string;
      head?: boolean;
      pos?: 'nav' | 'footer' | 'main';
    };
    css?: {
      tokens?: string;
      noLayout?: boolean;
      onLoad?: () => void;
    };
    controls?: {
      hideNoControlsWarning?: boolean;
    };
  }
}
