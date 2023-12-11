import React from 'react';
import { MainMenu } from '@reykjavik/hanna-react/MainMenu';
import { Meta, StoryObj } from '@storybook/react';

import {
  auxiliaryPanel,
  mainMenuItems,
  mainMenuItemsSimple,
  megaMenuPanels,
} from '../utils/_dummyData.js';

type ControlProps = {
  ssr: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'Layout/MainMenu',
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: {
      head: true,
      pos: 'nav',
    },
  },
  argTypes: {
    ssr: { name: 'Server-side Markup' },
  },
  args: {
    ssr: false,
  },
};
export default meta;

export const _MainMenu: StoryObj<ControlProps & { megaPanels: boolean }> = {
  render: (args) => (
    <MainMenu
      key={`${args.ssr}-${args.megaPanels}`}
      ssr={args.ssr ? 'ssr-only' : true}
      {...(args.megaPanels
        ? {
            items: mainMenuItems,
            megaPanels: megaMenuPanels,
            auxiliaryPanel: auxiliaryPanel,
          }
        : { items: mainMenuItemsSimple })}
    />
  ),
  argTypes: {
    megaPanels: { name: 'Mega Panels' },
  },
  args: {
    megaPanels: false,
  },
};

export const _MegaMenu: StoryObj<ControlProps> = {
  render: (args) => (
    <MainMenu
      key={`${args.ssr}-`}
      ssr={args.ssr ? 'ssr-only' : true}
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
