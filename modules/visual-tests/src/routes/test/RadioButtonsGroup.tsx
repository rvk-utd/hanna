import React from 'react';
import { Locator } from '@playwright/test';
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
  extras: async ({ page, localScreenshot, project }) => {
    if (project !== 'firefox_wide' && project !== 'iphone') {
      return;
    }

    const normal = page.locator('.RadioButton__label >> nth = 1');
    const checked = page.locator('.RadioButton__label >> nth = 0');
    const invalid = page.locator('.FormField--invalid .RadioButton__label >> nth = 1');
    const invalidChecked = page.locator(
      '.FormField--invalid .RadioButton__label >> nth = 0'
    );
    const disabled = page.locator('.FormField--disabled .RadioButton__label >> nth = 1 ');

    const removeSubSequentNodes = (locator: Locator) =>
      locator.evaluate((elm) => {
        while (elm.nextSibling) {
          elm.nextSibling.remove();
        }
      });

    // Because flexbox may artificially increase button height
    await removeSubSequentNodes(normal);
    await removeSubSequentNodes(invalidChecked);
    await removeSubSequentNodes(disabled);

    // :hover

    await normal.hover();
    await localScreenshot(normal, 'normal-hover', { margin: true });

    await checked.hover();
    await localScreenshot(checked, 'checked-hover', { margin: true });

    await invalid.hover();
    await localScreenshot(invalid, 'invalid-hover', { margin: true });

    await invalidChecked.hover();
    await localScreenshot(invalidChecked, 'invalidchecked-hover', { margin: true });

    await disabled.hover();
    await localScreenshot(disabled, 'disabled-hover', { margin: true });

    // :focus

    await normal.focus();
    await localScreenshot(normal, 'normal-focus', { margin: true });

    await checked.focus();
    await localScreenshot(checked, 'checked-focus', { margin: true });

    await invalid.focus();
    await localScreenshot(invalid, 'invalid-focus', { margin: true });

    await invalidChecked.focus();
    await localScreenshot(invalidChecked, 'invalidchecked-focus', { margin: true });
  },
};
