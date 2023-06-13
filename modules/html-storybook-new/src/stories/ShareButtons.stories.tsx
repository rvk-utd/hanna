import React from 'react';
import { useIsServerSide } from '@hugsmidjan/react/hooks';
import { ShareButtons } from '@reykjavik/hanna-react/ShareButtons';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

type ControlProps = Record<
  | 'customLabel'
  | 'customButtonText'
  | 'facebook'
  | 'twitter'
  | 'linkedIn'
  | 'email'
  | 'customEmailSubject',
  boolean
>;

const meta: Meta<ControlProps> = {
  title: 'ShareButtons',
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
};
export default meta;

type Story = StoryObj<ControlProps>;

const ShareButtonsStory: React.FC<ControlProps> = ({
  customLabel,
  customButtonText,
  facebook,
  twitter,
  linkedIn,
  email,
  customEmailSubject,
}) => {
  // const showBrowserHTML = boolean('Show JavaScript rendered HTML', false);
  const label = customLabel ? 'Deila frétt' : undefined;
  const buttonLabel = customButtonText ? '${name} deiling' : undefined;

  const emailSubject = email && customEmailSubject ? 'Áhugaverð frétt' : undefined;

  const isServerSide = useIsServerSide();

  const key = [
    // showBrowserHTML,
    facebook,
    twitter,
    linkedIn,
    email,
    label,
    buttonLabel,
    emailSubject,
    isServerSide,
  ].join(',');

  const texts =
    label || buttonLabel || emailSubject
      ? { label, buttonLabel, emailSubject }
      : undefined;
  return (
    <ShareButtons
      key={key}
      facebook={facebook}
      twitter={twitter}
      linkedin={linkedIn}
      email={email}
      texts={texts}
      ssr={false}
      // ssr={isServerSide && !showBrowserHTML ? 'ssr-only' : false}
    />
  );
};

export const _ShareButtons: Story = {
  render: (args: ControlProps) => <ShareButtonsStory {...args} />,
  argTypes: {
    customLabel: {
      control: 'boolean',
      name: 'Custom label',
    },
    customButtonText: {
      control: 'boolean',
      name: 'Custom button text',
    },
    facebook: {
      control: 'boolean',
      name: 'Facebook (default)',
    },
    twitter: {
      control: 'boolean',
      name: 'Twitter (default)',
    },
    linkedIn: {
      control: 'boolean',
      name: 'LinkedIn (default)',
    },
    email: {
      control: 'boolean',
      name: 'E-mail',
    },
    customEmailSubject: {
      control: 'boolean',
      name: 'Custom e-mail subject',
      if: { arg: 'email', eq: true },
    },
  },
  args: {
    customLabel: false,
    customButtonText: false,
    facebook: true,
    twitter: true,
    linkedIn: false,
    email: false,
    customEmailSubject: false,
  },
};
