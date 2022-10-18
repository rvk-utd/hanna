import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import Tabs, { TabItemProps, TabsProps } from '@reykjavik/hanna-react/Tabs';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// Use `handle` if you're using multiple Hanna compnents
export const handle = { cssTokens: ['VSpacer'] };

type SubTabProps = NonNullable<TabsProps['subTabs']>;

const tabs = [1, 2, 3].map(
  (i): TabItemProps => ({
    label: 'Tab ' + i + (i === 3 ? ' has very, very longwinded label' : ''),
    longLabel: i === 2 ? 'Tab ' + i + ' has longer label' : undefined,
    badge: [14, undefined, 999][i - 1],
  })
);

const linkTabs = tabs.map((tab, i): TabItemProps & { href: string } => ({
  ...tab,
  href: '#tab-' + (i + 1),
}));

const subTabs: SubTabProps = {
  tabs: tabs.map((prop) => ({
    ...prop,
    label: 'Sub-' + prop.label,
    longLabel: prop.longLabel ? 'Sub-' + prop.longLabel : undefined,
  })),
  activeIdx: 2,
};
const linkSubTabs: SubTabProps = {
  tabs: tabs.map((prop) => ({
    ...prop,
    label: 'Sub-' + prop.label,
    longLabel: prop.longLabel ? 'Sub-' + prop.longLabel : undefined,
  })),
  activeIdx: 2,
};

const renderTabs = (
  tagType: 'links' | 'buttons',
  tabs: Array<TabItemProps>,
  subTabs: SubTabProps
) => (
  <Fragment>
    <Tabs aria-label={`${tagType}-tabs`} tabs={tabs} activeIdx={1} startSeen />
    <DummyBlock thin />
    <Tabs
      aria-label={`${tagType}-subTabs`}
      tabs={tabs}
      activeIdx={2}
      subTabs={subTabs}
      startSeen
    />
    <DummyBlock thin />
    <Tabs
      aria-label={`${tagType}-vertical-tabs`}
      tabs={tabs}
      activeIdx={0}
      vertical
      startSeen
    />
    <DummyBlock thin />
    <Tabs
      aria-label={`${tagType}-vertical-subTabs`}
      tabs={tabs}
      vertical
      subTabs={subTabs}
      activeIdx={1}
      startSeen
    />
    <DummyBlock thin />
    <Tabs
      aria-label={`${tagType}-vertical-subTabs2`}
      tabs={tabs.slice(0, 2)}
      vertical
      subTabs={{
        tabs: subTabs.tabs.slice(0, 2),
        activeIdx: 0,
      }}
      activeIdx={2}
      startSeen
    />
  </Fragment>
);

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <style>{`
        .Tabs--vertical[class] {
          position: static;
        }
      `}</style>
      {renderTabs('buttons', tabs, subTabs)}
      <DummyBlock />
      {renderTabs('links', linkTabs, linkSubTabs)}
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot }) => {
    // Hover tabs
    for await (const tagType of ['links', 'buttons'] as const) {
      for await (const labelSuffix of [
        'tabs',
        'subTabs',
        'vertical-tabs',
        'vertical-subTabs',
      ] as const) {
        const tabsLabel = tagType + '-' + labelSuffix;
        const tabContainer = page.locator(`[aria-label="${tabsLabel}"]`);
        const tabText = /-subTabs$/.test(labelSuffix) ? 'Sub-tab' : 'Tab';

        await tabContainer.locator(`.Tabs__tab:text("${tabText} 1")`).hover();
        await localScreenshot(tabContainer, tabsLabel + '-hover');

        await page.mouse.move(0, 0);
        await tabContainer.locator(`.Tabs__tab:text("${tabText} 1")`).focus();
        await localScreenshot(tabContainer, tabsLabel + '-focus');
      }
    }
  },
};
