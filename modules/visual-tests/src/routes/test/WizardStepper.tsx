/* eslint-disable no-await-in-loop */
import React from 'react';
import { Locator } from '@playwright/test';
import type { MetaFunction } from '@remix-run/node';
import WizardStepper, { WizardStepperStep } from '@reykjavik/hanna-react/WizardStepper';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const ACTIVE_STEP = 2;

const steps: Array<WizardStepperStep> = [
  { label: 'Inngangur - neutral', clickable: false, done: false, neutral: true },
  { label: 'Not clickable and done', clickable: false, done: true },
  {
    label: 'Long clickable text - ' + lorem.medium,
    clickable: true,
    done: false,
  },

  { label: 'Clickable', clickable: true, done: false },
  { label: 'Not clickable', clickable: false, done: true },
  { label: '', clickable: false, done: false },
  {
    label: 'Always clickable',
    clickable: 'always',
  },
];

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <br />
      <WizardStepper steps={steps} activeStep={ACTIVE_STEP} onClick={() => ''} />
      <DummyBlock thin />
      <br />
      <WizardStepper
        steps={steps.slice(0, ACTIVE_STEP + 1)}
        activeStep={ACTIVE_STEP - 1}
        onClick={() => {
          ('');
        }}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot }) => {
    const neutral = page.locator('.WizardStepper__step--neutral >> nth = 0');
    const activeClickable = page.locator(
      '.WizardStepper__step:text("Long clickable") >> nth = 0'
    );
    const clickable = page.locator('.WizardStepper__step:text-is("Clickable")');
    const alwaysClickable = page.locator(
      '.WizardStepper__step:text-is("Always clickable")'
    );
    // Hover/focus/click not clickable ?
    // const notClickable = page.locator('');

    const testItems = [
      { loc: neutral, name: 'neutral' },
      { loc: activeClickable, name: 'activeClickable' },
      { loc: alwaysClickable, name: 'alwaysClickable' },
      { loc: clickable, name: 'clickable' },
    ];

    const test = async (item: Locator, name: string) => {
      await item.hover({ force: true });
      await localScreenshot(item, name + '-hover', { margin: true });

      await page.mouse.move(0, 0);

      await item.focus();
      await localScreenshot(item, name + '-focus', { margin: true });
    };

    let i = 0;
    let item: typeof testItems[number] | undefined;
    while ((item = testItems[i++])) {
      await test(item.loc, item.name);
    }
  },
};
