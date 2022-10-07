import React, { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import Datepicker from '@reykjavik/hanna-react/Datepicker';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
export default function () {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <br />
      <Datepicker
        label={'Veldu dagsetningu'}
        placeholder={'d.mmm.yyyy'}
        value={startDate}
        onChange={(date?: Date) => setStartDate(date)}
        required
        assistText={'Close your eyes and input the first thing that comes to mind.'}
      />
      <DummyBlock thin />
      <br />
      <Datepicker
        label={'Veldu dagsetningu'}
        placeholder={'d.mmm.yyyy'}
        value={startDate}
        onChange={(date?: Date) => setStartDate(date)}
        errorMessage="Your input has errors"
      />
      <DummyBlock thin />
      <br />
      <Datepicker
        label={'Veldu dagsetningu - small + disabled'}
        placeholder={'d.mmm.yyyy'}
        value={startDate}
        onChange={(date?: Date) => setStartDate(date)}
        small
        disabled
      />
      <DummyBlock thin />
      <br />
      <Datepicker
        label={'Read only'}
        placeholder={'d.mmm.yyyy'}
        value={startDate}
        onChange={(date?: Date) => setStartDate(date)}
        readOnly
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot, pageScreenshot }) => {
    const datepicker = page.locator('.FormField >> nth = 0');
    const errorDate = page.locator('.FormField >> nth = 1');
    const disabled = page.locator('.FormField >> nth = 2');
    const readOnly = page.locator('.FormField >> nth = 3');

    await datepicker.hover();
    await pageScreenshot('datepicker-hover');

    await errorDate.hover();
    await pageScreenshot('errorMsg-hover');

    await disabled.hover();
    await localScreenshot(disabled, 'disabled-hover', { margin: true });

    await readOnly.hover();
    await localScreenshot(readOnly, 'readOnly-hover', { margin: true });

    await datepicker.click();
    await pageScreenshot('datepicker-click');
  },
};
