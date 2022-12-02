import React, { Fragment } from 'react';
import { Locator } from '@playwright/test';
import type { MetaFunction } from '@remix-run/node';
import { CheckboxButtonsGroup } from '@reykjavik/hanna-react/CheckboxButtonsGroup';

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
    label: (
      <Fragment>
        Random text <small>Extra info</small>
      </Fragment>
    ),
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
  {
    value: 'label',
    label: 'Label Label',
  },
  {
    value: 'great',
    label: (
      <Fragment>
        {lorem.tiny.slice(0, 50)}{' '}
        <small>Extra extra info that is a bit longer than it maybe should be</small>
      </Fragment>
    ),
  },
];

export default function () {
  return (
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
        options={options.slice(0, 4)}
        value={['text']}
        invalid
        name={'invalid'}
        errorMessage="This is an error message"
      />
      <DummyBlock thin />
      <CheckboxButtonsGroup
        label={'Disabled Checkbox Group'}
        options={options.slice(0, 2)}
        value={['text']}
        disabled
        name={'disabled'}
        assistText="This is an assist text..."
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot, project }) => {
    if (project !== 'firefox-wide' && project !== 'firefox-phone') {
      return;
    }

    const checked = page.locator('.CheckboxButton__label >> nth=0');
    const notChecked = page.locator('.CheckboxButton__label >> nth=1');
    const invalidChecked = page.locator(
      '.FormField--invalid .CheckboxButton__label >> nth=0'
    );
    const disabled = page.locator('.FormField--disabled .CheckboxButton__label >> nth=1');

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
