import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import WizardStepper, { WizardStepperStep } from '@reykjavik/hanna-react/WizardStepper';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const ACTIVE_STEP = 1;

const steps: Array<WizardStepperStep> = [
  { label: 'Inngangur - neutral', clickable: false, done: false, neutral: true },
  { label: 'Step 1 - done', clickable: false, done: true },
  {
    label: 'Step 2 - clickable with a bit more text than the previous step',
    clickable: true,
    done: false,
  },
  { label: 'Step 3 - clickable', clickable: true, done: false },
  { label: 'Step 4', clickable: false, done: false },
  { label: '', clickable: false, done: false },
  {
    label: 'Staðfesting (always clickable)',
    clickable: 'always',
  },
];

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <br />
      <WizardStepper
        steps={steps}
        activeStep={Math.floor(steps.length / 2)}
        onClick={() => {
          ('');
        }}
      />
      <DummyBlock thin />
      <br />
      <WizardStepper
        steps={steps.slice(0, ACTIVE_STEP + 1)}
        activeStep={ACTIVE_STEP}
        onClick={() => {
          ('');
        }}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  tags: ['chrome'],
  __DEV_FOCUS__: true,
  extras: async ({ page, pageScreenshot, localScreenshot }) => {
    const stepTwo = page.locator('.WizardStepper__step:text("Step 2")');
    const alwaysClickable = page.locator('.WizardStepper__step:text("always clickable")');
    const notClickable = page.locator('.WizardStepper__step:text("Step 4")');

    await stepTwo.focus();
    await pageScreenshot('wizardStepper-focus');

    await alwaysClickable.click();
    await pageScreenshot('alwaysClickable-click');

    await stepTwo.hover();
    await pageScreenshot('wizardStepper-hover');

    await notClickable.hover({ force: true });
    await localScreenshot(notClickable, 'notClickable-hover', { margin: true });
  },
};
