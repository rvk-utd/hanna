import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import {
  SiteSearchInput,
  SiteSearchInputProps,
} from '@reykjavik/hanna-react/SiteSearchInput';
import { ObjectEntries } from '@reykjavik/hanna-utils';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { lorem } from '../../test-helpers/dummyData.js';
import { focusAllFormFields } from '../../test-helpers/focusAllFormFields.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

const searchInputs: Record<string, SiteSearchInputProps> = {
  empty: { label: 'Empty', value: '' },
  normal: { label: 'Normal', value: 'Search terms' },
};

const renderedInputs: Record<string, SiteSearchInputProps> = {
  ...searchInputs,
  overflowing: {
    label: 'Normal overflowing',
    value: lorem.medium,
  },
};

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      {ObjectEntries(renderedInputs).map(([id, props]) => (
        <SiteSearchInput key={id} id={`${id}-btn`} buttonText="Search" {...props} />
      ))}
      <DummyBlock thin />
      {ObjectEntries(renderedInputs).map(([id, props]) => (
        <SiteSearchInput key={id} id={id} buttonText="Search" {...props} button={false} />
      ))}
    </Minimal>
  );
}

// ---------------------------------------------------------------------------

export const testing: TestingInfo = {
  extras: async ({ page, pageScreenshot, localScreenshot, mediaFormat }) => {
    if (mediaFormat('wide') || mediaFormat('phone')) {
      /* eslint-disable no-await-in-loop */
      for (const variant of ['', '-btn']) {
        for (const baseid of Object.keys(searchInputs)) {
          const id = baseid + variant;
          const input = page.locator(`#${id}`);
          const formfield = input.locator('closest=.FormField');

          await input.hover({ force: true });
          await localScreenshot(formfield, `${id}-hover`, { margin: 10 });

          if (variant) {
            const button = formfield.locator('.SiteSearchInput__button');
            if (await button.isVisible()) {
              await button.hover({ force: true });
              await localScreenshot(button, `${id}-hover-button`);
              if (!(await button.isDisabled())) {
                await button.focus();
                await localScreenshot(button, `${id}-focus-button`);
              }
            }
          }
        }
      }

      await focusAllFormFields(page);
      await pageScreenshot('focused');
      /* eslint-enable no-await-in-loop */
    }
  },
};
