import React from 'react';
import { Heading } from '@reykjavik/hanna-react/Heading';
import { Meta, StoryObj } from '@storybook/react';

type HeadingControlProps = {
  layout: 'left' | 'right' | 'wide';
  sizeVariant: 'normal' | 'small' | 'large';
  headingLevel: 'h2' | 'h3';
};

const meta: Meta<HeadingControlProps> = {
  title: 'text/Heading',
};
export default meta;

type Story = StoryObj<HeadingControlProps>;

const HeadingStory: React.FC<HeadingControlProps> = ({
  layout,
  sizeVariant,
  headingLevel,
}) => {
  const _layout = layout !== 'left' ? layout : undefined;
  const size = sizeVariant !== 'normal' ? sizeVariant : undefined;

  const htmlTag = headingLevel !== 'h2' ? headingLevel : undefined;

  const layoutProps = _layout === 'wide' ? { wide: true } : { align: _layout };
  return (
    <Heading {...layoutProps} size={size} Tag={htmlTag}>
      Heading title
    </Heading>
  );
};

export const _Heading: Story = {
  render: (args: HeadingControlProps) => <HeadingStory {...args} />,
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
    sizeVariant: {
      control: {
        type: 'inline-radio',
        labels: {
          normal: 'Normal (medium)',
          small: 'Small',
          large: 'Large',
        },
      },
      options: ['normal', 'small', 'large'],
      name: 'Size variant',
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
    sizeVariant: 'normal',
    headingLevel: 'h2',
  },
};
