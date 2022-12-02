import React, { Fragment, useEffect, useState } from 'react';
import { getFrag } from '@hugsmidjan/qj/frag';
import { SSRSupport, useIsBrowserSide } from '@hugsmidjan/react/hooks';
import Tabs, { TabItemProps } from '@reykjavik/hanna-react/Tabs';
import { boolean } from '@storybook/addon-knobs';

import { HiddenTiger } from './utils/HiddenTiger';
import { useLink } from './utils/knobs';
import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'Tabs',
  component: Tabs,
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

const buttonTabs: Array<TabItemProps> = [1, 2, 3, 4].map((num) => ({
  label: 'Tab ' + num + (num === 2 ? ' has very, very longwinded label' : ''),
  longLabel: num === 4 ? 'Tab ' + num + ' has longer label' : undefined,
  badge: [14, 2, undefined, '1.024'][num - 1],
}));
const linkTabs: Array<TabItemProps & { href: string }> = buttonTabs.map((tab, i) => ({
  ...tab,
  href: '#tab-' + (i + 1),
}));

export const _Tabs: StoryComponent = () => {
  const useButtons = !useLink(true);
  const showExample =
    (useButtons && boolean('Show contolled <div/> example', false)) || undefined;
  const vertical = boolean('Vertical layout', false);
  const badges = boolean('Badges', false);

  const _tabs = useButtons ? buttonTabs : linkTabs;
  const tabs = badges ? _tabs : _tabs.map((tab) => ({ ...tab, badge: undefined }));

  const subTabs = boolean('Sub-tabs', false)
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
    <Fragment key={'' + useButtons + showExample + vertical + badges + !!subTabs}>
      <Tabs
        role="tablist"
        activeIdx={1}
        tabs={tabs}
        aria-label="Optional label text"
        aria-controls={showExample && 'tab-target'}
        startSeen
        vertical={vertical}
        subTabs={subTabs}
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

// ===========================================================================

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

export const _Tabs__anchors: StoryComponent = () => {
  const ssr = boolean('Show only server-side HTML', true) ? 'ssr-only' : false;
  const startingIdx = boolean('First tab starts active', true) ? 0 : undefined;
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
