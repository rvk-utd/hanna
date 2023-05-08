import React, { useEffect, useMemo, useState } from 'react';
import { setFrag } from '@hugsmidjan/qj/frag';
import { useDomid } from '@hugsmidjan/react/hooks';

import Tabs, { TabItemProps, TabsProps } from './Tabs.js';

const getId = (url: string | undefined) =>
  (url && decodeURIComponent(url.split('#')[1] || '')) || '';
const getItemId = (item: TabItemProps | undefined) => getId(item && item.href);

const mapToItemsById = (items: Array<VerticalTabsTOCItem>, domid: string) => {
  const updatedItems = items.map((item) => {
    return {
      ...item,
      'aria-controls': item['aria-controls'] || domid,
    };
  });
  const itemsById: Record<string, TOCState> = {};
  updatedItems.forEach((topItem, activeIdx) => {
    const subItems = topItem.items;
    if (!subItems) {
      const itemId = getItemId(topItem);
      itemsById[itemId] = { activeIdx };
      return;
    }

    subItems.forEach((subItem, idx) => {
      itemsById[getItemId(subItem)] = {
        activeIdx,
        subTabs: {
          activeIdx: idx,
          'aria-label': topItem.longLabel || topItem.label,
          id: topItem['aria-controls'],
          tabs: subItems,
          onSetActive: (_, item) => {
            const newId = getItemId(item);
            setFrag(newId);
          },
        },
      };
      if (idx === 0) {
        topItem.href = topItem.href || '#' + getItemId(subItem);
      }
    });
  });
  return { itemsById, updatedItems };
};

// ---------------------------------------------------------------------------

type TOCState = {
  activeIdx?: number;
  subTabs?: TabsProps['subTabs'];
};

export type VerticalTabsTOCItem = TabItemProps & {
  items?: Array<VerticalTabsTOCSubItem>;
};
export type VerticalTabsTOCSubItem = TabItemProps & {
  type?: never;
  href: string;
};

export type VerticalTabsTOCProps = {
  items: Array<VerticalTabsTOCItem>;
  onItemSelect: (itemId: string) => void;
} & Pick<TabsProps, 'aria-label' | 'ssr' | 'activateOnFocus' | 'id' | 'startSeen'>;

export const VerticalTabsTOC = (props: VerticalTabsTOCProps) => {
  const { onItemSelect, items } = props;

  const _domid = useDomid();
  const domid = props.id || _domid;
  const { itemsById, updatedItems } = useMemo(
    () => mapToItemsById(items, domid),
    [items, domid]
  );

  const [state, setState] = useState<TOCState>(() => {
    const initialId = typeof location !== 'undefined' ? getId(location.hash) : '';
    return itemsById[initialId] || itemsById[getItemId(updatedItems[0])] || {};
  });

  useEffect(() => {
    const handleHash = () => {
      const newId = getId(location.href);
      const newState = itemsById[newId];
      if (newState) {
        setState(newState);
        onItemSelect(newId);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [itemsById, onItemSelect]);

  return (
    <Tabs
      id={domid}
      vertical
      aria-label={props['aria-label']}
      onSetActive={(_, item) => {
        const itemId = getItemId(item);
        const newId = itemId || getItemId(itemsById[itemId]!.subTabs?.tabs[0]);
        setFrag(newId);
      }}
      tabs={updatedItems}
      role="tablist"
      activateOnFocus={props.activateOnFocus}
      activeIdx={state.activeIdx}
      subTabs={state.subTabs}
    />
  );
};

export default VerticalTabsTOC;
