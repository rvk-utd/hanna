import React from 'react';
import { Bling, BlingProps as _BlingProps } from '@reykjavik/hanna-react/Bling';
import { blingTypes, getBlingUrl } from '@reykjavik/hanna-utils/assets';
import { boolean, optionsKnob, select } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { disableControlProps } from '../utils/disableControlTypes.js';
import { HiddenTiger } from '../utils/HiddenTrigger.js';

type BlingControlsProps = {
  blingType: string;
};
type BlingStoryProps = _BlingProps & BlingControlsProps;
type Story = StoryObj<BlingStoryProps>;

const meta: Meta<BlingStoryProps> = {
  title: 'Bling',
  component: Bling,
};
export default meta;

type BlingProps = Required<_BlingProps>;
const customOption = '- Custom SVG URL -';
const blingOptions = [...blingTypes, customOption] as const;

const Spacer = () => (
  <HiddenTiger
    style={{
      height: '47vh',
      background: 'rgba(222, 222, 222, .2)',
      borderTop: '1px dashed rgba(0,0,0,.15)',
    }}
  >
    <div
      style={{
        height: '100%',
        width: '50%',
        borderRight: '1px dashed rgba(0,0,0,.15)',
      }}
    />
  </HiddenTiger>
);

const BlingStory = () => {
  const type = select<BlingProps['type'] | typeof customOption>(
    'Bling Type',
    blingOptions,
    blingTypes[0]
  );

  const align = optionsKnob<BlingProps['align']>(
    'Alignment',
    {
      left: 'left',
      'left-ish': 'left-ish',
      'left-center': 'left-center',
      'right-center': 'right-center',
      'right-ish': 'right-ish',
      right: 'right',
    },
    'left',
    { display: 'inline-radio' }
  );

  const vertical =
    optionsKnob<'' | BlingProps['vertical']>(
      'Vertical align',
      {
        up: 'up',
        'up-ish': 'up-ish',
        'center (default)': '',
        'down-ish': 'down-ish',
        down: 'down',
      },
      '',
      { display: 'inline-radio' }
    ) || undefined;

  const color =
    optionsKnob<'' | BlingProps['color']>(
      'Color variant',
      { 'Default (tertiary)': '', Secondary: 'secondary', Primary: 'primary' },
      '',
      { display: 'inline-radio' }
    ) || undefined;

  const overlay = boolean('Place in front of other content', false);

  const parent =
    optionsKnob<'' | BlingProps['parent']>(
      'Insertion point',
      {
        'Default (inline)': '',
        top: 'top',
        'top-ish': 'top-ish',
        center: 'center',
        'bottom-ish': 'bottom-ish',
        bottom: 'bottom',
      },
      '',
      { display: 'inline-radio' }
    ) || undefined;

  const typeProps =
    type === customOption ? { blingUrl: getBlingUrl(blingTypes[2]) } : { type };
  return (
    <HiddenTiger
      key={type + align + vertical + color + overlay + parent}
      style={{ position: 'relative' }}
      serverSide={
        <Bling
          {...typeProps}
          align={align}
          vertical={vertical}
          color={color}
          overlay={overlay}
          parent={parent}
        />
      }
    >
      <Spacer />
      {'\n\n\n'}

      <Bling
        {...typeProps}
        align={align}
        vertical={vertical}
        color={color}
        overlay={overlay}
        parent={parent}
      />

      {'\n\n\n'}
      <Spacer />
    </HiddenTiger>
  );
};

export const _Bling: Story = {
  render: () => <BlingStory />,
  argTypes: {
    blingType: {
      control: 'select',
      options: blingOptions,
      name: 'Bling Type',
    },
    align: {
      control: 'radio',
      options: ['left', 'left-ish', 'left-center', 'right-center', 'right'],
      name: 'Alignment',
    },
    vertical: {
      control: 'radio',
      options: ['up', 'up-ish', 'center', 'down-ish', 'down'],
      name: 'Vertical align',
    },
    color: {
      control: 'radio',
      options: ['tertiary', 'secondary', 'primary'],
      name: 'Color variant',
    },
    overlay: {
      control: 'boolean',
      name: 'Place in front of other content',
    },
    parent: {
      control: 'radio',
      options: ['inline', 'top', 'top-ish', 'center', 'bottom-ish', 'bottom'],
      name: 'Insertion point',
    },
    ...disableControlProps(['className', 'type', 'blingUrl']),
  },
  args: {
    blingType: 'arrow-right-large',
    align: 'left',
    vertical: 'center',
    color: 'tertiary',
    overlay: false,
    parent: 'bottom',
  },
};
