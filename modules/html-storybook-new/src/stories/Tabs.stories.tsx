import React, { Fragment, useEffect, useState } from 'react';
import { getFrag } from '@hugsmidjan/qj/frag';
import { TabItemProps, Tabs } from '@reykjavik/hanna-react/Tabs';
import { SSRSupport, useIsBrowserSide } from '@reykjavik/hanna-react/utils';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';

// =========================== Tabs ==========================================

const htmlElementOptions = ['button', 'link'] as const;
type HtmlElement = (typeof htmlElementOptions)[number];

type TabsControlProps = {
  htmlElement: HtmlElement;
  verticalLayout: boolean;
  badges: boolean;
  subTabs: boolean;
  showControlledDivExample: boolean;
};

type Story = StoryObj<TabsControlProps>;

const meta: Meta<TabsControlProps> = {
  title: 'Tabs',
};
export default meta;

const buttonTabs: Array<TabItemProps> = [1, 2, 3, 4].map((num) => ({
  label: 'Tab ' + num + (num === 2 ? ' has very, very longwinded label' : ''),
  longLabel: num === 4 ? 'Tab ' + num + ' has longer label' : undefined,
  badge: [14, 2, undefined, '1.024'][num - 1],
}));
const linkTabs: Array<TabItemProps & { href: string }> = buttonTabs.map((tab, i) => ({
  ...tab,
  href: '#tab-' + (i + 1),
}));

const TabsStory: React.FC<TabsControlProps> = ({
  htmlElement,
  verticalLayout,
  badges,
  subTabs,
  showControlledDivExample,
}) => {
  const useButtons = htmlElement === 'button';
  const showExample = (useButtons && showControlledDivExample) || undefined;
  const vertical = verticalLayout;

  const _tabs = useButtons ? buttonTabs : linkTabs;
  const tabs = badges ? _tabs : _tabs.map((tab) => ({ ...tab, badge: undefined }));

  const _subTabs = subTabs
    ? {
        tabs: tabs.map((tab) => ({
          ...tab,
          label: 'Sub-' + tab.label.toLowerCase(),
          longLabel: tab.longLabel ? 'Sub-' + tab.longLabel.toLowerCase() : undefined,
        })),
        activeIdx: 0,
        'aria-label': 'Sub tab label',
        'aria-controls': showExample && 'tab-target',
      }
    : undefined;

  return (
    <Fragment key={'' + useButtons + showExample + vertical + badges + !!_subTabs}>
      <Tabs
        role="tablist"
        activeIdx={1}
        tabs={tabs}
        aria-label="Optional label text"
        aria-controls={showExample && 'tab-target'}
        startSeen
        vertical={vertical}
        subTabs={_subTabs}
      />

      {showExample && (
        <>
          {'\n\n'}
          <div id="tab-target">
            {'\n\n'}Insert content here!{'\n\n'}
          </div>
        </>
      )}
    </Fragment>
  );
};

export const _Tabs: Story = {
  render: (args: TabsControlProps) => <TabsStory {...args} />,
  argTypes: {
    htmlElement: {
      control: {
        type: 'inline-radio',
        labels: {
          button: '<button/>',
          link: '<a href="" />',
        },
      },
      options: htmlElementOptions,
      name: 'HTML Element',
    },
    verticalLayout: {
      control: 'boolean',
      name: 'Vertical layout',
    },
    badges: {
      control: 'boolean',
      name: 'Badges',
    },
    subTabs: {
      control: 'boolean',
      name: 'Sub-tabs',
    },
    showControlledDivExample: {
      control: 'boolean',
      name: 'Show contolled <div/> example',
      if: { arg: 'htmlElement', eq: 'button' },
    },
  },
  args: {
    htmlElement: 'link',
    verticalLayout: false,
    badges: false,
    subTabs: false,
    showControlledDivExample: false,
  },
};

// =========================== Tabs Anchors ==========================================

type TabsAnchorsControlProps = {
  showServerSideHtml: boolean;
  firstTabStartsActive: boolean;
};
type TabsAnchorsStory = StoryObj<TabsAnchorsControlProps>;

type _TabPanelsProps = {
  tabs: typeof linkTabs;
  activeIdx?: number;
  ssr: SSRSupport;
};

const _TabPanels = (props: _TabPanelsProps) => {
  const { tabs, activeIdx, ssr } = props;
  const isBrowser = useIsBrowserSide(ssr);

  return (
    <>
      {tabs.map((tab, index) => {
        const isActive = isBrowser && activeIdx === index;
        return (
          <Fragment key={index}>
            {'\n\n'}
            <div
              className="TabPanel"
              id={getFrag(tab.href)}
              role="tabpanel"
              aria-label={tab.longLabel || tab.label}
              tabIndex={isActive ? 0 : undefined}
              data-sprinkled={isBrowser}
              hidden={isBrowser && !isActive}
            >
              <p>
                <strong>{tab.longLabel || tab.label}</strong>
              </p>
              …
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

const TabsAnchorsStory: React.FC<TabsAnchorsControlProps> = ({
  firstTabStartsActive,
  showServerSideHtml,
}) => {
  const ssr = showServerSideHtml ? 'ssr-only' : false;
  const startingIdx = firstTabStartsActive ? 0 : undefined;
  const [activeIdx, setActiveIdx] = useState(startingIdx);
  useEffect(() => {
    setActiveIdx(startingIdx);
  }, [startingIdx]);

  return (
    <Fragment key={'' + startingIdx + ssr}>
      <HiddenTiger>
        <p>
          This example shows the markup patterns for anchor-link-driven tablist actions…
        </p>
      </HiddenTiger>

      <Tabs
        aria-label="Optional label text"
        tabs={linkTabs}
        activeIdx={activeIdx}
        onSetActive={setActiveIdx}
        ssr={ssr}
        startSeen
      />

      {'\n'}
      <_TabPanels tabs={linkTabs} activeIdx={activeIdx} ssr={ssr} />
    </Fragment>
  );
};

export const _TabsAnchors: TabsAnchorsStory = {
  render: (args: TabsAnchorsControlProps) => <TabsAnchorsStory {...args} />,
  parameters: {
    css: {
      tokens: 'Tabs',
    },
  },
  argTypes: {
    showServerSideHtml: {
      control: 'boolean',
      name: 'Show only server-side HTML',
    },
    firstTabStartsActive: {
      control: 'boolean',
      name: 'First tab starts active',
    },
  },
  args: {
    showServerSideHtml: true,
    firstTabStartsActive: true,
  },
};
