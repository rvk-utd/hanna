import React from 'react';
import { Alert } from '@reykjavik/hanna-react/Alert';
import { BreadCrumbs } from '@reykjavik/hanna-react/BreadCrumbs';
import { Layout } from '@reykjavik/hanna-react/Layout';
import { MainMenu } from '@reykjavik/hanna-react/MainMenu';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { ContactBubbleStory as ContactBubble } from '../Shared/ContactBubble.js';
import { FooterBadgesStory as FooterBadges } from '../Shared/FooterBadges.js';
import { FooterInfoStory as FooterInfo } from '../Shared/FooterInfo.js';
import { crumbTrail, mainMenuItems, megaMenuPanels } from '../utils/_dummyData.js';
import { StoryParameters } from '../utils/storytypes.js';

const meta: Meta<typeof Layout> = {
  title: 'Layout',
  component: Layout,
  parameters: {
    knobs: { disabled: false },
    layout: { disabled: true },
  } as StoryParameters,
};
export default meta;

type Story = StoryObj<typeof Layout>;

const MinimalLayoutComponent = () => {
  const globalAlerts = boolean('Global alerts container', false);
  const navChildren = boolean('Page has no menu or navigation', false) ? undefined : ' ';
  return (
    <Layout
      key={'' + globalAlerts + navChildren}
      globalAlerts={globalAlerts && ' '}
      navChildren={navChildren}
      ssr="ssr-only"
      mainChildren=""
    />
  );
};

export const _MinimalLayout: Story = {
  render: () => <MinimalLayoutComponent />,
  parameters: {
    css: {
      tokens: 'Layout',
    },
  },
};

const LayoutWithContentComponent = () => {
  const globalAlerts = boolean('Global alerts', false);

  return (
    <Layout
      key={'' + globalAlerts}
      globalAlerts={
        globalAlerts && (
          <>
            <Alert type="warning" closable>
              Some warning
            </Alert>
            <Alert type="critical" closable>
              Some critical alert
            </Alert>
          </>
        )
      }
      navChildren={
        <>
          <BreadCrumbs title="Þú ert hér" trail={crumbTrail.slice(0, 2)} />
          <MainMenu
            title={'Aðalvalmynd'}
            items={mainMenuItems}
            megaPanels={megaMenuPanels}
            // ssr="ssr-only"
          />
        </>
      }
      footerChildren={
        <>
          <FooterInfo />
          <FooterBadges />
          <ContactBubble />
        </>
      }
    >
      <p>...Main Content Components...</p>
    </Layout>
  );
};

// ===========================================================================

export const _LayoutWithContent: Story = {
  render: () => <LayoutWithContentComponent />,
  parameters: {
    css: {
      noLayout: true,
      tokens: 'Layout-full,FooterBadges,ContactBubble',
    },
  },
};
