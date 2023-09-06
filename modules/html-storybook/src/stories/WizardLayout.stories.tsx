import React from 'react';
import { Alert } from '@reykjavik/hanna-react/Alert';
import { WizardLayout } from '@reykjavik/hanna-react/WizardLayout';
import { WizardLayoutClose } from '@reykjavik/hanna-react/WizardLayoutClose';
import { WizardStepper } from '@reykjavik/hanna-react/WizardStepper';
import { Meta, StoryObj } from '@storybook/react';

type ControlProps = {
  globalAlertsContainer: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'Layout/WizardLayout',
  argTypes: {
    globalAlertsContainer: { name: 'Global alerts container' },
  },
  args: {
    globalAlertsContainer: false,
  },
  parameters: {
    layout: { disabled: true },
    // viewport: { defaultViewport: 'phone' },
    css: { tokens: 'WizardLayout', noLayout: true },
  },
};
export default meta;

// =================== Minimal Wizard Layout ========================================

const MinimalWizardLayoutStory: React.FC<ControlProps> = ({ globalAlertsContainer }) => {
  // TODO: Check if 'globalAlertsContainer' is connected
  const globalAlerts = globalAlertsContainer;
  return <WizardLayout key={'' + globalAlerts} globalAlerts={globalAlerts && ' '} />;
};

export const _MinimalWizardLayout: StoryObj<ControlProps> = {
  render: (args) => <MinimalWizardLayoutStory {...args} />,
  argTypes: {},
  args: {},
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

export const _WizardLayoutWithContent: StoryObj<ControlProps> = {
  render: (args) => <WizardLayoutWithContentStory {...args} />,
  argTypes: {},
  args: {},
  parameters: {
    css: { tokens: 'WizardLayout-full' },
  },
};
