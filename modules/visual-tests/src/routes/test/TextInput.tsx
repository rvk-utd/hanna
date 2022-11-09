/* eslint-disable no-await-in-loop */
import React from 'react';
import { Locator } from '@playwright/test';
import type { MetaFunction } from '@remix-run/node';
import Textinput from '@reykjavik/hanna-react/TextInput';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    <Minimal>
      <Textinput label="Normal" placeholder="Placeholder" aria-label="normal" />
      <Textinput
        placeholder="Placeholder"
        label="Label"
        hideLabel={true}
        errorMessage="Error message here"
        aria-label="error"
      />
      <Textinput label="Assist text" assistText="Assist text here" aria-label="assist" />
      <Textinput
        placeholder="Placeholder"
        label="Text area, required"
        type={'textarea'}
        aria-label="textarea"
        required
      />
      <Textinput placeholder="Placeholder" label="Small" small />
      <Textinput label="Disabled" disabled aria-label="disabled" />
      <Textinput label="Read only" readOnly aria-label="readonly" />
      <Textinput placeholder="Placeholder" label="Invalid" aria-label="invalid" invalid />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot, project }) => {
    if (project !== 'firefox-wide' && project !== 'firefox-phone') {
      return;
    }

    // Three states: empty, neither, filled
    const normal = page.locator('.FormField__input >> nth = 0');
    const invalid = page.locator('.FormField__input[aria-invalid=true] >> nth = 1');
    const readOnly = page.locator('.FormField__input[aria-label="readonly"] ');
    const assist = page.locator('.FormField__input[aria-label="assist"] ');

    const textInputs = [
      { loc: normal, name: 'normal' },
      { loc: assist, name: 'assist' },
      { loc: readOnly, name: 'read-only' },
      { loc: invalid, name: 'invalid' },
    ];

    // Test focus on all states
    const focusTest = async (loc: Locator, name: string) => {
      // Neither state (placeholder)
      await loc.focus();
      await localScreenshot(loc, name + '-neither-focus', { margin: true });
      if (name !== 'read-only') {
        // Empty state
        await loc.fill('');
        await localScreenshot(loc, name + '-empty-focus', { margin: true });

        // Filled state
        await loc.fill('Some input');
        await localScreenshot(loc, name + '-filled-focus', { margin: true });
      }
    };
    let i = 0;
    let textInput: typeof textInputs[number] | undefined;
    while ((textInput = textInputs[i++])) {
      await focusTest(textInput.loc, textInput.name);
    }
  },
};
