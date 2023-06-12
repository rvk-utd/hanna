import React from 'react';
import { RowBlock } from '@reykjavik/hanna-react/RowBlock';
import { RowBlockColumn } from '@reykjavik/hanna-react/RowBlockColumn';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

const columnOptions = ['no-background', 'gray', 'dark'] as const;
const columnLabels = { 'no-background': 'No background', gray: 'Gray', dark: 'Dark' };
type Column = (typeof columnOptions)[number];

type ControlProps = {
  rightAligned: boolean;
  firstColumn: Column;
  narrowFirstColumn: boolean;
  secondColumn: Column;
  narrowSecondColumn: boolean;
};
type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'grid/RowBlock',
};
export default meta;

const COL_CONTENT = {
  first: () => (
    <>
      {'\n'}
      <strong>First Column</strong>
      <br /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
      veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    </>
  ),
  second: () => (
    <>
      {'\n'}
      <strong>Second Column</strong>
      <br /> Lorem ipsum dolor.
    </>
  ),
};

const getBg = (column: Column) => {
  const bgOptions: Record<Column, '' | 'gray' | 'primary'> = {
    'no-background': '',
    gray: 'gray',
    dark: 'primary',
  };
  const bg = bgOptions[column];
  return bg === 'primary' ? 'primary' : bg === 'gray';
};

const RowBlockStory: React.FC<ControlProps> = ({
  rightAligned,
  narrowFirstColumn,
  narrowSecondColumn,
  firstColumn,
  secondColumn,
}) => {
  const right = rightAligned;
  const colBg1 = getBg(firstColumn);

  const colNarrow1 = narrowFirstColumn;
  const colBg2 = getBg(secondColumn);

  const colNarrow2 = narrowSecondColumn;
  return (
    <RowBlock right={right} startSeen>
      <RowBlockColumn background={colBg1} narrow={colNarrow1}>
        {COL_CONTENT.first()}
      </RowBlockColumn>
      <RowBlockColumn background={colBg2} narrow={colNarrow2}>
        {COL_CONTENT.second()}
      </RowBlockColumn>
    </RowBlock>
  );
};

export const _RowBlock: Story = {
  render: (args: ControlProps) => <RowBlockStory {...args} />,
  argTypes: {
    rightAligned: {
      control: 'boolean',
      name: 'Right aligned',
    },
    firstColumn: {
      control: {
        type: 'inline-radio',
        labels: columnLabels,
      },
      options: columnOptions,
      name: 'First column',
    },
    narrowFirstColumn: {
      control: 'boolean',
      name: 'Narrow first column',
    },
    secondColumn: {
      control: {
        type: 'inline-radio',
        labels: columnLabels,
      },
      options: columnOptions,
      name: 'Second column',
    },
    narrowSecondColumn: {
      control: 'boolean',
      name: 'Narrow second column',
    },
  },
  args: {
    rightAligned: false,
    firstColumn: 'no-background',
    narrowFirstColumn: false,
    secondColumn: 'no-background',
    narrowSecondColumn: false,
  },
  parameters: {
    css: { tokens: 'RowBlock,RowBlockColumn' },
    knobs: { disabled: false },
  } as StoryParameters,
};
