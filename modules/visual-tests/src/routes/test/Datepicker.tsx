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
      <RowBlock>
        <RowBlockColumn>
          <Datepicker
            label={'Normal'}
            localeCode="is"
            // name="date"
            placeholder={'d. mmm. yyyy'}
            dateFormat="d. MMM yyyy"
            value={startDate}
            onChange={() => undefined}
            required
          />
          <DummyBlock thin />
          <Datepicker
            label={'Error'}
            localeCode="is"
            // name="date"
            placeholder={'d. mmm. yyyy'}
            dateFormat="d. MMM yyyy"
            value={startDate}
            onChange={() => undefined}
            invalid
          />
          <Datepicker
            label={'Small'}
            localeCode="is"
            // name="date"
            placeholder={'d. mmm. yyyy'}
            dateFormat="d. MMM yyyy"
            // value={undefined}
            onChange={() => undefined}
            small
          />
          <DummyBlock thin />
          <Datepicker
            label={'Disabled'}
            localeCode="is"
            // name="date"
            placeholder={'d. mmm. yyyy'}
            dateFormat="d. MMM yyyy"
            // value={undefined}
            onChange={() => undefined}
            disabled
          />
          <DummyBlock thin />
          <Datepicker
            label={'Read only'}
            localeCode="is"
            // name="date"
            placeholder={'d. mmm. yyyy'}
            dateFormat="d. MMM yyyy"
            // value={undefined}
            onChange={() => undefined}
            readOnly
          />
        </RowBlockColumn>
        <RowBlockColumn> </RowBlockColumn>
      </RowBlock>
      <style>{`
        .RowBlock { margin: 0; }
        .RowBlockColumn { padding-block: 0; }
      `}</style>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  viewportMinHeight: 700,
  extras: async ({ page, localScreenshot, pageScreenshot }) => {
    await page.locator('.FormField__input input >> nth=0').click();
    await pageScreenshot('opened');

    const datepicker = page.locator('.react-datepicker');

    await datepicker.locator('span:text-is("október"), span:text-is("Október")').hover();
    await localScreenshot(datepicker, 'dp-hover-month');

    await datepicker.locator('[role="button"]:text-is("5") >> nth=0').hover();
    await localScreenshot(datepicker, 'dp-hover-today');

    await datepicker.locator('[role="button"]:text-is("21") >> nth=0').hover();
    await localScreenshot(datepicker, 'dp-hover-weekend');
  },
};
