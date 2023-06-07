import React from 'react';
import { useIsServerSide } from '@hugsmidjan/react/hooks';
import { ShareButtons } from '@reykjavik/hanna-react/ShareButtons';
import { Meta, StoryObj } from '@storybook/react';

type ShareButtonsControlProps = {
  customLabel: boolean;
  customButtonText: boolean;
  facebook: boolean;
  twitter: boolean;
  linkedIn: boolean;
  email: boolean;
  customEmailSubject: boolean;
};

const meta: Meta<ShareButtonsControlProps> = {
  title: 'ShareButtons',
};
export default meta;

type Story = StoryObj<ShareButtonsControlProps>;

const ShareButtonsStory: React.FC<ShareButtonsControlProps> = ({
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
  render: (args: ShareButtonsControlProps) => <ShareButtonsStory {...args} />,
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
