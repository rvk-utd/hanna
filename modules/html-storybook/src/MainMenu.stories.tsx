import React from 'react';
import { MainMenu } from '@reykjavik/hanna-react/MainMenu';

import { auxiliaryPanel, mainMenuItems, megaMenuPanels } from './utils/_dummyData.js';
import { StoryComponent, StoryParameters } from './storytypes.js';

export default {
  title: 'Layout/MainMenu',
  component: MainMenu,
  parameters: {
    layout: {
      head: true,
      pos: 'nav',
    },
    // viewport: {
    // 	defaultViewport: 'phone',
    // },
  } as StoryParameters,
};

export const _MainMenu: StoryComponent = () => {
  return (
    <MainMenu
      title="Aðalvalmynd"
      items={mainMenuItems}
      megaPanels={megaMenuPanels}
      auxiliaryPanel={auxiliaryPanel}
    />
  );
};

export const _MegaMenu: StoryComponent = () => {
  // useEffect(() => {
  // 	// setTimeout(() => {
  // 		const button = document.querySelector<HTMLElement>('button.MainMenu__link');
  // 		button && button.click();
  // 	// }, 100);
  // }, []);
  // useEffect(() => {
  // 	document.documentElement.dataset.megaPanelActive = '';
  // 	const primaryPanel = document.querySelector<HTMLElement>('.PrimaryPanel');
  // 	if (primaryPanel) {
  // 		primaryPanel.classList.add('PrimaryPanel--active');
  // 	}
  // }, []);
  return (
    <MainMenu
      // ssr="ssr-only"
      title="Aðalvalmynd"
      items={mainMenuItems}
      megaPanels={megaMenuPanels}
      activePanelId={megaMenuPanels[0]!.id}
      auxiliaryPanel={auxiliaryPanel}
    />
  );
};
