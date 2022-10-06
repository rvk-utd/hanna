import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import RadioButtonsGroup from '@reykjavik/hanna-react/RadioButtonsGroup';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

import { props } from './CheckboxButtonsGroup';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <RadioButtonsGroup
        label={'Radio Buttons Group'}
        options={props}
        required={true}
        name={''}
      />
      <RadioButtonsGroup
        label={'Invalid Radio buttons Group'}
        options={props}
        invalid
        name={''}
        errorMessage="This is an error message"
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot }) => {
    const container = page.locator('.RadioButtonsGroup >> nth = 0');
    const invalidContainer = page.locator('.RadioButtonsGroup >> nth = 1');
    const normalRadio = page.locator('.RadioButton__label:text("Some") >> nth = 0');
    const invalidRadio = page.locator('.RadioButton__label:text("Some") >> nth = 1');
    const disabledRadio = page.locator(
      '.RadioButton__label:text("Disabled") >> nth = 0 '
    );
    await normalRadio.hover();
    await localScreenshot(container, 'normal-hover', { margin: true });

    await normalRadio.click();
    await localScreenshot(container, 'normal-click', { margin: true });

    await invalidRadio.hover();
    await localScreenshot(invalidContainer, 'invalid-hover', { margin: true });

    await invalidRadio.click();
    await localScreenshot(invalidContainer, 'invalid-click', { margin: true });

    await disabledRadio.hover();
    await localScreenshot(disabledRadio, 'disabled-hover', { margin: true });
  },
};
