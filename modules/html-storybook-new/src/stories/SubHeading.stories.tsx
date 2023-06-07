import React from 'react';
import { SubHeading } from '@reykjavik/hanna-react/SubHeading';
import { Meta, StoryObj } from '@storybook/react';

type SubHeadingControlProps = {
  layout: 'left' | 'right' | 'wide';
  small: boolean;
  headingLevel: 'h2' | 'h3';
};

const meta: Meta<SubHeadingControlProps> = {
  title: 'text/SubHeading',
};
export default meta;

type Story = StoryObj<SubHeadingControlProps>;

const SubHeadingStory: React.FC<SubHeadingControlProps> = ({
  layout,
  small,
  headingLevel,
}) => {
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
  render: (args: SubHeadingControlProps) => <SubHeadingStory {...args} />,
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
      options: ['left', 'right', 'wide'],
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
      options: ['h2', 'h3'],
      name: 'Heading level',
    },
  },
  args: {
    layout: 'left',
    small: false,
    headingLevel: 'h2',
  },
};
