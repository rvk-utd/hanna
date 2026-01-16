import React, { Fragment, useEffect } from 'react';
import { V2_MetaFunction } from '@remix-run/node';
import { ContextMenu, ContextMenuItem } from '@reykjavik/hanna-react/ContextMenu';
import { VSpacer } from '@reykjavik/hanna-react/VSpacer';

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
    document.querySelector<HTMLElement>('.ContextMenu__toggler')?.click();
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

      <VSpacer size="large" />
      <p>&nbsp;</p>
      <VSpacer size="large" />

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
        Toggler={({ isOpen }) => (
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
  prep: async ({ page, dumbHover }) => {
    const dropdown = page.locator('.ContextMenu >> nth=0');

    await dropdown.click();
    await dumbHover(dropdown.locator('.ContextMenu__item >> nth=1'));
  },
};
