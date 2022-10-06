import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Checkbox from '@reykjavik/hanna-react/Checkbox';
import RadioGroup from '@reykjavik/hanna-react/RadioGroup';
import RowBlock from '@reykjavik/hanna-react/RowBlock';
import RowBlockColumn from '@reykjavik/hanna-react/RowBlockColumn';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = {
  cssTokens: ['Checkbox,RadioGroup,RowBlock,RowBlockColumn'],
};

export default function () {
  // alias here to appease PlayWright's weirdly limited build config
  const RadioGroup__Radio = RadioGroup.__Radio;

  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <RowBlock>
        <RowBlockColumn>
          <Checkbox label={lorem.short} />
          <Checkbox label="Normal" checked={false} />
          <Checkbox label="Checked" checked />
          <Checkbox label="Disabled" disabled checked={false} />
          <Checkbox label="Disabled + checked" disabled checked />
          <Checkbox label="Invalid" invalid checked={false} />
          <Checkbox label="Invalid + checked" invalid checked />
          <Checkbox
            label="Invalid + message"
            checked={false}
            errorMessage="Error message here"
          />
        </RowBlockColumn>
        <RowBlockColumn>
          {/* Playwright doesn't want run test on RadioGroup.__Radio */}
          <RadioGroup__Radio label={lorem.short} />
          <RadioGroup__Radio label="Normal" checked={false} />
          <RadioGroup__Radio label="Checked" checked />
          <RadioGroup__Radio label="Disabled" disabled checked={false} />
          <RadioGroup__Radio label="Disabled + checked" disabled checked />
          <RadioGroup__Radio label="Invalid" invalid checked={false} />
          <RadioGroup__Radio label="Invalid + checked" invalid checked />
        </RowBlockColumn>{' '}
      </RowBlock>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot }) => {
    // Checkbox
    const normalCheckbox = page.locator('.Checkbox__label:text("Normal")');
    const checkedCheckbox = page.locator('.Checkbox__label:text("Checked") >> nth = 0');
    const disabledCheckbox = page.locator('.Checkbox__label:text("Disabled") >> nth =0');
    const invalidCheckbox = page.locator('.Checkbox__label:text("Invalid") >> nth =0');

    // Radio
    const radioNormal = page.locator('.Radio__label:text("Normal")');
    const radioChecked = page.locator('.Radio__label:text("Checked") >> nth = 0');
    const radioDisabled = page.locator('.Radio__label:text("Disabled") >> nth = 0');
    const radioInvalid = page.locator('.Radio__label:text("Invalid") >> nth = 0 ');

    // Hover checkboxes
    await normalCheckbox.hover();
    await localScreenshot(normalCheckbox, 'normal-hover', { margin: true });

    await checkedCheckbox.hover();
    await localScreenshot(checkedCheckbox, 'checked-hover', { margin: true });

    await disabledCheckbox.hover();
    await localScreenshot(disabledCheckbox, 'disabled-hover', { margin: true });

    await invalidCheckbox.hover();
    await localScreenshot(invalidCheckbox, 'invalid-hover', { margin: true });

    // Hover radio buttons
    await radioNormal.hover();
    await localScreenshot(radioNormal, 'radioNormal-hover', { margin: 10 });

    await radioChecked.hover();
    await localScreenshot(radioChecked, 'radionChecked-hover', { margin: 10 });

    await radioDisabled.hover();
    await localScreenshot(radioDisabled, 'radioDisabled-hover', { margin: 10 });

    await radioInvalid.hover();
    await localScreenshot(radioInvalid, 'radioInvalid-hover', { margin: 10 });
  },
};
