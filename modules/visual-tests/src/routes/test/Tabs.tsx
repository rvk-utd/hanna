import React, { Fragment } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { TabItemProps, Tabs, TabsProps } from '@reykjavik/hanna-react/Tabs';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

export const meta: V2_MetaFunction = autoTitle;

// Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('VSpacer');

type SubTabProps = NonNullable<TabsProps['subTabs']>;

const tabs = [1, 2, 3].map(
  (i): TabItemProps => ({
    label: `Tab ${i}${i === 3 ? ' has a very longwinded label' : ''}`,
    longLabel: i === 2 ? `Tab ${i} has longer label` : undefined,
    badge: [14, undefined, 999][i - 1],
  })
);

const linkTabs = tabs.map((tab, i): TabItemProps & { href: string } => ({
  ...tab,
  href: `#tab-${i + 1}`,
}));

const subTabs: SubTabProps = {
  tabs: tabs.map((prop) => ({
    ...prop,
    label: `Sub-${prop.label}`,
    longLabel: prop.longLabel ? `Sub-${prop.longLabel}` : undefined,
  })),
  activeIdx: 2,
};
const linkSubTabs: SubTabProps = {
  tabs: tabs.map((prop) => ({
    ...prop,
    label: `Sub-${prop.label}`,
    longLabel: prop.longLabel ? `Sub-${prop.longLabel}` : undefined,
  })),
  activeIdx: 2,
};

const renderTabs = (
  tagType: 'links' | 'buttons',
  tabs: Array<TabItemProps>,
  subTabs: SubTabProps
) => (
  <Fragment>
    <Tabs aria-label={`${tagType}-tabs`} tabs={tabs} activeIdx={1} />
    <DummyBlock thin />
    <Tabs aria-label={`${tagType}-subTabs`} tabs={tabs} activeIdx={2} subTabs={subTabs} />
    <DummyBlock thin />
    <Tabs aria-label={`${tagType}-vertical-tabs`} tabs={tabs} activeIdx={0} vertical />
    <DummyBlock thin />
    <Tabs
      aria-label={`${tagType}-vertical-subTabs`}
      tabs={tabs}
      vertical
      subTabs={subTabs}
      activeIdx={1}
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
    />
  </Fragment>
);

export default function () {
  return (
    <Minimal>
      <style>{`
        /* Disable default \`float: left:\` behavior */
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
  extras: async ({ page, localScreenshot, mediaFormat }) => {
    if (!mediaFormat('wide') && !mediaFormat('phone')) {
      return;
    }

    // Hover tabs
    for (const tagType of ['links', 'buttons'] as const) {
      /* eslint-disable no-await-in-loop */
      for (const labelSuffix of [
        'tabs',
        'subTabs',
        'vertical-tabs',
        'vertical-subTabs',
      ] as const) {
        const tabsLabel = `${tagType}-${labelSuffix}`;
        const tabContainer = page.locator(`[aria-label="${tabsLabel}"]`);
        const tabText = /-subTabs$/.test(labelSuffix) ? 'Sub-tab' : 'Tab';

        await tabContainer.locator(`.Tabs__tab:text("${tabText} 1") >> nth=0`).hover();
        await localScreenshot(tabContainer, `${tabsLabel}-hover`);
      }
      /* eslint-enaable no-await-in-loop */
    }
  },
};
