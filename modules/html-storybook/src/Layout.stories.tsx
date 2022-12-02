import React from 'react';
import { Alert } from '@reykjavik/hanna-react/Alert';
import { BreadCrumbs } from '@reykjavik/hanna-react/BreadCrumbs';
import { Layout } from '@reykjavik/hanna-react/Layout';
import { MainMenu } from '@reykjavik/hanna-react/MainMenu';
import { boolean } from '@storybook/addon-knobs';

import { crumbTrail, mainMenuItems, megaMenuPanels } from './utils/_dummyData';
import { _ContactBubble as ContactBubble } from './ContactBubble.stories';
import { _FooterBadges as FooterBadges } from './FooterBadges.stories';
import { FooterInfo } from './FooterInfo.stories';
import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'Layout',
  component: Layout,
  parameters: {
    knobs: { disabled: false },
    layout: { disabled: true },
  } as StoryParameters,
};

// ===========================================================================

export const MinimalLayout: StoryComponent = () => {
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

// ===========================================================================

export const LayoutWithContent: StoryComponent = () => {
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

LayoutWithContent.story = {
  parameters: {
    css: {
      noLayout: true,
      tokens: 'Layout-full,FooterBadges,ContactBubble',
    },
  },
};
