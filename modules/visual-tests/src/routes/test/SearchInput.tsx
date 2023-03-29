import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { SearchInput, SearchInputProps } from '@reykjavik/hanna-react/SearchInput';
import { ObjectEntries } from '@reykjavik/hanna-utils';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { lorem } from '../../test-helpers/dummyData.js';
import { focusAllFormFields } from '../../test-helpers/focusAllFormFields.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: MetaFunction = autoTitle;

const value = 'Search terms';

const buttonProps = {
  buttonText: 'Search',
  onButtonClick: () => undefined,
};

const searchInputs: Record<string, SearchInputProps> = {
  empty: { label: 'Empty', value: '' },
  normal: { label: 'Normal', value },
  // nolabel: { hideLabel: true, label: 'No Label', value },
  // nolabelph: {
  //   hideLabel: true,
  //   label: 'No Label',
  //   placeholder: 'Placeholder',
  //   value: '',
  // },
  small: { label: 'Small', value, small: true },
  disabled: { label: 'Disabled', value, disabled: true },
  readonly: { label: 'Readonly', value, readOnly: true },
  invalid: { label: 'Invalid', value, invalid: true },
};
const renderedInputs: Record<string, SearchInputProps> = {
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
        <SearchInput key={id} id={id} {...props} />
      ))}
      <DummyBlock thin />
      {ObjectEntries(renderedInputs).map(([id, props]) => (
        <SearchInput key={id} id={`${id}-btn`} {...props} {...buttonProps} />
      ))}
    </Minimal>
  );
}

// ---------------------------------------------------------------------------

export const testing: TestingInfo = {
  extras: async ({ page, pageScreenshot, localScreenshot, project }) => {
    if (project === 'firefox-wide' || project === 'firefox-phone') {
      /* eslint-disable no-await-in-loop */
      for (const variant of ['', '-btn']) {
        for (const baseid of Object.keys(searchInputs)) {
          const id = baseid + variant;
          const input = page.locator(`#${id}`);
          const formfield = input.locator('closest=.FormField');

          await input.hover({ force: true });
          await localScreenshot(formfield, `${id}-hover`, { margin: 10 });

          if (variant) {
            const button = formfield.locator('.SearchInput__button');
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
      /* eslint-enable no-await-in-loop */
    }

    await focusAllFormFields(page);
    await pageScreenshot('focused');
  },
};
