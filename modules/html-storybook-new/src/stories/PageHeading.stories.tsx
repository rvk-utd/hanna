import React from 'react';
import { PageHeading } from '@reykjavik/hanna-react/PageHeading';
import { Meta, StoryObj } from '@storybook/react';

const headingLevelOptions = ['h1', 'h2'] as const;
type HeadingLevel = (typeof headingLevelOptions)[number];

type ControlProps = {
  headingLevel: HeadingLevel;
  rightAligned: boolean;
  small: boolean;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'text/PageHeading',
};
export default meta;

const PageHeadingStory: React.FC<ControlProps> = ({
  headingLevel,
  rightAligned,
  small,
}) => {
  const htmlTag = headingLevel !== 'h1' ? headingLevel : undefined;
  const align = rightAligned ? 'right' : undefined;
  const _small = small || undefined;
  return (
    <PageHeading Tag={htmlTag} align={align} small={_small} startSeen>
      Page Heading Title
    </PageHeading>
  );
};

export const _PageHeading: Story = {
  render: (args: ControlProps) => <PageHeadingStory {...args} />,
  argTypes: {
    headingLevel: {
      control: {
        type: 'inline-radio',
        labels: {
          h1: 'H1 (default)',
          h2: 'H2',
        },
      },
      options: headingLevelOptions,
      name: 'Heading level',
    },
    rightAligned: {
      control: 'boolean',
      name: 'Right-aligned',
    },
    small: {
      control: 'boolean',
      name: 'Small',
    },
  },
  args: {
    headingLevel: 'h1',
    rightAligned: false,
    small: false,
  },
};
