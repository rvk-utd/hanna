/* eslint-disable no-await-in-loop */
import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Selectbox from '@reykjavik/hanna-react/Selectbox';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

const options = [{ value: 'a', label: 'Option A' }];
export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <Selectbox label={'Normal'} options={options} />
      <Selectbox label={'Small'} options={options} small />
      <Selectbox label={'Disabled'} options={options} disabled />
      <Selectbox label={'Read Only'} options={options} readOnly />
      <Selectbox label={'Invalid'} options={options} invalid />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot }) => {
    const selectboxLocator = await page.locator('.FormField').elementHandles();
    for (const selectbox of selectboxLocator) {
      const label = (await selectbox.innerText()).valueOf();
      await selectbox.hover();
      await localScreenshot(selectbox, label.replace('Option A', '') + '-hover', {
        margin: [5, 10],
      });
    }
  },
};
