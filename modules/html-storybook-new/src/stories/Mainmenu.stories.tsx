import React from 'react';
import { MainMenu } from '@reykjavik/hanna-react/MainMenu';
import { Meta, StoryObj } from '@storybook/react';

import { auxiliaryPanel, mainMenuItems, megaMenuPanels } from '../utils/_dummyData.js';

const meta: Meta<typeof MainMenu> = {
  title: 'components/Layout/MainMenu',
  component: MainMenu,
};
export default meta;

type Story = StoryObj<typeof MainMenu>;

export const _MainMenu: Story = {
  render: () => (
    <MainMenu
      title="Aðalvalmynd"
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
      title="Aðalvalmynd"
      items={mainMenuItems}
      megaPanels={megaMenuPanels}
      activePanelId={megaMenuPanels[0]!.id}
      auxiliaryPanel={auxiliaryPanel}
    />
  ),
};
