import React, { Fragment } from 'react';
import { VSpacer, VSpacerProps } from '@reykjavik/hanna-react/VSpacer';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTiger.js';

const sizeOptions = ['small', 'default', 'large', 'xlarge'] satisfies Array<
  VSpacerProps['size']
>;
const marginOptions = ['none', ...sizeOptions] satisfies Array<VSpacerProps['bottom']>;

type ControlProps = {
  wrapperAroundComponents: boolean;
  topMargin: (typeof marginOptions)[number];
  bottomMargin: (typeof marginOptions)[number];
  combinedMarginSize: (typeof sizeOptions)[number];
};

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
    visibleDemo={
      <div
        style={{
          backgroundColor: 'rgba(0, 0 ,0, ' + (props.highlight ? '.1' : '.05'),
          padding: '6% 5%',
        }}
      >
        {DummyContent}
      </div>
    }
    htmlDemo={DummyContent}
  />
);

const VSpacerStory: React.FC<ControlProps> = ({
  wrapperAroundComponents,
  topMargin,
  bottomMargin,
  combinedMarginSize,
}) => {
  const wrapper = wrapperAroundComponents || undefined;

  const top = topMargin;
  const bottom = bottomMargin;
  const size = combinedMarginSize;

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

export const _VSpacer: StoryObj<ControlProps> = {
  render: (args) => <VSpacerStory {...args} />,
  argTypes: {
    wrapperAroundComponents: { name: 'Wrapper around components' },
    topMargin: {
      name: 'Top margin',
      options: marginOptions,
      control: {
        type: 'inline-radio',
        labels: {
          none: 'None',
          small: 'Small',
          default: 'Default',
          large: 'Large',
          xlarge: 'X-large',
        } satisfies Record<ControlProps['topMargin'], string>,
      },
    },
    bottomMargin: {
      name: 'Bottom margin',
      options: marginOptions,
      control: {
        type: 'inline-radio',
        labels: {
          none: 'None',
          small: 'Small',
          default: 'Default',
          large: 'Large',
          xlarge: 'X-large',
        } satisfies Record<ControlProps['bottomMargin'], string>,
      },
    },
    combinedMarginSize: {
      name: 'Combined margin-size',
      options: sizeOptions,
      control: {
        type: 'inline-radio',
        labels: {
          small: 'Small',
          default: 'Default',
          large: 'Large',
          xlarge: 'X-large',
        } satisfies Record<ControlProps['combinedMarginSize'], string>,
      },
    },
  },
  args: {
    wrapperAroundComponents: true,
    topMargin: 'default',
    bottomMargin: 'default',
    combinedMarginSize: 'default',
  },
};
