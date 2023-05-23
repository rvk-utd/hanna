import React, { useEffect, useState } from 'react';
import { WizardStepper, WizardStepperStep } from '@reykjavik/hanna-react/WizardStepper';
import { optionsKnob } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof WizardStepper> = {
  title: 'WizardStepper',
  component: WizardStepper,
};
export default meta;

type Story = StoryObj<typeof WizardStepper>;

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

const WizardStepperComponent = () => {
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
      disableBacktrack={false}
    />
  );
};

export const _WizardStepper: Story = {
  render: () => <WizardStepperComponent />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  argTypes: {
    activeStep: {
      options: ['None', 'Intro', 'Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
      control: { type: 'radio' },
    },
    allowForwardSkip: {
      table: {
        disable: true,
      },
    },
    steps: {
      table: {
        disable: true,
      },
    },
    disableBacktrack: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
};
