import React, { Fragment } from 'react';
import { V2_MetaFunction } from '@remix-run/node';
import {
  DropdownButton,
  DropdownButtonItem,
} from '@reykjavik/hanna-react/DropdownButton';
import { VSpacer } from '@reykjavik/hanna-react/VSpacer';

import { Minimal } from '../../layout/Minimal.js';
import { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

const mockItems: Array<DropdownButtonItem> = Array.from({ length: 4 }).map(() => ({
  label: 'Something lorem ipsum diolor sit ament Leebur deroor ieroom',
  href: '',
}));

// ---------------------------------------------------------------------------

export const meta: V2_MetaFunction = autoTitle;

// Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('VSpacer');

export default function () {
  return (
    <Minimal>
      <DropdownButton
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
          },
          {
            label: 'Delete',
            href: '',
          },
        ]}
      />
      <VSpacer size="large" />
      <p>&nbsp;</p>
      <VSpacer size="large" />
      <DropdownButton buttonType="primary" label="A" items={mockItems} />
      <DropdownButton
        label={
          <>
            Actions <span style={{ fontWeight: 'normal' }}>JSX</span>
          </>
        }
        items={mockItems}
      />
      <DropdownButton
        label={
          <>
            Actions <span style={{ fontWeight: 'normal' }}>JSX</span>
          </>
        }
        buttonSize="small"
        buttonType="primary"
        items={mockItems}
      />
      <DropdownButton
        label="A"
        buttonVariant="destructive"
        buttonSize="small"
        items={mockItems}
      />
    </Minimal>
  );
}

// ---------------------------------------------------------------------------

export const testing: TestingInfo = {
  prep: async ({ page, dumbHover }) => {
    const dropdown = page.locator('.DropdownButton >> nth=0');

    await dropdown.click();
    await dumbHover(dropdown.locator('.DropdownButton__item >> nth=1'));
  },
};
