import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import BasicTable, { BasicTableProps } from '@reykjavik/hanna-react/BasicTable';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;
// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const content = (extra: boolean) => {
  const props: Pick<BasicTableProps, 'thead' | 'tbody' | 'startSeen'> = {
    thead: extra
      ? [
          [
            'Erindi nr.',
            'Lýsing',
            'Lýsing nr. 2',
            'Sent dags. / kl',
            'Sími',
            'Gjald',
            'Staða máls',
          ],
        ]
      : [['Erindi nr.', 'Lýsing', 'Sent dags. / kl', 'Sími', 'Gjald', 'Staða máls']],
    tbody: extra
      ? [
          [
            '99',
            {
              value: (
                <Fragment>
                  Umsókn um <a href="/url">stuðningsþjónustu</a>
                </Fragment>
              ),
            },
            'Umsókn um stuðningsþjónustu án links',
            '16.09.2019 / kl. 18:45',
            '800 9000',
            '45.663 kr',
            'Í vinnslu',
          ],
          [
            '100',
            lorem.tiny.slice(0, 28),
            lorem.tiny.slice(0, 20),
            '16.09.2019 / kl. 18:45',
            '',
            '5.663 kr',
            'Í vinnslu',
          ],
          [
            '1199',
            lorem.tiny.slice(0, 21),
            lorem.tiny.slice(0, 20),
            '16.09.2019 / kl. 18:45',
            '800 9000',
            '40.663 kr',
            'Í vinnslu',
          ],
        ]
      : [
          [
            '99',
            {
              value: (
                <Fragment>
                  Umsókn um <a href="/url">stuðningsþjónustu</a>
                </Fragment>
              ),
            },

            '16.09.2019 / kl. 18:45',
            '800 9000',
            '45.663 kr',
            'Í vinnslu',
          ],
          ['100', lorem.tiny, '16.09.2019 / kl. 18:45', '', '5.663 kr', 'Í vinnslu'],
          [
            '1199',
            lorem.tiny,
            '16.09.2019 / kl. 18:45',
            '800 9000',
            '40.663 kr',
            'Í vinnslu',
          ],
        ],
    startSeen: true,
  };
  return props;
};

const tFoot: BasicTableProps['tfoot'] = [
  [
    { value: 'Samtals:', number: false, colSpan: 4 },
    { value: '16.345 kr.', number: true },
    '',
  ],
];

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      {/* False for 6 columns - true for 7 columns (to check scroll)*/}
      <BasicTable {...content(false)} />
      <BasicTable {...content(false)} tfoot={tFoot} />
      <BasicTable {...content(false)} tfoot={tFoot} compact />
      <BasicTable {...content(true)} align="right" />
      <BasicTable {...content(false)} caption="Table with caption" fullWidth />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, pageScreenshot }) => {
    const compactTable = page.locator('.BasicTable >> nth=3');
    // Scroll to end - right, and take a screenshot
    const scrollContainer = compactTable.locator('scrollContainer=');
    // test compact table scroll-right
    await scrollContainer.evaluate((elm) => {
      elm.scrollBy(elm.scrollWidth, 0);
    });
    await page.waitForTimeout(100);
    await pageScreenshot('compactTable-scrolled-right');
  },
};
