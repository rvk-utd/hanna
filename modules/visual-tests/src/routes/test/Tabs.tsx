import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Tabs, { TabItemProps } from '@reykjavik/hanna-react/Tabs';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

const props: Array<TabItemProps> = [1, 2, 3, 4].map((i) => ({
  label: 'Tab ' + i + (i === 2 ? ' has very, very longwinded label' : ''),
  longLabel: i === 4 ? 'Tab ' + i + ' has longer label' : undefined,
  badge: [14, 2, undefined, '1.024'][i - 1],
}));

const subProps = {
  tabs: props.map((prop) => ({
    ...prop,
    label: 'Sub-' + prop.label.toLowerCase(),
    longLabel: prop.longLabel ? 'Sub-' + prop.longLabel.toLowerCase() : undefined,
  })),
};

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <Tabs aria-label="tabs" tabs={props} startSeen />
      <DummyBlock thin />
      <Tabs aria-label="with-subTabs" tabs={props} subTabs={subProps} startSeen />
      <Tabs tabs={props} vertical startSeen />
      <Tabs tabs={props} vertical subTabs={subProps} activeIdx={1} startSeen />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  skipScreenshot: true,
  extras: async ({ page, pageScreenshot, localScreenshot, setViewportSize }) => {
    // Initial screenshot doesn't include vertical tabs - need to skip initial screenshot and set viewport size to get
    await setViewportSize(1000);
    await pageScreenshot('tabs');

    // Hover tabs
    const tab = page.locator('button:text("Tab 1") >> nth = 0');
    const tabContainer = page.locator('[aria-label="tabs"]');
    const subTab = page.locator('button:text("Sub-tab 2") >> nth = 0');
    const subTabContainer = page.locator('[aria-label="with-subTabs"]');

    await tab.hover();
    await localScreenshot(tabContainer, 'tab-hover', { margin: true });

    await subTab.hover();
    await localScreenshot(subTabContainer, 'subTab-hover', { margin: true });

    await tab.focus();
    await localScreenshot(tabContainer, 'tab-focus', { margin: true });

    //Move hover focus point so that subtab.hover doesn't affect subtab.focus screenshot with hover-underline
    await page.locator('[aria-label="tabs"]').hover();

    await subTab.focus();
    await localScreenshot(subTabContainer, 'subtab-focus', { margin: true });
  },
};
