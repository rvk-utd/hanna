import React, { Fragment, useEffect, useState } from 'react';
import { getFrag } from '@hugsmidjan/qj/frag';
import { TabItemProps, Tabs } from '@reykjavik/hanna-react/Tabs';
import { SSRSupportProps, useIsBrowserSide } from '@reykjavik/hanna-react/utils';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTiger.js';

// =========================== Tabs ==========================================

const htmlElementOptions = ['button', 'link'] as const;

type ControlProps = {
  htmlElement: (typeof htmlElementOptions)[number];
  verticalLayout: boolean;
  badges: boolean;
  subTabs: boolean;
  showControlledDivExample: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'Tabs',
  parameters: {
    css: { tokens: 'Tabs' },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const buttonTabs: Array<TabItemProps> = [1, 2, 3, 4].map((num) => ({
  label: `Tab ${num}${num === 2 ? ' has very, very longwinded label' : ''}`,
  longLabel: num === 4 ? `Tab ${num} has longer label` : undefined,
  badge: [14, 2, undefined, '1.024'][num - 1],
}));
const linkTabs: Array<TabItemProps & { href: string }> = buttonTabs.map((tab, i) => ({
  ...tab,
  href: `#tab-${i + 1}`,
}));

const TabsStory: React.FC<ControlProps> = ({
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
          label: `Sub-${tab.label.toLowerCase()}`,
          longLabel: tab.longLabel ? `Sub-${tab.longLabel.toLowerCase()}` : undefined,
        })),
        activeIdx: 0,
        'aria-label': 'Sub tab label',
        'aria-controls': showExample && 'tab-target',
      }
    : undefined;

  return (
    <Fragment key={`${useButtons}${showExample}${vertical}${badges}${!!_subTabs}`}>
      <Tabs
        role="tablist"
        activeIdx={1}
        tabs={tabs}
        aria-label="Optional label text"
        aria-controls={showExample && 'tab-target'}
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

export const _Tabs: StoryObj<ControlProps> = {
  render: (args) => <TabsStory {...args} />,
  argTypes: {
    htmlElement: {
      name: 'HTML Element',
      options: htmlElementOptions,
      control: {
        type: 'inline-radio',
        labels: {
          button: '<button/>',
          link: '<a href="" />',
        } satisfies Record<ControlProps['htmlElement'], string>,
      },
    },
    verticalLayout: { name: 'Vertical layout' },
    badges: { name: 'Badges' },
    subTabs: { name: 'Sub-tabs' },
    showControlledDivExample: {
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
} & SSRSupportProps;

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

const TabsAnchorsStory = ({
  firstTabStartsActive,
  showServerSideHtml,
}: TabsAnchorsControlProps) => {
  const ssr = showServerSideHtml ? 'ssr-only' : false;
  const startingIdx = firstTabStartsActive ? 0 : undefined;
  const [activeIdx, setActiveIdx] = useState(startingIdx);
  useEffect(() => {
    setActiveIdx(startingIdx);
  }, [startingIdx]);

  return (
    <Fragment key={`${startingIdx}${ssr}`}>
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
      />

      {'\n'}
      <_TabPanels tabs={linkTabs} activeIdx={activeIdx} ssr={ssr} />
    </Fragment>
  );
};

export const _TabsAnchors: TabsAnchorsStory = {
  render: (args) => <TabsAnchorsStory {...args} />,
  argTypes: {
    showServerSideHtml: { name: 'Show only server-side HTML' },
    firstTabStartsActive: { name: 'First tab starts active' },
  },
  args: {
    showServerSideHtml: true,
    firstTabStartsActive: true,
  },
};
