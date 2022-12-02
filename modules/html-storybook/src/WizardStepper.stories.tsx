import React, { useEffect, useState } from 'react';
import { WizardStepper, WizardStepperStep } from '@reykjavik/hanna-react/WizardStepper';
import { optionsKnob } from '@storybook/addon-knobs';

import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'WizardStepper',
  parameters: {
    knobs: { disabled: false },
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};

const steps: Array<WizardStepperStep> = [
  {
    label: 'Inngangur',
    clickable: true,
    neutral: true,
  },
  {
    label: 'Ástæða viðtals (never clickable)',
  },
  {
    label: 'Bæta við gögnum',
    clickable: true,
  },
  {
    label: 'Við höfum samband',
    clickable: true,
  },
  {
    label: 'Aðeins meira (custom "done" status)',
    clickable: true,
    done: true,
  },
  {
    label: 'Staðfesting (always clickable)',
    clickable: 'always',
  },
];

const demoSteps: Record<string, string> = {
  None: 'none',
};
for (let i = 0; i < steps.length; i++) {
  demoSteps[i ? 'Step ' + i : 'Intro'] = String(i);
}

export const _WizardStepper: StoryComponent = () => {
  let activeStepFromKnob: number | undefined = Number(
    optionsKnob('Active step', demoSteps, '1', { display: 'inline-radio' })
  );
  if (isNaN(activeStepFromKnob)) {
    activeStepFromKnob = undefined;
  }

  const [activeStep, setActiveStep] = useState(activeStepFromKnob);
  useEffect(() => {
    setActiveStep(activeStepFromKnob);
  }, [activeStepFromKnob]);

  return (
    <WizardStepper
      steps={steps}
      activeStep={activeStep}
      onClick={setActiveStep}
      allowForwardSkip={false}
      disableBacktrack={false} // default
    />
  );
};
