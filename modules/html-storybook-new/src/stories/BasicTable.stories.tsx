import React from 'react';
import { BasicTable, BasicTableProps } from '@reykjavik/hanna-react/BasicTable';
import { Footnote } from '@reykjavik/hanna-react/Footnote';
import { Meta, StoryObj } from '@storybook/react';

import { disableControlProps } from '../utils/disableControlTypes.js';

type BasicTablePropsControlsProps = {
  footer: boolean;
  footnote: boolean;
  variant: 'normal' | 'right' | 'fullwidth';
};
type BasicTableStoryProps = BasicTableProps & BasicTablePropsControlsProps;
type Story = StoryObj<BasicTableStoryProps>;

const meta: Meta<BasicTableStoryProps> = {
  title: 'BasicTable',
  component: BasicTable,
};

export default meta;

const BasicTableStory: React.FC<BasicTableStoryProps> = ({
  compact,
  footer,
  footnote,
  variant,
}) => {
  const showFooter = footer || undefined;

  return (
    <>
      <BasicTable
        key={'' + compact + footer + variant}
        compact={compact}
        cols={[{ number: true }, {}, {}, { tel: true }, { number: true }, {}]}
        thead={[
          ['Erindi nr.', 'Lýsing', 'Sent dags. / kl', 'Sími', 'Gjald', 'Staða máls'],
        ]}
        tbody={[
          [
            '99',
            {
              value: (
                <>
                  Umsókn um <a href="/url">stuðningsþjónustu</a>
                </>
              ),
            },
            '16.09.2019 / kl. 18:45',
            '800 9000',
            '45.663 kr',
            'Í vinnslu',
          ],
          [
            '100',
            {
              value: 'dfdf',
            },
            '16.09.2019 / kl. 18:45',
            '',
            '5.663 kr',
            'Í vinnslu',
          ],
          [
            '102',
            {
              value: (
                <>
                  Umsókn um <a href="/url">stuðningsþjónustu</a>
                </>
              ),
            },
            '16.09.2019 / kl. 18:45',
            '800 9000',
            '-30.663 kr',
            'Í vinnslu',
          ],
        ]}
        tfoot={
          showFooter && [
            [
              { value: 'Samtals:', number: false, colSpan: 4 },
              { value: '16.345 kr.', number: true },
              '',
            ],
          ]
        }
        startSeen
      />
      {footnote && <Footnote>This is an optional footnote</Footnote>}
    </>
  );
};

export const _BasicTable: Story = {
  render: (args: BasicTableStoryProps) => <BasicTableStory {...args} />,
  argTypes: {
    compact: {
      control: 'boolean',
      name: 'Compact',
    },
    footer: {
      control: 'boolean',
      name: 'Footer',
    },
    footnote: {
      control: 'boolean',
      name: 'Footnote',
    },
    variant: {
      control: 'radio',
      options: ['normal', 'right', 'fullwidth'],
      name: 'Variant',
    },
    ...disableControlProps([
      'type',
      'modifier',
      'fullWidth',
      'align',
      'startSeen',
      'caption',
      'thead',
      'tfoot',
      'tbody',
      'tbodies',
      'cols',
    ]),
  },
  args: {
    compact: false,
    footer: false,
    footnote: false,
    variant: 'normal',
  },
};
