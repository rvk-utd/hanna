import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Selectbox, { SelectboxProps } from '@reykjavik/hanna-react/Selectbox';
import { ObjectEntries } from '@reykjavik/hanna-utils';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

const options = ['Option A', ''];
const selectboxes: Record<string, SelectboxProps & { noTest?: true }> = {
  empty: { label: 'Empty', options, value: '' },
  placeholder: {
    label: 'Placeholder',
    options,
    value: '',
    placeholder: 'Placeholder',
  },
  normal: { label: 'Normal', options },
  small: { label: 'Small', options, small: true },
  disabled: { label: 'Disabled', options, disabled: true },
  readonly: { label: 'Readonly', options, readOnly: true },
  invalid: { label: 'Invalid', options, invalid: true },
  overflowing: {
    label: 'Normal overflowing',
    options: [lorem.medium],
    noTest: true,
  },
};

export default function () {
  return (
    <Minimal>
      {ObjectEntries(selectboxes).map(([id, props]) => (
        <Selectbox key={id} id={id} {...props} />
      ))}
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot, project }) => {
    if (project !== 'firefox-wide' && project !== 'firefox-phone') {
      return;
    }
    const selectboxesToTest = ObjectEntries(selectboxes).filter(
      ([, props]) => !props.noTest
    );

    /* eslint-disable no-await-in-loop */
    for (const [id, props] of selectboxesToTest) {
      const select = page.locator(`#${id}`);
      const formfield = select.locator('closest=.FormField');

      await select.hover();
      await localScreenshot(formfield, `${id}-hover`, { margin: 10 });

      if (!props.disabled) {
        await page.mouse.move(0, 0);
        await select.focus();
        await localScreenshot(formfield, `${id}-focus`, { margin: 10 });
      }
    }
    /* eslint-enable no-await-in-loop */
  },
};
