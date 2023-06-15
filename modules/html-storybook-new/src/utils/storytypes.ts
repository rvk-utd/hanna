import { FC } from 'react';
import { HannaColorTheme } from '@reykjavik/hanna-css';

import { ViewportOptions } from './viewports.js';

export type StoryParameters = {
  knobs?: {
    disabled?: boolean;
    theming?: boolean;
  };
  viewport?: {
    disabled?: boolean;
    defaultViewport: ViewportOptions;
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
    disabled?: boolean;
  };
};

export type StoryComponent = FC & {
  story?: {
    name?: string;
    parameters?: StoryParameters;
  };
};
