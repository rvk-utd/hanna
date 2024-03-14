import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Datepicker, DatepickerProps } from '@reykjavik/hanna-react/Datepicker';
import { RowBlock } from '@reykjavik/hanna-react/RowBlock';
import { RowBlockColumn } from '@reykjavik/hanna-react/RowBlockColumn';

import { Minimal } from '../../layout/Minimal.js';
import { lorem } from '../../test-helpers/dummyData.js';
import { focusAllFormFields } from '../../test-helpers/focusAllFormFields.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

export const meta: V2_MetaFunction = autoTitle;

const startDate = new Date('2022-10-05');

const lang: DatepickerProps['localeCode'] = undefined;

// Use `handle` if you're using multiple Hanna compnents
export const handle = { lang, ...cssTokens('RowBlock', 'RowBlockColumn') };

export default function () {
  return (
    <Minimal>
      <RowBlock>
        <RowBlockColumn>
          <Datepicker
            label="Normal"
            lang={lang}
            // name="date"
            // isoMode
            placeholder="d. mmm. yyyy"
            dateFormat="d. MMM yyyy"
            defaultValue={startDate}
            onChange={(newDate) => console.info('new date:', newDate)}
            required
          />
          <Datepicker
            label="Error"
            lang={lang}
            // name="date"
            placeholder="d. mmm. yyyy"
            dateFormat="d. MMM yyyy"
            value={startDate}
            invalid
          />
          <Datepicker
            label="Small"
            lang={lang}
            // name="date"
            placeholder="d. mmm. yyyy"
            dateFormat="d. MMM yyyy"
            // value={startDate}
            small
          />
          <Datepicker
            label="Disabled"
            lang={lang}
            // name="date"
            placeholder="d. mmm. yyyy"
            dateFormat="d. MMM yyyy"
            // value={startDate}
            disabled
          />
          <Datepicker
            label="Read only"
            lang={lang}
            // name="date"
            placeholder="d. mmm. yyyy"
            dateFormat="d. MMM yyyy"
            // value={startDate}
            readOnly
          />

          <Datepicker
            label={lorem.medium}
            lang={lang}
            // name="date"
            placeholder="d. mmm. yyyy"
            dateFormat="d. MMM yyyy"
            // value={startDate}
          />
          <Datepicker
            label={lorem.short}
            lang={lang}
            small
            // name="date"
            placeholder="d. mmm. yyyy"
            dateFormat="d. MMM yyyy"
            // value={startDate}
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
  extras: async ({ page, localScreenshot, pageScreenshot, mediaFormat }) => {
    await page.getByLabel('Normal').click();
    await pageScreenshot('opened');

    if (mediaFormat('wide')) {
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
