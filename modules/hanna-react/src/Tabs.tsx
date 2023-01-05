import React, { KeyboardEvent, useState } from 'react';
import { getFrag } from '@hugsmidjan/qj/frag';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { SeenProp, useSeenEffect } from './utils/seenEffect';
import { SSRSupport, useIsBrowserSide } from './utils';

const navKeyEffects: Record<string, 1 | -1> = {
  ArrowUp: -1,
  ArrowLeft: -1,
  ArrowDown: 1,
  ArrowRight: 1,
};

// ---------------------------------------------------------------------------

export type TabItemProps = {
  label: string;
  badge?: string | number;
  longLabel?: string;
  type?: 'button' | 'submit';
  id?: string;
  href?: string;
  'aria-controls'?: string;
  onActivated?: () => void | false;
};

/** @deprecated  Use `TabItemProps` instead  (Will be removed in v0.11) */
export type TabProps = TabItemProps;

// ---------------------------------------------------------------------------

type ListStateProps = {
  activeIdx: number | undefined;
  activateTab: (index: number) => void;
  focusedIdx: number;
  setFocusedIdx: (index: number) => void;
  tabRole: string | undefined;
  listAriaControls: string | undefined;
  isBrowser: true | undefined;
};

// eslint-disable-next-line complexity
const renderTab = (tabProps: TabItemProps, index: number, listProps: ListStateProps) => {
  const { label, badge, href, type, longLabel } = tabProps;
  const {
    activeIdx,
    activateTab,
    focusedIdx,
    setFocusedIdx,
    tabRole,
    listAriaControls,
    isBrowser,
  } = listProps;

  const handleClick =
    isBrowser &&
    ((e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      activateTab(index);
      e.currentTarget.focus();
    });
  const handleFocus = isBrowser && (() => setFocusedIdx(index));

  const isActive = activeIdx === index || undefined;
  const Tag = href && !tabRole ? 'a' : 'button';

  const tagProps =
    Tag === 'button'
      ? {
          role: tabRole,
          type: type || 'button',
          // 'aria-selected': tabRole && isActive,
          tabIndex: tabRole ? (focusedIdx === index ? 0 : -1) : undefined,
          'aria-controls':
            tabProps['aria-controls'] || (tabRole && getFrag(href)) || listAriaControls,
        }
      : { href };

  return [
    <Tag
      key={index}
      className="Tabs__tab"
      data-active={isActive}
      {...tagProps}
      onClick={handleClick}
      onFocus={handleFocus}
      aria-label={longLabel}
      title={longLabel} // make custom aria-labels visible
    >
      {label} {badge != null && <small className="Tabs__tab__badge">({badge})</small>}
    </Tag>,
    ' ',
  ];
};

// ===========================================================================

// ===========================================================================

type BaseTabsProps<T extends TabItemProps = TabItemProps> = {
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  tabs: Array<T>;
  activeIdx?: number;
  onSetActive?: (idx: number, tab: T) => void;
  role?: 'tablist' | 'toc';
  'aria-controls'?: string;
  activateOnFocus?: boolean;
  ssr?: SSRSupport;
};

export type TabsProps<T extends TabItemProps = TabItemProps> = BaseTabsProps<T> & {
  vertical?: boolean;
  /** Optional <Tabs/> block connected to the currently active tab */
  subTabs?: BaseTabsProps;
} & SeenProp;

/** @deprecated  Use `TabsProps` instead  (Will be removed in v0.11) */
export type TablistProps<T extends TabItemProps = TabItemProps> = TabsProps<T>;

// NOTE: This isBrowser tablist behavior is based on
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-2/tabs.html

export const Tabs = (props: TabsProps) => {
  const {
    tabs,
    role,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-controls': listAriaControls,
    id,
    activeIdx,
    onSetActive,
    activateOnFocus,
    ssr,
    startSeen,
    vertical,
    subTabs,
  } = props;

  const isBrowser = useIsBrowserSide(ssr);
  const [focusedIdx, setFocusedIdx] = useState<number>(activeIdx || 0);

  const tabRole = isBrowser && role === 'tablist' ? 'tab' : undefined;

  const activateTab = (index: number) => {
    const tab = tabs[index];
    if (index === activeIdx || !tab) {
      return;
    }
    const ret = tab.onActivated && tab.onActivated.call(null);
    if (onSetActive && ret !== false) {
      onSetActive(index, tab);
    }
  };

  const handleKeydown =
    tabRole &&
    ((e: KeyboardEvent) => {
      const delta = navKeyEffects[e.key];
      if (delta) {
        // prevent scolling +
        // prevent bubbling to parent Tabs container
        e.stopPropagation();
        let nextIdx = (focusedIdx || 0) + delta;
        const maxIdx = tabs.length - 1;
        nextIdx = nextIdx < 0 ? maxIdx : nextIdx > maxIdx ? 0 : nextIdx;
        e.currentTarget.querySelectorAll<HTMLElement>('.Tabs__tab')[nextIdx]?.focus();
        activateOnFocus && activateTab(nextIdx);
      }
    });
  const [ref] = useSeenEffect(startSeen);

  const listProps: ListStateProps = {
    activeIdx,
    activateTab,
    focusedIdx,
    setFocusedIdx,
    tabRole,
    listAriaControls,
    isBrowser,
  };

  return (
    <div
      className={getBemClass('Tabs', vertical && 'vertical')}
      role={tabRole && role}
      id={id}
      // aria-owns={tabIdList.join(' ')}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      onKeyDown={handleKeydown}
      data-sprinkled={isBrowser}
      ref={ref}
    >
      {tabs.map((tabProps, index) => renderTab(tabProps, index, listProps))}
      {subTabs && (
        <Tabs
          {...subTabs}
          role={'role' in subTabs ? subTabs.role : role}
          activateOnFocus={subTabs.activateOnFocus ?? activateOnFocus}
          ssr={subTabs.ssr ?? ssr}
          startSeen
          // just to be sure
          vertical={undefined}
          subTabs={undefined}
        />
      )}
    </div>
  );
};

export default Tabs;
