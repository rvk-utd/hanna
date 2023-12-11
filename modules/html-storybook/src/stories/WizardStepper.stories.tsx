import React, { useEffect, useState } from 'react';
import { WizardStepper, WizardStepperStep } from '@reykjavik/hanna-react/WizardStepper';
import { Meta, StoryObj } from '@storybook/react';

const stepsOptions = [
  'none',
  'intro',
  'step1',
  'step2',
  'step3',
  'step4',
  'step5',
] as const;
type SelectedStep = (typeof stepsOptions)[number];

type ControlProps = {
  selectedStep: SelectedStep;
};

const meta: Meta<ControlProps> = {
  title: 'WizardStepper',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

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
  demoSteps[i ? `Step ${i}` : 'Intro'] = String(i);
}

const getActiveStep = (activeStep: SelectedStep) => {
  const stepNumbers = {
    none: -1,
    intro: 0,
    step1: 1,
    step2: 2,
    step3: 3,
    step4: 4,
    step5: 5,
  };
  return stepNumbers[activeStep];
};

const WizardStepperStory: React.FC<ControlProps> = ({ selectedStep }) => {
  let activeStepFromKnob: number | undefined = getActiveStep(selectedStep);

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

export const _WizardStepper: StoryObj<ControlProps> = {
  render: (args) => <WizardStepperStory {...args} />,
  argTypes: {
    selectedStep: {
      name: 'Active step',
      options: stepsOptions,
      control: {
        type: 'inline-radio',
        labels: {
          none: 'None',
          intro: 'Intro',
          step1: 'Step 1',
          step2: 'Step 2',
          step3: 'Step 3',
          step4: 'Step 4',
          step5: 'Step 5',
        } satisfies Record<SelectedStep, string>,
      },
    },
  },
  args: {
    selectedStep: 'step1',
  },
};
