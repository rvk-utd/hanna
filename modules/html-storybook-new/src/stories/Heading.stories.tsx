import React from 'react';
import { Heading } from '@reykjavik/hanna-react/Heading';
import { Meta, StoryObj } from '@storybook/react';

const layoutOptions = ['left', 'right', 'wide'] as const;
type Layout = (typeof layoutOptions)[number];

const sizeVariantOptions = ['normal', 'small', 'large'] as const;
type SizeVariant = (typeof sizeVariantOptions)[number];

const headingLevelOptions = ['h2', 'h3'] as const;
type HeadingLevel = (typeof headingLevelOptions)[number];

type ControlProps = {
  layout: Layout;
  sizeVariant: SizeVariant;
  headingLevel: HeadingLevel;
};

const meta: Meta<ControlProps> = {
  title: 'text/Heading',
};
export default meta;

type Story = StoryObj<ControlProps>;

const HeadingStory: React.FC<ControlProps> = ({ layout, sizeVariant, headingLevel }) => {
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
  render: (args: ControlProps) => <HeadingStory {...args} />,
  argTypes: {
    layout: {
      control: {
        type: 'inline-radio',
        labels: {
          left: 'Left',
          right: 'Right aligned',
          wide: 'Wide',
        } satisfies Record<Layout, string>,
      },
      options: layoutOptions,
      name: 'Layout',
    },
    sizeVariant: {
      control: {
        type: 'inline-radio',
        labels: {
          normal: 'Normal (medium)',
          small: 'Small',
          large: 'Large',
        } satisfies Record<SizeVariant, string>,
      },
      options: sizeVariantOptions,
      name: 'Size variant',
    },
    headingLevel: {
      control: {
        type: 'inline-radio',
        labels: {
          h2: 'H2 (default)',
          h3: 'H3',
        } satisfies Record<HeadingLevel, string>,
      },
      options: headingLevelOptions,
      name: 'Heading level',
    },
  },
  args: {
    layout: 'left',
    sizeVariant: 'normal',
    headingLevel: 'h2',
  },
};
