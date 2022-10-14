import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import CheckboxButtonsGroup from '@reykjavik/hanna-react/CheckboxButtonsGroup';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
//export const handle = { cssTokens: [] };

export const options = [
  {
    value: 'text',
    label: (
      <Fragment>
        Some checkbox text <small>Extra info</small>
      </Fragment>
    ),
  },
  {
    value: 'random',
    label: 'Random text',
  },
  {
    value: 'long',
    label: (
      <Fragment>
        {lorem.tiny} <small>Longer extra info</small>
      </Fragment>
    ),
  },
  {
    disabled: true,
    value: 'disabled',
    label: (
      <Fragment>
        Disabled checkbox <small>Extra info</small>
      </Fragment>
    ),
  },
  {
    value: 'great',
    label: lorem.tiny,
  },
];

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <CheckboxButtonsGroup
        label={'Checkbox Group'}
        options={options}
        value={['text']}
        required={true}
        name={'normal'}
      />
      <DummyBlock thin />
      <CheckboxButtonsGroup
        label={'Invalid Checkbox Group'}
        options={options}
        value={['text']}
        invalid
        name={'invalid'}
        errorMessage="This is an error message"
      />
      <DummyBlock thin />
      <CheckboxButtonsGroup
        label={'Invalid Checkbox Group'}
        options={options}
        value={['text']}
        disabled
        name={'disabled'}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot }) => {
    const normal = page.locator('.CheckboxButton__label >> nth = 1');
    const checked = page.locator('.CheckboxButton__label >> nth = 0');
    const invalid = page.locator('.FormField--invalid .CheckboxButton__label >> nth = 1');
    const invalidChecked = page.locator(
      '.FormField--invalid .CheckboxButton__label >> nth = 0'
    );
    const disabled = page.locator(
      '.FormField--disabled .CheckboxButton__label >> nth = 1 '
    );
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
