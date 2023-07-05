import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Multiselect, MultiselectProps } from '@reykjavik/hanna-react/Multiselect';
import { ObjectEntries } from '@reykjavik/hanna-utils';

import { Minimal } from '../../layout/Minimal.js';
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
const optsShort = opts.slice(0, 4);
const optsFew = opts.slice(5, 7);

const multiselects: Record<string, MultiselectProps> = {
  empty: {
    label: 'Empty',
    options: optsShort,
  },
  small: {
    label: 'Small',
    options: optsLong,
    defaultValue: optsLong,
    nowrap: true,
    small: true,
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
  extras: async ({ page, pageScreenshot, project }) => {
    if (project === 'firefox-wide' || project === 'firefox-phone') {
      const id1 = 'empty';
      const togglerButton = page.locator(`button#toggler:${id1}`);
      await togglerButton.click({ force: true });
      await pageScreenshot(`${id1}-open`);

      const id2 = 'normal';
      const searchInput = page.locator(`input#toggler:${id2}`);
      await searchInput.click({ force: true });
      await searchInput.type('a');
      await pageScreenshot(`${id2}-open`);

      for (const id of ['empty', 'normal']) {
        const toggler = page.locator(`#toggler:${id}`);
        // const formfield = toggler.locator('closest=.FormField');

        await toggler.click({ force: true });
        await pageScreenshot(`${id}-open`);
      }
      /* eslint-enable no-await-in-loop */
    }
  },
};
