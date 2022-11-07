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
      <style>{`
        .Radio {
          margin-bottom: .5em;
        }
      `}</style>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot, project }) => {
    if (project !== 'firefox-wide' && project !== 'firefox-phone') {
      return;
    }

    /* eslint-disable no-await-in-loop */
    for (const type of ['Checkbox', 'Radio'] as const) {
      const normal = page.locator('.' + type + '__label:text("Normal")');
      const checked = page.locator('.' + type + '__label:text("Checked") >> nth = 0');
      const disabled = page.locator('.' + type + '__label:text("Disabled") >> nth =0');
      const invalid = page.locator('.' + type + '__label:text("Invalid") >> nth =0');
      const invalidChecked = page.locator(
        '.' + type + '__label:text("Invalid + checked") >> nth =0'
      );
      for (const action of ['hover', 'focus'] as const) {
        // Hover things
        await normal[action]();
        await localScreenshot(normal, type + '-normal-' + action, { margin: 8 });

        await checked[action]();
        await localScreenshot(checked, type + '-checked-' + action, { margin: 8 });

        if (action !== 'focus') {
          await disabled[action]();
          await localScreenshot(disabled, type + '-disabled-' + action, { margin: 8 });
        }

        await invalid[action]();
        await localScreenshot(invalid, type + '-invalid-' + action, { margin: 8 });

        await invalidChecked[action]();
        await localScreenshot(invalidChecked, type + '-invalidchecked-' + action, {
          margin: 8,
        });
      }
    }
    /* eslint-enable no-await-in-loop */
  },
};
