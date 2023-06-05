import React from 'react';
import { Bling, BlingProps as _BlingProps } from '@reykjavik/hanna-react/Bling';
import { BlingType, blingTypes, getBlingUrl } from '@reykjavik/hanna-utils/assets';
import { select } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { disableControlProps } from '../utils/disableControlTypes.js';
import { HiddenTiger } from '../utils/HiddenTrigger.js';

const blingOptions = [...blingTypes] as const;

type BlingControlsProps = {
  blingType: BlingType;
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

const BlingStory: React.FC<BlingStoryProps> = ({
  blingType,
  align,
  vertical,
  color,
  overlay,
  parent,
}) => {
  const type = select<BlingProps['type'] | typeof customOption>(
    'Bling Type',
    blingOptions,
    blingTypes[0]
  );

  /*
  const typeProps =
    type === customOption ? { blingUrl: getBlingUrl(blingTypes[2]) } : { type };
    */

  return (
    <HiddenTiger
      key={type + align + vertical + color + overlay + parent}
      style={{ position: 'relative' }}
      serverSide={
        <Bling
          // {...typeProps}
          blingUrl={getBlingUrl(blingType)}
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
        // {...typeProps}
        blingUrl={getBlingUrl(blingType)}
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
  render: (args: BlingStoryProps) => <BlingStory {...args} />,
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
