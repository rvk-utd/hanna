import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Multiselect, MultiselectProps } from '@reykjavik/hanna-react/Multiselect';
import { ObjectEntries } from '@reykjavik/hanna-utils';

import { Minimal } from '../../layout/Minimal.js';
import { focusAllFormFields } from '../../test-helpers/focusAllFormFields.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

const opts = [
  'Apple',
  'Apricot',
  'Banana',
  'Blueberry',
  'Cherry',
  'Cranberry',
  'Date',
  'Durian',
  'Elderberry',
  'Eggplant',
  'Fig',
];
const optsLong = opts.flatMap((val) => [val, `${val} (crate)`]);
const testGrouping = true as boolean;
const optsShort = !testGrouping
  ? opts.slice(0, 4)
  : ['Apricot', 'Blueberry']
      .concat(opts.slice(0, 4))
      .map((value, i) => ({ value, group: i < 2 ? '' : undefined }));
const optsFew = opts.slice(5, 7);

const multiselects: Record<string, MultiselectProps> = {
  empty: {
    label: 'Empty',
    options: optsShort,
    forceSearchable: true,
  },
  small: {
    label: 'Small',
    options: optsLong,
    defaultValue: optsLong,
    nowrap: true,
    small: true,
    required: true,
  },
  normal: {
    label: 'Normal',
    options: optsLong,
    defaultValue: optsLong,
    nowrap: true,
  },
  placeholder: {
    label: 'Placeholder',
    options: opts,
    placeholder: 'This is a placeholder',
  },
  disabled: {
    label: 'Disabled',
    options: optsLong,
    defaultValue: optsFew,
    disabled: true,
  },
  readonly: {
    label: 'Readonly',
    options: opts,
    defaultValue: optsFew,
    readOnly: true,
  },
  invalid: {
    label: 'Invalid',
    options: opts,
    defaultValue: optsFew,
    invalid: true,
  },
};

const multiselectsToRender: Record<string, MultiselectProps> = {
  ...multiselects,
  smallPlaceholder: {
    label: 'Small w. placeholder',
    placeholder: 'This is a placeholder',
    options: opts,
    forceSearchable: true,
    small: true,
  },
  normalWrapped: {
    label: 'Normal Wrapped',
    options: optsLong,
    defaultValue: optsLong,
  },
};

export default function () {
  return (
    <Minimal>
      {ObjectEntries(multiselectsToRender).map(([id, props]) => (
        <Multiselect key={id} id={id} {...props} />
      ))}
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, pageScreenshot, mediaFormat, dumbHover }) => {
    if (mediaFormat('wide') || mediaFormat('phone')) {
      /* eslint-disable no-await-in-loop */
      for (const id of ['empty', 'normal']) {
        const toggler = page.locator(`[id="toggler:${id}"]`);
        const formfield = toggler.locator('closest=.FormField');

        await toggler.click({ force: true });
        // remvoe bulk of the pre-selected values, to clean up the screenshot
        const pillIdx = mediaFormat('phone') ? 6 : 11;
        await formfield
          .locator(`.TagPill:nth-child(n+${pillIdx})`)
          .evaluateAll((tagPills) => {
            tagPills.forEach((pill) => pill.remove());
          });
        await dumbHover(formfield.locator('.Multiselect__option:nth-child(2)'));
        await pageScreenshot(`${id}-open`);

        await page.keyboard.press('Escape');
      }
      /* eslint-enable no-await-in-loop */

      await focusAllFormFields(page);
      await pageScreenshot('focused');
    }
  },
};
