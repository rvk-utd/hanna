import React from 'react';
import { MainMenu } from '@reykjavik/hanna-react/MainMenu';
import { Meta, StoryObj } from '@storybook/react';

import { auxiliaryPanel, mainMenuItems, megaMenuPanels } from '../utils/_dummyData.js';

type Story = StoryObj;

const meta: Meta = {
  title: 'Layout/MainMenu',
};
export default meta;

// TODO: Maybe refactor to global usage
const hideControlsWarning = { controls: { hideNoControlsWarning: true } };

export const _MainMenu: Story = {
  render: () => (
    <MainMenu
      title="Aðalvalmynd"
      items={mainMenuItems}
      megaPanels={megaMenuPanels}
      auxiliaryPanel={auxiliaryPanel}
    />
  ),
  parameters: {
    ...hideControlsWarning,
  },
};

export const _MegaMenu: Story = {
  render: () => (
    <MainMenu
      // ssr="ssr-only"
      title="Aðalvalmynd"
      items={mainMenuItems}
      megaPanels={megaMenuPanels}
      activePanelId={megaMenuPanels[0]!.id}
      auxiliaryPanel={auxiliaryPanel}
    />
  ),
  parameters: {
    ...hideControlsWarning,
    css: {
      tokens: 'MainMenu',
    },
  },
};
