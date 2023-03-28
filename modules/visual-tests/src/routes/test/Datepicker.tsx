import React, { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Datepicker, DatepickerProps } from '@reykjavik/hanna-react/Datepicker';
import { RowBlock } from '@reykjavik/hanna-react/RowBlock';
import { RowBlockColumn } from '@reykjavik/hanna-react/RowBlockColumn';

import { Minimal } from '../../layout/Minimal';
import { focusAllFormFields } from '../../test-helpers/focusAllFormFields';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';
import { cssTokens } from '../../utils/route.server';

export const meta: MetaFunction = autoTitle;

const startDate = new Date('2022-10-05');

const lang: DatepickerProps['localeCode'] = undefined;

// Use `handle` if you're using multiple Hanna compnents
export const handle = { lang, ...cssTokens('RowBlock', 'RowBlockColumn') };

export default function () {
  const [date, setDate] = useState<Date | undefined>(startDate);

  return (
    <Minimal>
      <RowBlock>
        <RowBlockColumn>
          <Datepicker
            label="Normal"
            localeCode={lang}
            // name="date"
            placeholder="d. mmm. yyyy"
            dateFormat="d. MMM yyyy"
            value={date}
            onChange={(newDate) => {
              console.log(newDate);
              setDate(newDate);
              return undefined;
            }}
            required
          />
          <Datepicker
            label="Error"
            localeCode={lang}
            // name="date"
            placeholder="d. mmm. yyyy"
            dateFormat="d. MMM yyyy"
            value={startDate}
            onChange={() => undefined}
            invalid
          />
          <Datepicker
            label="Small"
            localeCode={lang}
            // name="date"
            placeholder="d. mmm. yyyy"
            dateFormat="d. MMM yyyy"
            // value={undefined}
            onChange={() => undefined}
            small
          />
          <Datepicker
            label="Disabled"
            localeCode={lang}
            // name="date"
            placeholder="d. mmm. yyyy"
            dateFormat="d. MMM yyyy"
            // value={undefined}
            onChange={() => undefined}
            disabled
          />
          <Datepicker
            label="Read only"
            localeCode={lang}
            // name="date"
            placeholder="d. mmm. yyyy"
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
  extras: async ({ page, localScreenshot, pageScreenshot, project }) => {
    await page.getByLabel('Normal').click();
    await pageScreenshot('opened');

    if (project === 'firefox-wide') {
      const datepicker = page.locator('.react-datepicker');

      await datepicker
        .locator('span:text-is("október"), span:text-is("Október")')
        .hover();
      await localScreenshot(datepicker, 'dp-hover-month', { margin: -1 });

      await datepicker.locator('.react-datepicker__day:text-is("5") >> nth=0').hover();
      await localScreenshot(datepicker, 'dp-hover-today', { margin: -1 });

      await datepicker.locator('.react-datepicker__day:text-is("21") >> nth=0').hover();
      await localScreenshot(datepicker, 'dp-hover-weekday', { margin: -1 });

      await datepicker.locator('.react-datepicker__day:text-is("22") >> nth=0').hover();
      await localScreenshot(datepicker, 'dp-hover-weekend', { margin: -1 });

      await page.keyboard.press('Escape'); // close the calendar before focusing

      await focusAllFormFields(page);
      await pageScreenshot('allFocused');
    }
  },
};
