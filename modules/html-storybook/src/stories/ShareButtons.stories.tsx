import React from 'react';
import { ShareButtons } from '@reykjavik/hanna-react/ShareButtons';
import { useIsServerSide } from '@reykjavik/hanna-react/utils';
import { Meta, StoryObj } from '@storybook/react';

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
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const ShareButtonsStory = (props: ControlProps) => {
  const {
    customLabel,
    customButtonText,
    facebook,
    twitter,
    linkedIn,
    email,
    customEmailSubject,
  } = props;
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

export const _ShareButtons: StoryObj<ControlProps> = {
  render: (args) => <ShareButtonsStory {...args} />,
  argTypes: {
    customLabel: { name: 'Custom label' },
    customButtonText: { name: 'Custom button text' },
    facebook: { name: 'Facebook (default)' },
    twitter: { name: 'Twitter (default)' },
    linkedIn: { name: 'LinkedIn (default)' },
    email: { name: 'E-mail' },
    customEmailSubject: {
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
