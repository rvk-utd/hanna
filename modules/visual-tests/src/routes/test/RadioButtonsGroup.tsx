import React from 'react';
import { Locator } from '@playwright/test';
import type { MetaFunction } from '@remix-run/node';
import { RadioButtonsGroup } from '@reykjavik/hanna-react/RadioButtonsGroup';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

import { options } from './CheckboxButtonsGroup';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    <Minimal>
      <RadioButtonsGroup
        label="Radio Buttons Group"
        options={options}
        value="text"
        required={true}
        name="normal"
      />
      <RadioButtonsGroup
        label="Invalid Radio buttons Group"
        options={options.slice(0, 4)}
        value="text"
        invalid
        name="invalid"
        errorMessage="This is an error message"
      />
      <RadioButtonsGroup
        label="Disabled Radio buttons Group"
        options={options.slice(0, 2)}
        value="text"
        disabled
        name="disabled"
        assistText="This is an error message"
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot, project }) => {
    if (project !== 'firefox-wide' && project !== 'firefox-phone') {
      return;
    }

    const checked = page.locator('.RadioButton__label >> nth=0');
    const notChecked = page.locator('.RadioButton__label >> nth=1');
    const invalidChecked = page.locator(
      '.FormField--invalid .RadioButton__label >> nth=0'
    );
    const disabled = page.locator('.FormField--disabled .RadioButton__label >> nth=1');

    const removeSubSequentNodes = (locator: Locator) =>
      locator.evaluate((elm) => {
        while (elm.nextSibling) {
          elm.nextSibling.remove();
        }
      });

    // Because flexbox may artificially increase button height
    await removeSubSequentNodes(notChecked);
    await removeSubSequentNodes(invalidChecked);
    await removeSubSequentNodes(disabled);

    // :hover

    await notChecked.hover();
    await localScreenshot(notChecked, 'notChecked-hover', { margin: 10 });

    await checked.hover();
    await localScreenshot(checked, 'checked-hover', { margin: 10 });

    await invalidChecked.hover();
    await localScreenshot(invalidChecked, 'invalidChecked-hover', { margin: 10 });

    await disabled.hover();
    await localScreenshot(disabled, 'disabled-hover', { margin: 10 });

    // :focus

    await notChecked.focus();
    await localScreenshot(notChecked, 'notChecked-focus', { margin: 10 });

    await checked.focus();
    await localScreenshot(checked, 'checked-focus', { margin: 10 });

    await invalidChecked.focus();
    await localScreenshot(invalidChecked, 'invalidChecked-focus', { margin: 10 });
  },
};
