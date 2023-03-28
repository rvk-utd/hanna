import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Checkbox } from '@reykjavik/hanna-react/Checkbox';
import { RadioGroup } from '@reykjavik/hanna-react/RadioGroup';
import { RowBlock } from '@reykjavik/hanna-react/RowBlock';
import { RowBlockColumn } from '@reykjavik/hanna-react/RowBlockColumn';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';
import { cssTokens } from '../../utils/route.server';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('Checkbox', 'RadioGroup', 'RowBlock', 'RowBlockColumn');

export default function () {
  // alias here to appease PlayWright's weirdly limited build config
  const RadioGroup__Radio = RadioGroup.__Radio;

  return (
    <Minimal>
      <RowBlock>
        <RowBlockColumn>
          <Checkbox
            label={
              <Fragment>
                Normal <a href="">link</a>
              </Fragment>
            }
            checked={false}
            data-testid="normal"
          />
          <Checkbox label="Checked Normal" checked required data-testid="normalChecked" />
          <Checkbox
            label={
              <Fragment>
                Disabled <a href="">link</a>
              </Fragment>
            }
            disabled
            checked={false}
            data-testid="disabled"
          />
          <Checkbox label="Checked Disabled" disabled checked />
          <Checkbox
            label={
              <Fragment>
                Invalid <a href="">link</a>
              </Fragment>
            }
            invalid
            checked={false}
            required
            data-testid="invalid"
          />
          <Checkbox
            label="Checked Invalid"
            invalid
            checked
            data-testid="invalidChecked"
          />
          <Checkbox
            label="With error message"
            checked={false}
            errorMessage="Error message here"
          />
          <Checkbox label={lorem.short} />
        </RowBlockColumn>
        <RowBlockColumn>
          <RadioGroup__Radio label="Normal" checked={false} data-testid="normal" />
          <RadioGroup__Radio label="Checked Normal" checked data-testid="normalChecked" />
          <RadioGroup__Radio
            label="Disabled"
            disabled
            checked={false}
            data-testid="disabled"
          />
          <RadioGroup__Radio label="Checked Disabled" disabled checked />
          <RadioGroup__Radio
            label="Invalid"
            invalid
            checked={false}
            data-testid="invalid"
          />
          <RadioGroup__Radio
            label="Checked Invalid"
            invalid
            checked
            data-testid="invalidChecked"
          />
          <RadioGroup__Radio label={lorem.short} />
        </RowBlockColumn>
      </RowBlock>
      <style>{`
        .RowBlock { margin-bottom: 0; align-items: flex-start }
        .RowBlockColumn { padding-top: 16px; padding-bottom: 0; }
        .Radio { margin-bottom: .5em; }
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
      const normal = page.locator(`[data-testid="normal"] + .${type}__label`);
      const normalChecked = page.locator(
        `[data-testid="normalChecked"] + .${type}__label`
      );
      const disabled = page.locator('[data-testid="disabled"] + .' + type + '__label');
      const invalid = page.locator('[data-testid="invalid"] +.' + type + '__label');
      const invalidChecked = page.locator(
        '[data-testid="invalidChecked"] + .' + type + '__label'
      );

      for (const action of ['hover', 'focus'] as const) {
        // Hover things
        await normal[action]();
        await localScreenshot(normal, type + '-normal-' + action, { margin: 8 });

        await normalChecked[action]();
        await localScreenshot(normalChecked, type + '-checked-' + action, { margin: 8 });

        await invalid[action]();
        await localScreenshot(invalid, type + '-invalid-' + action, { margin: 8 });

        await invalidChecked[action]();
        await localScreenshot(invalidChecked, type + '-invalidchecked-' + action, {
          margin: 8,
        });
      }

      await disabled.hover();
      await localScreenshot(disabled, type + '-disabled-hover', { margin: 8 });

      if (type === 'Checkbox') {
        await normal.locator('a').hover();
        await localScreenshot(normal, type + '-normal-hover-link', { margin: 8 });

        await invalid.locator('a').hover();
        await localScreenshot(invalid, type + '-invalid-hover-link', { margin: 8 });

        await disabled.locator('a').hover();
        await localScreenshot(disabled, type + '-disabled-hover-link', { margin: 8 });
      }
    }
    /* eslint-enable no-await-in-loop */
  },
};
