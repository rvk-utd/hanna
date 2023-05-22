import React from 'react';
import { BasicTable } from '@reykjavik/hanna-react/BasicTable';
import { Footnote } from '@reykjavik/hanna-react/Footnote';
import { boolean, optionsKnob } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BasicTable> = {
  title: 'components/BasicTable',
  component: BasicTable,
};
export default meta;

type Story = StoryObj<typeof BasicTable>;

const Component = () => {
  const compact = boolean('Compact', false);
  const footer = boolean('Footer', false) || undefined;
  const footnote = boolean('Footnote', false);
  const variant = optionsKnob(
    'Variant',
    {
      'Normal (fills the availble width)': '',
      'Right-Aligned (matches "TextBlock--align-right")': 'right',
      'Full-Width (breaks out of "TextBlock"s)': 'fullwidth',
    },
    '',
    { display: 'radio' }
  );

  const variantProps = (
    {
      '': undefined,
      right: { align: 'right' },
      fullwidth: { fullWidth: true },
    } as const
  )[variant];

  return (
    <>
      <BasicTable
        key={'' + compact + footer + variant}
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
          footer && [
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
  render: () => <Component />,
};
