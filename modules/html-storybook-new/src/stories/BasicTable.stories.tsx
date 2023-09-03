import React from 'react';
import { BasicTable } from '@reykjavik/hanna-react/BasicTable';
import { Footnote } from '@reykjavik/hanna-react/Footnote';
import { Meta, StoryObj } from '@storybook/react';

const variantOptions = ['normal', 'right', 'fullwidth'] as const;

type ControlProps = {
  compact: boolean;
  footer: boolean;
  footnote: boolean;
  variant: (typeof variantOptions)[number];
};

const meta: Meta<ControlProps> = {
  title: 'BasicTable',
};

export default meta;

const BasicTableStory: React.FC<ControlProps> = ({
  compact,
  footer,
  footnote,
  variant,
}) => {
  const _footer = footer || undefined;

  const variantProps = (
    {
      normal: undefined,
      right: { align: 'right' },
      fullwidth: { fullWidth: true },
    } as const
  )[variant];

  return (
    <>
      <BasicTable
        key={'' + compact + _footer + variant}
        {...variantProps}
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
          _footer && [
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

export const _BasicTable: StoryObj<ControlProps> = {
  render: (args) => <BasicTableStory {...args} />,
  argTypes: {
    compact: { name: 'Compact' },
    footer: { name: 'Footer' },
    footnote: { name: 'Footnote' },
    variant: {
      name: 'Variant',
      options: variantOptions,
      control: 'radio',
    },
  },
  args: {
    compact: false,
    footer: false,
    footnote: false,
    variant: 'normal',
  },
};
