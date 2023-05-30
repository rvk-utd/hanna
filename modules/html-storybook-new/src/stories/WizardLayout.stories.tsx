import React from 'react';
import { Alert } from '@reykjavik/hanna-react/Alert';
import { WizardLayout } from '@reykjavik/hanna-react/WizardLayout';
import { WizardLayoutClose } from '@reykjavik/hanna-react/WizardLayoutClose';
import { WizardStepper } from '@reykjavik/hanna-react/WizardStepper';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

const meta: Meta<typeof WizardLayout> = {
  title: 'Layout/WizardLayout',
  component: WizardLayout,
  parameters: {
    knobs: { disabled: false },
    layout: { disabled: true },
    // viewport: { defaultViewport: 'phone' },
    css: { noLayout: true },
  } as StoryParameters,
};
export default meta;

type Story = StoryObj<typeof WizardLayout>;

const MinimalWizardLayoutComponent = () => {
  const globalAlerts = boolean('Global alerts container', false);
  return <WizardLayout key={'' + globalAlerts} globalAlerts={globalAlerts && ' '} />;
};

export const _MinimalWizardLayout: Story = {
  render: () => <MinimalWizardLayoutComponent />,
};

const steps = [
  {
    label: 'Fyrir hvern er viðtalið?',
    clickable: true,
  },
  {
    label: 'Ástæða viðtals (not clickable)',
  },
  {
    label: 'Bæta við gögnum',
    clickable: true,
  },
  {
    label: 'Við höfum samband',
    clickable: true,
  },
];

const WizardLayoutWithContentStory = () => {
  const globalAlerts = boolean('Global alerts container', false);
  return (
    <WizardLayout
      key={'' + globalAlerts}
      globalAlerts={
        globalAlerts && (
          <>
            <Alert type="warning" closable>
              Some warning
            </Alert>
            <Alert type="critical" closable>
              Some critical alert
            </Alert>
          </>
        )
      }
      wizardStepper={
        <WizardStepper steps={steps} activeStep={0} onClick={() => undefined} />
      }
      wizardFooter={
        <WizardLayoutClose onClick={() => undefined}>Hætta</WizardLayoutClose>
      }
    >
      <p style={{ height: '200vh' }}>Form</p>
    </WizardLayout>
  );
};

export const _WizardLayoutWithContent: Story = {
  render: () => <WizardLayoutWithContentStory />,
  parameters: {
    css: {
      tokens: 'WizardLayout-full',
    },
  },
};
