import React from 'react';
import { MainMenu } from '@reykjavik/hanna-react/MainMenu';
import { Meta, StoryObj } from '@storybook/react';

import { auxiliaryPanel, mainMenuItems, megaMenuPanels } from '../utils/_dummyData.js';

const meta: Meta = {
  title: 'Layout/MainMenu',
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: {
      head: true,
      pos: 'nav',
    },
  },
};
export default meta;

export const _MainMenu: StoryObj = {
  render: () => (
    <MainMenu
      items={mainMenuItems}
      megaPanels={megaMenuPanels}
      auxiliaryPanel={auxiliaryPanel}
    />
  ),
};

export const _MegaMenu: StoryObj = {
  render: () => (
    <MainMenu
      // ssr="ssr-only"
      items={mainMenuItems}
      megaPanels={megaMenuPanels}
      activePanelId={megaMenuPanels[0]!.id}
      auxiliaryPanel={auxiliaryPanel}
    />
  ),
  parameters: {
    css: { tokens: 'MainMenu' },
  },
};
