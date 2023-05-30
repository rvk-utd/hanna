import React from 'react';
import { PageHeading } from '@reykjavik/hanna-react/PageHeading';
import { boolean, optionsKnob } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PageHeading> = {
  title: 'text/PageHeading',
  component: PageHeading,
};
export default meta;

type Story = StoryObj<typeof PageHeading>;

const PageHeadingStory = () => {
  const htmlTag =
    optionsKnob('Heading level', { 'H1 (default)': '', H2: 'h2' }, '', {
      display: 'inline-radio',
    }) || undefined;
  const align = boolean('Right-aligned', false) ? 'right' : undefined;
  const small = boolean('Small', false) || undefined;
  return (
    <PageHeading Tag={htmlTag} align={align} small={small} startSeen>
      Page Heading Title
    </PageHeading>
  );
};

export const _PageHeading: Story = {
  render: () => <PageHeadingStory />,
};
