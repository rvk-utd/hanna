import React from 'react';
import { Alert } from '@reykjavik/hanna-react/Alert';
import { WizardLayout } from '@reykjavik/hanna-react/WizardLayout';
import { WizardLayoutClose } from '@reykjavik/hanna-react/WizardLayoutClose';
import { WizardStepper } from '@reykjavik/hanna-react/WizardStepper';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

type ControlProps = {
  globalAlertsContainer: boolean;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'Layout/WizardLayout',
  parameters: {
    knobs: { disabled: false },
    layout: { disabled: true },
    // viewport: { defaultViewport: 'phone' },
    css: { noLayout: true },
  } as StoryParameters,
};
export default meta;

const argTypes = {
  globalAlertsContainer: {
    control: 'boolean',
    name: 'Global alerts container',
  },
};

const args: ControlProps = {
  globalAlertsContainer: false,
};

// =================== Minimal Wizard Layout ========================================

const MinimalWizardLayoutStory: React.FC<ControlProps> = ({ globalAlertsContainer }) => {
  // TODO: Check if 'globalAlertsContainer' is connected
  const globalAlerts = globalAlertsContainer;
  return <WizardLayout key={'' + globalAlerts} globalAlerts={globalAlerts && ' '} />;
};

export const _MinimalWizardLayout: Story = {
  render: (args: ControlProps) => <MinimalWizardLayoutStory {...args} />,
  argTypes: argTypes,
  args: args,
  parameters: {
    css: {
      tokens: 'WizardLayout',
    },
  },
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

// =================== Wizard Layout With Content ========================================

const WizardLayoutWithContentStory: React.FC<ControlProps> = ({
  globalAlertsContainer,
}) => {
  const globalAlerts = globalAlertsContainer;
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
  render: (args: ControlProps) => <WizardLayoutWithContentStory {...args} />,
  argTypes: argTypes,
  args: args,
  parameters: {
    css: {
      tokens: 'WizardLayout-full',
    },
  },
};
