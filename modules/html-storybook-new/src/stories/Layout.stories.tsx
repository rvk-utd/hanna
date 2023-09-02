import React from 'react';
import { Alert } from '@reykjavik/hanna-react/Alert';
import { BreadCrumbs } from '@reykjavik/hanna-react/BreadCrumbs';
import { Layout } from '@reykjavik/hanna-react/Layout';
import { MainMenu } from '@reykjavik/hanna-react/MainMenu';
import { Meta, StoryObj } from '@storybook/react';

import { crumbTrail, mainMenuItems, megaMenuPanels } from '../utils/_dummyData.js';
import { StoryParameters } from '../utils/storytypes.js';

import { ContactBubbleStory as ContactBubble } from './Shared/ContactBubble.js';
import { FooterBadgesStory as FooterBadges } from './Shared/FooterBadges.js';
import { FooterInfoStory as FooterInfo } from './Shared/FooterInfo.js';

// ==================== Minimal Layout ===========================================

type MinimalLayoutControlProps = {
  globalAlertsContainer: boolean;
  pageHasNoMenuOrNav: boolean;
};

type MinimalLayoutStory = StoryObj<MinimalLayoutControlProps>;

const meta: Meta = {
  title: 'Layout',
  parameters: {
    knobs: { disabled: false },
    layout: { disabled: true },
  } as StoryParameters,
};
export default meta;

const MinimalLayoutStory: React.FC<MinimalLayoutControlProps> = ({
  globalAlertsContainer,
  pageHasNoMenuOrNav,
}) => {
  const globalAlerts = globalAlertsContainer;
  const navChildren = pageHasNoMenuOrNav ? undefined : ' ';
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

export const _MinimalLayout: MinimalLayoutStory = {
  render: (args: MinimalLayoutControlProps) => <MinimalLayoutStory {...args} />,
  argTypes: {
    globalAlertsContainer: {
      control: 'boolean',
      name: 'Global alerts container',
    },
    pageHasNoMenuOrNav: {
      control: 'boolean',
      name: 'Page has no menu or navigation',
    },
  },
  args: {
    globalAlertsContainer: false,
    pageHasNoMenuOrNav: false,
  },
  parameters: {
    css: {
      tokens: 'Layout',
    },
  },
};

// ==================== Layout With Content ===========================================

type LayoutWithContentControlProps = {
  globalAlerts: boolean;
  showClientsideMarkup: boolean;
  setOptionalDataAttr: boolean;
};

type LayoutWithContStory = StoryObj<LayoutWithContentControlProps>;

const LayoutWithContentStory: React.FC<LayoutWithContentControlProps> = ({
  globalAlerts,
  setOptionalDataAttr,
  showClientsideMarkup,
}) => {
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
          <BreadCrumbs trail={crumbTrail.slice(0, 2)} />
          <MainMenu
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
          <ContactBubble ssr={!showClientsideMarkup} alwaysShow={setOptionalDataAttr} />
        </>
      }
    >
      <p>...Main Content Components...</p>
    </Layout>
  );
};

export const _LayoutWithContent: LayoutWithContStory = {
  render: (args: LayoutWithContentControlProps) => <LayoutWithContentStory {...args} />,
  argTypes: {
    globalAlerts: {
      control: 'boolean',
      name: 'Global alerts',
    },
    showClientsideMarkup: {
      control: 'boolean',
      name: 'Show client-side markup',
    },
    setOptionalDataAttr: {
      control: 'boolean',
      name: 'Set optional "alwaysShow" data-attribute',
    },
  },
  args: {
    globalAlerts: false,
    showClientsideMarkup: false,
    setOptionalDataAttr: true,
  },
  parameters: {
    css: {
      noLayout: true,
      tokens: 'Layout-full,FooterBadges,ContactBubble',
    },
  },
};
