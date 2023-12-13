import React, { Fragment } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Checkbox } from '@reykjavik/hanna-react/Checkbox';
import { Radio } from '@reykjavik/hanna-react/Radio';
import { RowBlock } from '@reykjavik/hanna-react/RowBlock';
import { RowBlockColumn } from '@reykjavik/hanna-react/RowBlockColumn';

import { Minimal } from '../../layout/Minimal.js';
import { lorem } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('Checkbox', 'RadioGroup', 'RowBlock', 'RowBlockColumn');

export default function () {
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
          <Radio label="Normal" checked={false} data-testid="normal" />
          <Radio label="Checked Normal" checked required data-testid="normalChecked" />
          <Radio label="Disabled" disabled checked={false} data-testid="disabled" />
          <Radio label="Checked Disabled" disabled checked />
          <Radio label="Invalid" invalid required checked={false} data-testid="invalid" />
          <Radio
            label="Checked Invalid"
            invalid
            checked
            data-testid="invalidChecked"
            errorMessage="Error message here"
          />
          <Radio label={lorem.short} />
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
  extras: async ({ page, localScreenshot, mediaFormat }) => {
    if (!mediaFormat('wide') && !mediaFormat('phone')) {
      return;
    }

    /* eslint-disable no-await-in-loop */
    for (const type of ['Checkbox', 'Radio'] as const) {
      const normal = page.locator(`[data-testid="normal"] + .${type}__label`);
      const normalChecked = page.locator(
        `[data-testid="normalChecked"] + .${type}__label`
      );
      const disabled = page.locator(`[data-testid="disabled"] + .${type}__label`);
      const invalid = page.locator(`[data-testid="invalid"] +.${type}__label`);
      const invalidChecked = page.locator(
        `[data-testid="invalidChecked"] + .${type}__label`
      );

      for (const action of ['hover', 'focus'] as const) {
        // Hover things
        await normal[action]();
        await localScreenshot(normal, `${type}-normal-${action}`, { margin: 8 });

        await normalChecked[action]();
        await localScreenshot(normalChecked, `${type}-checked-${action}`, { margin: 8 });

        await invalid[action]();
        await localScreenshot(invalid, `${type}-invalid-${action}`, { margin: 8 });

        await invalidChecked[action]();
        await localScreenshot(invalidChecked, `${type}-invalidchecked-${action}`, {
          margin: 8,
        });
      }

      await disabled.hover();
      await localScreenshot(disabled, `${type}-disabled-hover`, { margin: 8 });

      if (type === 'Checkbox') {
        await normal.locator('a').hover();
        await localScreenshot(normal, `${type}-normal-hover-link`, { margin: 8 });

        await invalid.locator('a').hover();
        await localScreenshot(invalid, `${type}-invalid-hover-link`, { margin: 8 });

        await disabled.locator('a').hover();
        await localScreenshot(disabled, `${type}-disabled-hover-link`, { margin: 8 });
      }
    }
    /* eslint-enable no-await-in-loop */
  },
};
