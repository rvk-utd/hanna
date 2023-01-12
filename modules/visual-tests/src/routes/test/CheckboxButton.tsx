import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import CheckboxButton from '@reykjavik/hanna-react/CheckboxButton';
import { RowBlock } from '@reykjavik/hanna-react/RowBlock';
import { RowBlockColumn } from '@reykjavik/hanna-react/RowBlockColumn';

import { Minimal } from '../../layout/Minimal';
import { lorem, loremRT } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = {
  cssTokens: ['Checkbox', 'RadioGroup', 'RowBlock', 'RowBlockColumn'],
};

export default function () {
  return (
    <Minimal>
      <RowBlock>
        <RowBlockColumn>
          <CheckboxButton
            label={
              <Fragment>
                Normal <a href="">link</a> <small>Extra info</small>
              </Fragment>
            }
            checked={false}
            data-testid="normal"
          />
          <CheckboxButton
            label="Checked Normal"
            checked
            required
            data-testid="normalChecked"
          />
          <CheckboxButton
            label={
              <Fragment>
                Disabled <a href="">link</a>
              </Fragment>
            }
            disabled
            checked={false}
            data-testid="disabled"
          />
          <CheckboxButton label="Checked Disabled" disabled checked />
        </RowBlockColumn>
        <RowBlockColumn>
          <CheckboxButton
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
          <CheckboxButton
            label="Checked Invalid"
            invalid
            checked
            data-testid="invalidChecked"
          />
          <CheckboxButton
            label="With error message"
            checked={false}
            errorMessage="Error message here"
          />
          <CheckboxButton
            label={
              <Fragment>
                {lorem.short} <small>{loremRT.short()}</small>
              </Fragment>
            }
          />
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

    const normal = page.locator('[data-testid="normal"] + .CheckboxButton__label');
    const normalChecked = page.locator(
      '[data-testid="normalChecked"] + .CheckboxButton__label'
    );
    const disabled = page.locator('[data-testid="disabled"] + .CheckboxButton__label');
    const invalid = page.locator('[data-testid="invalid"] + .CheckboxButton__label');
    const invalidChecked = page.locator(
      '[data-testid="invalidChecked"] + .CheckboxButton__label'
    );

    /* eslint-disable no-await-in-loop */
    for (const action of ['hover', 'focus'] as const) {
      // Hover things
      await normal[action]();
      await localScreenshot(normal, 'CheckboxButton-normal-' + action, { margin: 8 });

      await normalChecked[action]();
      await localScreenshot(normalChecked, 'CheckboxButton-checked-' + action, {
        margin: 8,
      });

      await invalid[action]();
      await localScreenshot(invalid, 'CheckboxButton-invalid-' + action, { margin: 8 });

      await invalidChecked[action]();
      await localScreenshot(invalidChecked, 'CheckboxButton-invalidchecked-' + action, {
        margin: 8,
      });
    }
    /* eslint-enable no-await-in-loop */

    await disabled.hover();
    await localScreenshot(disabled, 'CheckboxButton-disabled-hover', { margin: 8 });

    await normal.locator('a').hover();
    await localScreenshot(normal, 'CheckboxButton-normal-hover-link', { margin: 8 });

    await invalid.locator('a').hover();
    await localScreenshot(invalid, 'CheckboxButton-invalid-hover-link', { margin: 8 });

    await disabled.locator('a').hover();
    await localScreenshot(disabled, 'CheckboxButton-disabled-hover-link', {
      margin: 8,
    });
  },
};
