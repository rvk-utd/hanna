import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import RadioButtonsGroup from '@reykjavik/hanna-react/RadioButtonsGroup';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

import { options } from './CheckboxButtonsGroup';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <RadioButtonsGroup
        label={'Radio Buttons Group'}
        options={options}
        value={'text'}
        required={true}
        name={'normal'}
      />
      <RadioButtonsGroup
        label={'Invalid Radio buttons Group'}
        options={options}
        value={'text'}
        invalid
        name={'invalid'}
        errorMessage="This is an error message"
      />
      <RadioButtonsGroup
        label={'Invalid Radio buttons Group'}
        options={options}
        value={'text'}
        disabled
        name={'disabled'}
        errorMessage="This is an error message"
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot }) => {
    const normal = page.locator('.RadioButton__label >> nth = 1');
    const checked = page.locator('.RadioButton__label >> nth = 0');
    const invalid = page.locator('.FormField--invalid .RadioButton__label >> nth = 1');
    const invalidChecked = page.locator(
      '.FormField--invalid .RadioButton__label >> nth = 0'
    );
    const disabled = page.locator('.FormField--disabled .RadioButton__label >> nth = 1 ');

    await normal.hover();
    await localScreenshot(normal, 'normal-hover', { margin: true });

    await checked.hover();
    await localScreenshot(checked, 'invalid-hover', { margin: true });

    await invalid.hover();
    await localScreenshot(invalid, 'invalid-hover', { margin: true });

    await invalidChecked.hover();
    await localScreenshot(invalidChecked, 'invalid-hover', { margin: true });

    await disabled.hover();
    await localScreenshot(disabled, 'disabled-hover', { margin: true });

    await normal.focus();
    await localScreenshot(normal, 'normal-focus', { margin: true });

    await checked.focus();
    await localScreenshot(checked, 'invalid-focus', { margin: true });

    await invalidChecked.focus();
    await localScreenshot(invalidChecked, 'invalid-focus', { margin: true });

    await invalid.focus();
    await localScreenshot(invalid, 'invalid-focus', { margin: true });
  },
};
