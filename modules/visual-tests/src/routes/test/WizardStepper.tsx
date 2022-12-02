/* eslint-disable no-await-in-loop */
import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { WizardStepper } from '@reykjavik/hanna-react/WizardStepper';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

const noop = () => undefined;

export default function () {
  return (
    <Minimal>
      <WizardStepper
        steps={[
          { label: 'Past, Clickable', clickable: true },
          { label: 'Past, Clickable, not done', clickable: true, done: false },
          { label: 'Past, Not clickable' },
          { label: 'Past, Not clickable, not done', done: false },
          {
            // the active one (idx: 4)
            label: 'Current, Clickable, long text -- ' + lorem.medium,
            clickable: true,
          },

          { label: 'Future, Clickable, done', clickable: 'always', done: true },
          {
            label: 'Future, Clickable',
            clickable: 'always',
          },
          { label: 'Future, Not clickable, done', done: true },
          { label: '' },
        ]}
        activeStep={4}
        onClick={noop}
      />

      <DummyBlock thin />

      <WizardStepper
        steps={[
          { label: 'neutral', neutral: true },
          { label: 'one, done', done: true },
          { label: 'two' },
          { label: 'three' },
        ]}
        activeStep={1}
        onClick={noop}
      />

      <DummyBlock thin />

      <WizardStepper
        steps={[
          { label: 'neutral, not done', neutral: true, done: false },
          { label: 'one' },
          { label: 'two' },
        ]}
        activeStep={1}
        onClick={noop}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot }) => {
    const buttons = await page
      .locator('button.WizardStepper__step, a.WizardStepper__step')
      .elementHandles();

    for (const button of buttons) {
      const label = ((await button.textContent()) || '').split('--')[0]!.trim();

      await button.hover();
      await localScreenshot(button, `${label}-hover`, { margin: [0, 5] });
    }
  },
};
