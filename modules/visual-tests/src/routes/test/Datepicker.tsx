import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Datepicker from '@reykjavik/hanna-react/Datepicker';
import RowBlock from '@reykjavik/hanna-react/RowBlock';
import RowBlockColumn from '@reykjavik/hanna-react/RowBlockColumn';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

const startDate = new Date('2022-10-05');

// Use `handle` if you're using multiple Hanna compnents
export const handle = { cssTokens: ['RowBlock', 'RowBlockColumn'] };

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <style>{`
        .RowBlock { margin: 0; }
      `}</style>
      <RowBlock>
        <RowBlockColumn>
          <Datepicker
            label={'Normal'}
            // name="date"
            placeholder={'d. mmm. yyyy'}
            dateFormat="d. MMM. yyyy"
            value={startDate}
            onChange={() => undefined}
            required
            assistText={'Close your eyes and input the first thing that comes to mind.'}
          />
          <DummyBlock thin />
          <Datepicker
            label={'Error'}
            // name="date"
            placeholder={'d. mmm. yyyy'}
            dateFormat="d. MMM. yyyy"
            value={startDate}
            onChange={() => undefined}
            errorMessage="Your input has errors"
          />
          <Datepicker
            label={'Small'}
            // name="date"
            placeholder={'d. mmm. yyyy'}
            dateFormat="d. MMM. yyyy"
            // value={undefined}
            onChange={() => undefined}
            small
          />
          <DummyBlock thin />
          <Datepicker
            label={'Disabled'}
            // name="date"
            placeholder={'d. mmm. yyyy'}
            dateFormat="d. MMM. yyyy"
            // value={undefined}
            onChange={() => undefined}
            disabled
          />
          <DummyBlock thin />
          <Datepicker
            label={'Read only'}
            // name="date"
            placeholder={'d. mmm. yyyy'}
            dateFormat="d. MMM. yyyy"
            // value={undefined}
            onChange={() => undefined}
            readOnly
          />
        </RowBlockColumn>
        <RowBlockColumn>{''}</RowBlockColumn>
      </RowBlock>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  viewportMinHeight: 700,
  extras: async ({ page, localScreenshot, pageScreenshot }) => {
    await page.locator('.FormField__label:text("Normal")').click();
    await pageScreenshot('opened');

    const datepicker = page.locator('.react-datepicker');

    await datepicker.locator('span:text-is("October")').hover();
    await localScreenshot(datepicker, 'dp-hover-month');

    await datepicker.locator('[role="button"]:text-is("5")').hover();
    await localScreenshot(datepicker, 'dp-hover-today');

    await datepicker.locator('[role="button"]:text-is("21")').hover();
    await localScreenshot(datepicker, 'dp-hover-weekend');
  },
};
