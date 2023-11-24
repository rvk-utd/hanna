import React from 'react';
import { Bling, BlingParentOffset } from '@reykjavik/hanna-react/Bling';
import { blingTypes, getBlingUrl } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTiger.js';

const customOption = '- Custom SVG URL -';
const blingOptions = [...blingTypes, customOption] as const;

const alignmentOptions = [
  'left',
  'left-ish',
  'left-center',
  'right-center',
  'right-ish',
  'right',
] as const;

const verticalAlignOptions = ['up', 'up-ish', 'center', 'down-ish', 'down'] as const;

const colorVariantOptions = ['tertiary', 'secondary', 'primary'] as const;

const insertionPointOptions = [
  'default',
  'top',
  'top-ish',
  'center',
  'bottom-ish',
  'bottom',
] as const;

type ControlProps = {
  blingType: (typeof blingOptions)[number];
  alignment: (typeof alignmentOptions)[number];
  verticalAlign: (typeof verticalAlignOptions)[number];
  colorVariant: (typeof colorVariantOptions)[number];
  placeInFrontOfOtherContent: boolean;
  insertionPoint: (typeof insertionPointOptions)[number];
} /* & ThemeControlProps */;

const meta: Meta<ControlProps> = {
  title: 'Bling',
  parameters: {
    layout: { theme: 'colorful' },
  },
};
export default meta;

const Spacer = () => (
  <div
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
  </div>
);

const BlingStory: React.FC<ControlProps> = ({
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

  const insertionPointMap: Record<ControlProps['insertionPoint'], BlingParentOffset> = {
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
      visibleDemo={
        <div style={{ position: 'relative' }}>
          <Spacer />
          <Bling
            {...typeProps}
            align={alignment}
            vertical={verticalAlign}
            color={colorVariant}
            overlay={placeInFrontOfOtherContent}
            parent={parent}
          />
          <Spacer />
        </div>
      }
      htmlDemo={
        <Bling
          {...typeProps}
          align={alignment}
          vertical={verticalAlign}
          color={colorVariant}
          overlay={placeInFrontOfOtherContent}
          parent={parent}
        />
      }
    />
  );
};

export const _Bling: StoryObj<ControlProps> = {
  render: (args) => <BlingStory {...args} />,
  argTypes: {
    blingType: {
      name: 'Bling Type',
      options: blingOptions,
      control: 'select',
    },
    alignment: {
      name: 'Alignment',
      options: alignmentOptions,
      control: 'inline-radio',
    },
    verticalAlign: {
      name: 'Vertical align',
      options: verticalAlignOptions,
      control: {
        type: 'inline-radio',
        labels: {
          up: 'up',
          'up-ish': 'up-ish',
          center: 'center (default)',
          'down-ish': 'down-ish',
          down: 'down',
        } satisfies Record<ControlProps['verticalAlign'], string>,
      },
    },
    colorVariant: {
      name: 'Color variant',
      options: colorVariantOptions,
      control: {
        type: 'inline-radio',
        labels: {
          tertiary: 'Default (tertiary)',
          secondary: 'Secondary',
          primary: 'Primary',
        } satisfies Record<ControlProps['colorVariant'], string>,
      },
    },
    placeInFrontOfOtherContent: { name: 'Place in front of other content' },
    insertionPoint: {
      name: 'Insertion point',
      options: insertionPointOptions,
      control: {
        type: 'inline-radio',
        labels: {
          default: 'Default (inline)',
          top: 'top',
          'top-ish': 'top-ish',
          center: 'center',
          'bottom-ish': 'botttom-ish',
          bottom: 'bottom',
        } satisfies Record<ControlProps['insertionPoint'], string>,
      },
    },
    // ...themeArgTypes
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
