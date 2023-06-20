import React from 'react';
import {
  Bling,
  BlingParentOffset,
  BlingProps as _BlingProps,
} from '@reykjavik/hanna-react/Bling';
import { BlingType, blingTypes, getBlingUrl } from '@reykjavik/hanna-utils/assets';
import { select } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';

const blingOptions = [...blingTypes] as const;

const alignmentOptions = [
  'left',
  'left-ish',
  'left-center',
  'right-center',
  'right-ish',
  'right',
] as const;
type Alignment = (typeof alignmentOptions)[number];

const verticalAlignOptions = ['up', 'up-ish', 'center', 'down-ish', 'down'] as const;
type Vertical = (typeof verticalAlignOptions)[number];

const colorVariantOptions = ['tertiary', 'secondary', 'primary'] as const;
type ColorVariant = (typeof colorVariantOptions)[number];

const insertionPointOptions = [
  'default',
  'top',
  'top-ish',
  'center',
  'bottom-ish',
  'bottom',
] as const;
type InsertionPoint = (typeof insertionPointOptions)[number];

type ControlsProps = {
  blingType: BlingType;
  alignment: Alignment;
  verticalAlign: Vertical;
  colorVariant: ColorVariant;
  placeInFrontOfOtherContent: boolean;
  insertionPoint: InsertionPoint;
};
type Story = StoryObj<ControlsProps>;

const meta: Meta<ControlsProps> = {
  title: 'Bling',
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

const BlingStory: React.FC<ControlsProps> = ({
  blingType,
  alignment, // align,
  verticalAlign, // vertical,
  colorVariant, // color,
  placeInFrontOfOtherContent, // overlay,
  insertionPoint, // parent,
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

  const insertionPointMap: Record<InsertionPoint, BlingParentOffset> = {
    default: 'center',
    top: 'top',
    'top-ish': 'top-ish',
    center: 'center',
    'bottom-ish': 'bottom-ish',
    bottom: 'bottom',
  };
  const parent = insertionPointMap[insertionPoint];

  return (
    <HiddenTiger
      key={
        type +
        alignment +
        verticalAlign +
        colorVariant +
        placeInFrontOfOtherContent +
        insertionPoint
      }
      style={{ position: 'relative' }}
      serverSide={
        <Bling
          // {...typeProps}
          blingUrl={getBlingUrl(blingType)}
          align={alignment}
          vertical={verticalAlign}
          color={colorVariant}
          overlay={placeInFrontOfOtherContent}
          parent={parent}
        />
      }
    >
      <Spacer />
      {'\n\n\n'}

      <Bling
        // {...typeProps}
        blingUrl={getBlingUrl(blingType)}
        align={alignment}
        vertical={verticalAlign}
        color={colorVariant}
        overlay={placeInFrontOfOtherContent}
        parent={parent}
      />

      {'\n\n\n'}
      <Spacer />
    </HiddenTiger>
  );
};

export const _Bling: Story = {
  render: (args: ControlsProps) => <BlingStory {...args} />,
  argTypes: {
    blingType: {
      control: 'select',
      options: blingOptions,
      name: 'Bling Type',
    },
    alignment: {
      control: 'inline-radio',
      options: alignmentOptions,
      name: 'Alignment',
    },
    verticalAlign: {
      control: {
        type: 'inline-radio',
        labels: {
          up: 'up',
          'up-ish': 'up-ish',
          center: 'center (default)',
          'down-ish': 'down-ish',
          down: 'down',
        },
      },
      options: verticalAlignOptions,
      name: 'Vertical align',
    },
    colorVariant: {
      control: {
        type: 'inline-radio',
        labels: {
          tertiary: 'Default (tertiary)',
          secondary: 'Secondary',
          primary: 'Primary',
        },
      },
      options: colorVariantOptions,
      name: 'Color variant',
    },
    placeInFrontOfOtherContent: {
      control: 'boolean',
      name: 'Place in front of other content',
    },
    insertionPoint: {
      control: {
        type: 'inline-radio',
        labels: {
          default: 'Default (inline)',
          top: 'top',
          'top-ish': 'top-ish',
          center: 'center',
          'bottom-ish': 'botttom-ish',
          bottom: 'bottom',
        },
      },
      options: insertionPointOptions,
      name: 'Insertion point',
    },
  },
  args: {
    blingType: 'arrow-right-large',
    alignment: 'left',
    verticalAlign: 'center',
    colorVariant: 'tertiary',
    placeInFrontOfOtherContent: false,
    insertionPoint: 'default',
  },
};
