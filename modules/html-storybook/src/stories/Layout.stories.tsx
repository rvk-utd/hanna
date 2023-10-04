import React from 'react';
import { Alert } from '@reykjavik/hanna-react/Alert';
import { BreadCrumbs } from '@reykjavik/hanna-react/BreadCrumbs';
import { ContactBubble } from '@reykjavik/hanna-react/ContactBubble';
import { FooterBadges } from '@reykjavik/hanna-react/FooterBadges';
import { FooterInfo } from '@reykjavik/hanna-react/FooterInfo.js';
import { Layout } from '@reykjavik/hanna-react/Layout';
import { MainMenu } from '@reykjavik/hanna-react/MainMenu';
import { Meta, StoryObj } from '@storybook/react';

import { crumbTrail, mainMenuItems, megaMenuPanels } from '../utils/_dummyData.js';

import { contactBubbleData } from './shared/contactBubble.data.js';
import { footerBadgesData } from './shared/footerBadges.data.js';
import { footerInfoData } from './shared/footerInfo.data.js';

const meta: Meta = {
  title: 'Layout',
  parameters: {
    layout: { disabled: true },
  },
};
export default meta;

// ==================== Layout With Content ===========================================

type LayoutWithContentControlProps = {
  globalAlerts: boolean;
  siteName: boolean;
};

const LayoutWithContentStory = (props: LayoutWithContentControlProps) => {
  const key = '' + props.globalAlerts + props.siteName;
  return (
    <Layout
      key={key}
      siteName={props.siteName ? 'Website Name' : undefined}
      globalAlerts={
        props.globalAlerts && (
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
          <FooterInfo {...footerInfoData} />
          <FooterBadges {...footerBadgesData} />
          <ContactBubble {...contactBubbleData} alwaysShow />
        </>
      }
    >
      <p>...Main Content Components...</p>
    </Layout>
  );
};

export const _LayoutWithContent: StoryObj<LayoutWithContentControlProps> = {
  render: (args) => <LayoutWithContentStory {...args} />,
  argTypes: {
    globalAlerts: { name: 'Global alerts' },
    siteName: { name: 'Stand-alone website' },
  },
  args: {
    globalAlerts: false,
    siteName: false,
  },
  parameters: {
    css: {
      noLayout: true,
      tokens: 'Layout-full,FooterBadges,ContactBubble',
    },
  },
};

// ==================== Minimal Layout ===========================================

type MinimalLayoutControlProps = LayoutWithContentControlProps & {
  pageHasNoMenuOrNav: boolean;
};

const MinimalLayoutStory = (props: MinimalLayoutControlProps) => {
  const globalAlerts = props.globalAlerts;
  const navChildren = props.pageHasNoMenuOrNav ? undefined : ' ';
  const key = '' + globalAlerts + navChildren + props.siteName;
  return (
    <Layout
      key={key}
      siteName={props.siteName ? 'Website Name' : undefined}
      globalAlerts={globalAlerts && ' '}
      navChildren={navChildren}
      ssr="ssr-only"
      mainChildren=""
    />
  );
};

export const _MinimalLayout: StoryObj<MinimalLayoutControlProps> = {
  render: (args) => <MinimalLayoutStory {...args} />,
  argTypes: {
    ..._LayoutWithContent.argTypes,
    pageHasNoMenuOrNav: { name: 'Page has no menu or navigation' },
  },
  args: {
    ..._LayoutWithContent.args,
    pageHasNoMenuOrNav: false,
  },
  parameters: {
    css: { tokens: 'Layout' },
  },
};
