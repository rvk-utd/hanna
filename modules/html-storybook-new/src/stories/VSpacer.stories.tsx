import React, { Fragment } from 'react';
import { VSpacer, VSpacerProps } from '@reykjavik/hanna-react/VSpacer';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';

const sizeOptions = ['small', 'default', 'large', 'x-large'] as const;
type Size = (typeof sizeOptions)[number];

const marginOptions = ['none', ...sizeOptions] as const;
type Margin = (typeof marginOptions)[number];

type ControlProps = {
  wrapperAroundComponents: boolean;
  topMargin: Margin;
  bottomMargin: Margin;
  combinedMarginSize: Size;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'VSpacer',
};
export default meta;

const DummyContent = () => (
  <>
    {'\n'}
    <section>Some Component</section>
  </>
);

const Component = (props: { highlight?: boolean }) => (
  <HiddenTiger
    style={{
      backgroundColor: 'rgba(0, 0 ,0, ' + (props.highlight ? '.1' : '.05'),
      padding: '6% 5%',
    }}
    serverSide={DummyContent}
    clientSide={DummyContent}
  />
);

const getMarginValue = (margin: Margin) => {
  const marginOptions: Record<Margin, VSpacerProps['top']> = {
    none: 'none',
    small: 'small',
    default: 'default',
    large: 'large',
    'x-large': 'xlarge',
  };
  return marginOptions[margin];
};

const getSizeValue = (size: Size) => {
  const sizeOptions: Record<Size, VSpacerProps['size']> = {
    small: 'small',
    default: 'default',
    large: 'large',
    'x-large': 'xlarge',
  };
  return sizeOptions[size];
};

const VSpacerStory: React.FC<ControlProps> = ({
  wrapperAroundComponents,
  topMargin,
  bottomMargin,
  combinedMarginSize,
}) => {
  const wrapper = wrapperAroundComponents || undefined;

  const top = getMarginValue(topMargin);
  const bottom = getMarginValue(bottomMargin);
  const size = getSizeValue(combinedMarginSize);

  return (
    <Fragment key={'' + wrapper + size + top + bottom}>
      <Component />
      {'\n\n'}
      {wrapper ? (
        <VSpacer size={size} top={top} bottom={bottom}>
          <Component highlight />
        </VSpacer>
      ) : (
        <VSpacer size={size} />
      )}
      {'\n'}
      <Component />
    </Fragment>
  );
};

export const _VSpacer: Story = {
  render: (args: ControlProps) => <VSpacerStory {...args} />,
  argTypes: {
    wrapperAroundComponents: {
      control: 'boolean',
      name: 'Wrapper around components',
    },
    topMargin: {
      control: {
        type: 'inline-radio',
        labels: {
          none: 'None',
          small: 'Small',
          default: 'Default',
          large: 'Large',
          'x-large': 'X-large',
        } satisfies Record<Margin, string>,
      },
      options: marginOptions,
      name: 'Top margin',
    },
    bottomMargin: {
      control: {
        type: 'inline-radio',
        labels: {
          none: 'None',
          small: 'Small',
          default: 'Default',
          large: 'Large',
          'x-large': 'X-large',
        } satisfies Record<Margin, string>,
      },
      options: marginOptions,
      name: 'Bottom margin',
    },
    combinedMarginSize: {
      control: {
        type: 'inline-radio',
        labels: {
          small: 'Small',
          default: 'Default',
          large: 'Large',
          'x-large': 'X-large',
        } satisfies Record<Size, string>,
      },
      options: sizeOptions,
      name: 'Combined margin-size',
    },
  },
  args: {
    wrapperAroundComponents: true,
    topMargin: 'default',
    bottomMargin: 'default',
    combinedMarginSize: 'default',
  },
};
