import React from 'react';
import { MainMenu } from '@reykjavik/hanna-react/MainMenu';
import { Meta, StoryObj } from '@storybook/react';

import { auxiliaryPanel, mainMenuItems, megaMenuPanels } from '../utils/_dummyData.js';
import { StoryParameters } from '../utils/storytypes.js';

type Story = StoryObj;

const meta: Meta = {
  title: 'Layout/MainMenu',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
export default meta;

export const _MainMenu: Story = {
  render: () => (
    <MainMenu
      items={mainMenuItems}
      megaPanels={megaMenuPanels}
      auxiliaryPanel={auxiliaryPanel}
    />
  ),
};

export const _MegaMenu: Story = {
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
    css: {
      tokens: 'MainMenu',
    },
  } as StoryParameters,
};
