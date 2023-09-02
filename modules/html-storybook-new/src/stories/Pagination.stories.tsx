import React from 'react';
import { Pagination } from '@reykjavik/hanna-react/Pagination';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

const typeOptions = ['link', 'button', 'submit'] as const;
const stateOptions = ['1_25', '9_25', '25_25', '1_5'] as const;

type ControlProps = {
  type: (typeof typeOptions)[number];
  state: (typeof stateOptions)[number];
};

// ---------------------------------------------------------------------------

const meta: Meta<ControlProps> = {
  title: 'Pagination',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};
export default meta;

const PaginationStory = (props: ControlProps) => {
  const { type, state } = props;
  const [current, pageCount] = state.split('_').map(Number) as [number, number];

  const paginationProps =
    type === 'link'
      ? ({
          href: '?page=${page}',
        } as const)
      : ({
          onChange: () => undefined,
          submit: type === 'submit',
        } as const);

  const key = [type, current, pageCount].join('-');

  return (
    <Pagination key={key} current={current} pageCount={pageCount} {...paginationProps} />
  );
};

export const _Pagination: StoryObj<ControlProps> = {
  render: (args) => <PaginationStory {...args} />,
  argTypes: {
    type: {
      name: 'Button type',
      options: stateOptions,
      control: {
        type: 'inline-radio',
        labels: {
          link: 'Links',
          button: 'Buttons',
          submit: 'Submit buttons',
        } satisfies Record<ControlProps['type'], string>,
      },
    },
    state: {
      name: 'Status',
      options: stateOptions,
      control: {
        type: 'radio',
        labels: {
          '1_25': 'First page',
          '9_25': 'Page near the middie',
          '25_25': 'Last page',
          '1_5': 'Short list',
        } satisfies Record<ControlProps['state'], string>,
      },
    },
  },
  args: {
    type: 'link',
    state: '1_25',
  },
};
