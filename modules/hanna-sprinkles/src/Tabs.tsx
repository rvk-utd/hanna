import './_/initHannaNamespace.js';

import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import domid from '@hugsmidjan/qj/domid';
import { getFrag } from '@hugsmidjan/qj/frag';
import { TabItemProps, Tabs } from '@reykjavik/hanna-react/Tabs';
import { WrapperElmProps } from '@reykjavik/hanna-react/utils.js';
import { notNully } from '@reykjavik/hanna-utils';

import { autoSeenEffectsRefresh, autoSeenEffectWrapperProps } from './_/addSeenEffect.js';

const setPanelDisplay = (panelElm: HTMLElement, isActive: boolean) => {
  if (isActive) {
    panelElm.hidden = false;
    panelElm.tabIndex = 0;
  } else {
    panelElm.hidden = true;
    panelElm.removeAttribute('tabindex');
  }
};

const isAriaLabelled = (elm: HTMLElement) =>
  elm.hasAttribute('aria-label') || elm.hasAttribute('aria-labelledby');

const log = (...args: Array<any>) => console.info('Tabs sprinkle: ', ...args);

// ---------------------------------------------------------------------------

type SprinkledTabsProps = {
  id?: string;
  label?: string;
  labelledBy?: string;
  tabPanelPairs: Array<{ tab: TabItemProps; panelElm: HTMLElement }>;
  startingIdx?: number;
} & WrapperElmProps;

const SprinkledTabs = (props: SprinkledTabsProps) => {
  const { tabPanelPairs, startingIdx, label, labelledBy, id } = props;
  const [activeIdx, setActiveIdx] = useState(startingIdx);

  const { tabs, onSetActive } = useMemo(
    () => ({
      tabs: tabPanelPairs.map((d) => d.tab),
      onSetActive: (newActiveIdx: number) => {
        const newTab = tabPanelPairs[newActiveIdx];
        if (!newTab) {
          return;
        }
        const currentTab = activeIdx !== undefined && tabPanelPairs[activeIdx];
        currentTab && setPanelDisplay(currentTab.panelElm, false);
        setPanelDisplay(newTab.panelElm, true);
        setActiveIdx(newActiveIdx);
      },
    }),
    [activeIdx, tabPanelPairs]
  );

  return (
    <Tabs
      tabs={tabs}
      id={id}
      aria-label={label}
      aria-labelledby={labelledBy}
      role="tablist"
      activeIdx={activeIdx}
      onSetActive={onSetActive}
      ssr={false}
    />
  );
};

// ---------------------------------------------------------------------------

const getTabsData = (elm: HTMLElement): SprinkledTabsProps | undefined => {
  const tabElms = Array.from(elm.querySelectorAll('.Tabs__tab'));
  type TabD = {
    tab: TabItemProps;
    isActive: boolean;
    panelElm: HTMLElement;
  };
  const data: Array<TabD> = tabElms
    .filter((tabElm): tabElm is HTMLAnchorElement => {
      tabElm = tabElm.cloneNode(true) as typeof tabElm;

      const isLink = 'href' in tabElm;
      if (!isLink) {
        log('Not an anchor element', tabElm);
      }
      return isLink;
    })
    .map((tabElm): TabD | undefined => {
      const controlsId =
        tabElm.getAttribute('aria-controls') || getFrag(tabElm.href) || undefined;
      const panelElm = controlsId && document.getElementById(controlsId);

      if (!panelElm) {
        if (!controlsId) {
          log('ID pointer missing on', tabElm);
        } else {
          log('tab panel elm not found for', tabElm);
        }
        return;
      }

      const badgeElm = tabElm.querySelector('.Tabs__tab__badge') || undefined;
      badgeElm && badgeElm.remove();
      const badge = badgeElm && badgeElm.textContent!.trim().replace(/(?:^\(|\)$)/g, '');

      return {
        panelElm,
        isActive: tabElm.dataset.active === 'true',
        tab: {
          id: tabElm.id || domid(),
          'aria-controls': controlsId,
          label: tabElm.textContent!,
          badge,
          longLabel: tabElm.getAttribute('aria-label') || undefined,
        },
      };
    })
    .filter(notNully);

  if (data.length !== tabElms.length) {
    return;
  }

  const activeIdx = data.findIndex((item) => item.isActive);

  return {
    id: elm.id || undefined,
    label: elm.getAttribute('aria-label') || undefined,
    labelledBy: elm.getAttribute('aria-labelledby') || undefined,
    tabPanelPairs: data.map((item) => ({
      tab: item.tab,
      panelElm: item.panelElm,
    })),
    startingIdx: activeIdx >= 0 ? activeIdx : undefined,
  };
};

// ---------------------------------------------------------------------------

window.Hanna.makeSprinkle({
  name: 'Tabs',

  init: (elm: HTMLElement) => {
    const props = getTabsData(elm);
    if (props) {
      props.tabPanelPairs.forEach(({ tab, panelElm }, i) => {
        setPanelDisplay(panelElm, i === props.startingIdx);
        panelElm.setAttribute('role', 'tabpanel');
        if (panelElm.classList.contains('TabPanel')) {
          panelElm.dataset.sprinkled = 'true';
        }
        if (!isAriaLabelled(panelElm)) {
          panelElm.setAttribute('aria-label', tab.longLabel || tab.label);
        }
      });

      const root = elm;
      elm.getAttributeNames().forEach((attrName) => {
        elm.removeAttribute(attrName);
      });

      ReactDOM.render(
        <SprinkledTabs {...props} wrapperProps={autoSeenEffectWrapperProps(elm)} />,
        root,
        () => autoSeenEffectsRefresh()
      );
      return root;
    }
  },

  unmount: (elm: HTMLElement, root) => {
    root && ReactDOM.unmountComponentAtNode(root);
  },
});
