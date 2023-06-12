import React from 'react';
import { SubHeading } from '@reykjavik/hanna-react/SubHeading';
import { Meta, StoryObj } from '@storybook/react';

const layoutOptions = ['left', 'right', 'wide'] as const;
type Layout = (typeof layoutOptions)[number];

const headingLevelOptions = ['h2', 'h3'] as const;
type HeadingLevel = (typeof headingLevelOptions)[number];

type ControlProps = {
  layout: Layout;
  small: boolean;
  headingLevel: HeadingLevel;
};

const meta: Meta<ControlProps> = {
  title: 'text/SubHeading',
};
export default meta;

type Story = StoryObj<ControlProps>;

const SubHeadingStory: React.FC<ControlProps> = ({ layout, small, headingLevel }) => {
  const _layout = layout !== 'left' ? layout : undefined;

  const layoutProps = _layout === 'wide' ? { wide: true } : { align: _layout };

  const _small = small || undefined;

  const htmlTag = headingLevel !== 'h2' ? headingLevel : undefined;
  return (
    <SubHeading {...layoutProps} small={_small} Tag={htmlTag} startSeen>
      Subheading title
    </SubHeading>
  );
};

export const _SubHeading: Story = {
  render: (args: ControlProps) => <SubHeadingStory {...args} />,
  argTypes: {
    layout: {
      control: {
        type: 'inline-radio',
        labels: {
          left: 'Left',
          right: 'Right aligned',
          wide: 'Wide',
        },
      },
      options: layoutOptions,
      name: 'Layout',
    },
    small: {
      control: 'boolean',
      name: 'Small',
    },
    headingLevel: {
      control: {
        type: 'inline-radio',
        labels: {
          h2: 'H2 (default)',
          h3: 'H3',
        },
      },
      options: headingLevelOptions,
      name: 'Heading level',
    },
  },
  args: {
    layout: 'left',
    small: false,
    headingLevel: 'h2',
  },
};
