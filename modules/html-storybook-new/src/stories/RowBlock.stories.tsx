import React from 'react';
import { RowBlock } from '@reykjavik/hanna-react/RowBlock';
import { RowBlockColumn } from '@reykjavik/hanna-react/RowBlockColumn';
import { boolean, optionsKnob } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RowBlock> = {
  title: 'components/grid/RowBlock',
  component: RowBlock,
};
export default meta;

type Story = StoryObj<typeof RowBlock>;

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

const getBg = (label: string) => {
  const bg = optionsKnob(
    label,
    {
      'No background': '',
      Gray: 'gray',
      Dark: 'primary',
    },
    '',
    { display: 'inline-radio' }
  );
  return bg === 'primary' ? 'primary' : bg === 'gray';
};

const Component = () => {
  const right = boolean('Right aligned', false);
  const colBg1 = getBg('First column');
  const colNarrow1 = boolean('Narrow first column', false);
  const colBg2 = getBg('Second column');
  const colNarrow2 = boolean('Narrow second column', false);
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
  render: () => <Component />,
};
