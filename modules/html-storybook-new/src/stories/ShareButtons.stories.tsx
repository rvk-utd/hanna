import React from 'react';
import { useIsServerSide } from '@hugsmidjan/react/hooks';
import { ShareButtons } from '@reykjavik/hanna-react/ShareButtons';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ShareButtons> = {
  title: 'ShareButtons',
  component: ShareButtons,
};
export default meta;

type Story = StoryObj<typeof ShareButtons>;

const Component = () => {
  // const showBrowserHTML = boolean('Show JavaScript rendered HTML', false);
  const label = boolean('Custom label', false) ? 'Deila frétt' : undefined;
  const buttonLabel = boolean('Custom button text', false)
    ? '${name} deiling'
    : undefined;

  const facebook = boolean('Facebook (default)', true);
  const twitter = boolean('Twitter (default)', true);
  const linkedin = boolean('LinkedIn', false);
  const email = boolean('E-mail', false);
  const emailSubject =
    email && boolean('Custom e-mail subject', false) ? 'Áhugaverð frétt' : undefined;

  const isServerSide = useIsServerSide();

  const key = [
    // showBrowserHTML,
    facebook,
    twitter,
    linkedin,
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
      linkedin={linkedin}
      email={email}
      texts={texts}
      ssr={false}
      // ssr={isServerSide && !showBrowserHTML ? 'ssr-only' : false}
    />
  );
};

export const _ShareButtons: Story = {
  render: () => <Component />,
};
