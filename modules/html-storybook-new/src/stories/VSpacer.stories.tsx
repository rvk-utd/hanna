import React, { Fragment } from 'react';
import { VSpacer, VSpacerProps } from '@reykjavik/hanna-react/VSpacer';
import { boolean, optionsKnob } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';

const meta: Meta<typeof VSpacer> = {
  title: 'VSpacer',
  component: VSpacer,
};
export default meta;

type Story = StoryObj<typeof VSpacer>;

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

const VSpacerStory = () => {
  const wrapper = boolean('Wrapper around components', true) || undefined;

  const top: VSpacerProps['top'] =
    (wrapper &&
      optionsKnob(
        'Top margin',
        {
          None: 'none',
          Small: 'small',
          Default: '',
          Large: 'large',
          'X-Large': 'xlarge',
        },
        '',
        { display: 'inline-radio' }
      )) ||
    undefined;

  const bottom: VSpacerProps['bottom'] =
    (wrapper &&
      optionsKnob(
        'Bottom margin',
        {
          None: 'none',
          Small: 'small',
          Default: '',
          Large: 'large',
          'X-Large': 'xlarge',
        },
        '',
        { display: 'inline-radio' }
      )) ||
    undefined;

  const size: VSpacerProps['size'] =
    ((!top || !bottom) &&
      optionsKnob(
        wrapper ? 'Combined margin-size' : 'Margin-size',
        {
          Small: 'small',
          Default: '',
          Large: 'large',
          'X-Large': 'xlarge',
        },
        '',
        { display: 'inline-radio' }
      )) ||
    undefined;

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
  render: () => <VSpacerStory />,
};
