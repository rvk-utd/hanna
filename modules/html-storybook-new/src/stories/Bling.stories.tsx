import React from 'react';
import { Bling, BlingParentOffset } from '@reykjavik/hanna-react/Bling';
import { blingTypes, getBlingUrl } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';

const customOption = '- Custom SVG URL -';
const blingOptions = [...blingTypes, customOption] as const;
type BlingType = (typeof blingOptions)[number];

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
  alignment,
  verticalAlign,
  colorVariant,
  placeInFrontOfOtherContent,
  insertionPoint,
}) => {
  const type = blingType;
  const typeProps =
    type === customOption ? { blingUrl: getBlingUrl(blingTypes[2]) } : { type };

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
          {...typeProps}
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
        {...typeProps}
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
        } satisfies Record<Vertical, string>,
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
        } satisfies Record<ColorVariant, string>,
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
        } satisfies Record<InsertionPoint, string>,
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
