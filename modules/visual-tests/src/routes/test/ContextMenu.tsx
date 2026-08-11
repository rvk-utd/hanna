import React, { Fragment, useEffect } from 'react';
import { V2_MetaFunction } from '@remix-run/node';
import { ContextMenu, ContextMenuItem } from '@reykjavik/hanna-react/ContextMenu';

import { Minimal } from '../../layout/Minimal.js';
import { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

const mockItems: Array<ContextMenuItem> = Array.from({ length: 4 }).map((_, i) => ({
  label: 'Something lorem ipsum diolor sit ament Leebur deroor ieroom',
  href: '',
  current: i === 2,
}));

const mockItemsShort: Array<ContextMenuItem> = Array.from({ length: 4 }).map((_, i) => ({
  label: `Item ${i}`,
  href: '',
  current: i === 2,
}));

// ---------------------------------------------------------------------------

export const meta: V2_MetaFunction = autoTitle;

// Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('VSpacer');

export default function () {
  useEffect(() => {
    const click = setTimeout(
      () => document.querySelector<HTMLElement>('.ContextMenu__toggler')?.click(),
      300
    );
    return () => clearTimeout(click);
  }, []);

  return (
    <Minimal>
      <ContextMenu
        label="Actions"
        items={[
          {
            label: 'Edit',
            icon: 'edit',
            onClick: () => alert('Edit'),
          },
          {
            label: (
              <>
                Something else with <small>some JSX</small> and a long label
              </>
            ),
            href: '',
            current: true,
          },
          {
            label: 'Something else',
            href: '',
          },
          {
            divider: true,
            // label: 'Caution!! this is very long and should be truncated at some point',
            // label: 'Caution!!',
          },
          {
            label: 'Delete',
            href: '',
            destructive: true,
          },
        ]}
      />

      <p style={{ height: '250px' }}>&nbsp;</p>

      <ContextMenu togglerType="primary" label="A" items={mockItemsShort} />
      <ContextMenu
        label={
          <>
            Actions <span style={{ fontWeight: 'normal' }}>JSX</span>
          </>
        }
        items={mockItems}
        togglerIcon="edit"
      />
      <ContextMenu
        label={
          <>
            Actions <span style={{ fontWeight: 'normal' }}>JSX</span>
          </>
        }
        togglerSize="small"
        togglerType="primary"
        items={mockItems}
      />
      <ContextMenu
        label="A"
        togglerVariant="destructive"
        togglerSize="small"
        items={mockItemsShort}
      />
      <ContextMenu
        renderToggler={({ isOpen }) => (
          <span style={{ display: 'block', background: 'yellow', padding: '8px' }}>
            Custom toggler {isOpen ? '▲' : '▼'}
          </span>
        )}
        items={mockItems}
      />
    </Minimal>
  );
}

// ---------------------------------------------------------------------------

export const testing: TestingInfo = {
  __DEV_FOCUS__: true,
  extras: async ({ page, localScreenshot, mediaFormat, dumbHover }) => {
    if (!mediaFormat('wide')) {
      return;
    }
    const menu = page.locator('.ContextMenu >> nth=0');

    const normalItem = menu.locator('.ContextMenu__item >> nth=2');
    await dumbHover(normalItem);
    await localScreenshot(normalItem, `item-hover`, { margin: true });

    const destructiveItem = menu.locator(
      '.ContextMenu__item:has(.ContextMenu__itembutton--destructive)'
    );
    await dumbHover(destructiveItem);
    await localScreenshot(destructiveItem, `item-hover-destructive`, {
      margin: true,
    });

    const activeItem = menu.locator('.ContextMenu__item[aria-current="true"]');
    await dumbHover(activeItem);
    await localScreenshot(activeItem, `hover-active`, { margin: true });
  },
};
