import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { TabItemProps, Tabs, TabsProps } from '@reykjavik/hanna-react/Tabs';

import ensureCSS from './_ensureCSS.js';

export type { TabsProps } from '@reykjavik/hanna-react/Tabs';

const UncontrolledTabs = <T extends TabItemProps>(props: TabsProps<T>) => {
  const { activeIdx, onSetActive, role = 'tablist', ...tabsProps } = props;

  const [_activeIdx, setActiveIdx] = useState(activeIdx);
  useEffect(() => setActiveIdx(activeIdx), [activeIdx]);

  const _onSetActive = useCallback(
    (newActiveIdx: number) => {
      const tabData = props.tabs[newActiveIdx];
      if (tabData) {
        onSetActive && onSetActive(newActiveIdx, tabData);
        setActiveIdx(newActiveIdx);
      }
    },
    [props.tabs, onSetActive]
  );

  return (
    <Tabs
      {...tabsProps}
      activeIdx={_activeIdx}
      onSetActive={_onSetActive}
      role={role}
      ssr={false}
    />
  );
};

// ===========================================================================

export const setPanelDisplay = (panelElm: HTMLElement, isActive: boolean) => {
  if (isActive) {
    panelElm.hidden = false;
    panelElm.tabIndex = 0;
  } else {
    panelElm.hidden = true;
    panelElm.removeAttribute('tabindex');
  }
};

// ===========================================================================

type MakeTabMeta<T extends TabItemProps> = {
  ready: Promise<void>;
  rootElm: HTMLDivElement;
  update(newTabProps: TabsProps<T>): void;
  unmount(): void;
  /**@deprecated
   *
   * Use the `setPanelDisplay` named export instead
   */
  setPanelDisplay: typeof setPanelDisplay;
};

const makeTabs = <T extends TabItemProps>(props: TabsProps<T>): MakeTabMeta<T> => {
  const rootElm = document.createElement('div');
  const ready = ensureCSS('Tabs').then(() => {
    ReactDOM.render(<UncontrolledTabs {...props} />, rootElm);
  });

  return {
    rootElm,
    unmount: () => {
      ReactDOM.unmountComponentAtNode(rootElm);
      rootElm.remove();
    },
    update: (newProps) => {
      ReactDOM.render(<UncontrolledTabs {...props} {...newProps} />, rootElm);
    },
    ready,
    setPanelDisplay,
  };
};

export default makeTabs;
